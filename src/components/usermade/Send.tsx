"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAtom } from 'jotai';
import UserInfoAtom from '../../../store/user';

interface SendProps {
  user: string;
  id: number;
}

const Send: React.FC<SendProps> = ({ user, id }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useAtom(UserInfoAtom);

  const handleOpen = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError('');
    setSuccess('');
    setAmount('');
  };

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
          handleClose();
        }, 2000);
      }
    } catch (err) {
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

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-lg flex justify-between items-center transition-colors"
      >
        <span className="text-xl font-medium">{user}</span>
        <span className="text-sm bg-black text-white px-3 py-1 rounded">Send Money</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4">Send Money</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient
                </label>
                <p className="text-xl font-medium">{user}</p>
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
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !amount}
                >
                  {loading ? 'Sending...' : 'Send Money'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Send;
