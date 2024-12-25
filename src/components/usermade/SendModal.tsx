"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAtom } from 'jotai';
import UserInfoAtom from '../../../store/user';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  id: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, name, id }) => {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useAtom(UserInfoAtom);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setAmount(value);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const parsedAmount = parseInt(amount, 10);

    if (!parsedAmount || parsedAmount <= 0) {
      setError('Please enter a valid amount');
      setLoading(false);
      return;
    }

    if (parsedAmount > userData.balance) {
      setError('Insufficient balance');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post(
        '/api/user/payment',
        {
          senderId: userData.id,
          recieverId: id,
          amount: amount
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        setUserData(prev => ({
          ...prev,
          balance: prev.balance - parsedAmount
        }));
        
        setSuccess('Payment sent successfully!');
        setTimeout(() => {
          setAmount('');
          onClose();
        }, 2000);
      }
    } catch (err:any) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Payment failed. Please try again.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Send Money</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send money to
            </label>
            <p className="text-xl font-medium">{name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter whole number amount"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="px-4 py-2"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2"
              disabled={loading || !amount}
            >
              {loading ? 'Sending...' : 'Send Money'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
