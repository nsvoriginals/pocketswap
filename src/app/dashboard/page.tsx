"use client"
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import UserInfoAtom from '../../../store/user';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import Send from '@/components/usermade/Send';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
}

const Dashboard = () => {
  const [userdata, setUserData] = useAtom(UserInfoAtom);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to continue');
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const currentUserResponse = await axios.get<User>('/api/user/currentuser', { headers }); // Typing response here
        const userData = currentUserResponse.data;

        setUserData({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          balance: userData.balance
        });

        // Fetch all users
        const allUsersResponse = await axios.get<{ users: User[] }>('/api/user/all', { headers }); // Typing response here

        if (allUsersResponse.data?.users) {
          const otherUsers = allUsersResponse.data.users.filter(
            user => user.id !== userData.id
          );
          setAllUsers(otherUsers);
        } else {
          throw new Error('Invalid users data format');
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        if ((err)) {
          setError(err.response?.data?.message || 'Failed to load data. Please try again.');
        } else {
          setError('Failed to load data. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="font-Nue flex flex-col m-5">
        <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <Skeleton className="h-16 w-64" />
          <Skeleton className="h-12 w-48" />
        </div>
        <div className="my-5">
          <Skeleton className="h-10 w-full max-w-xl mx-auto" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={`skeleton-${index}`} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10 font-Nue">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="font-Nue flex flex-col m-5">
      <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
        <h1 className="text-4xl md:text-6xl lg:text-8xl truncate">
          Hi {userdata?.name || 'User'}
        </h1>
        <h3 className="text-2xl md:text-3xl lg:text-5xl whitespace-nowrap">
          Balance - ${userdata?.balance?.toLocaleString() || '0'}
        </h3>
      </div>

      <div className="my-5">
        <Input
          placeholder="Search users..."
          className="w-full max-w-xl mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Send 
              key={user.id} 
              user={user.name} 
              id={user.id} 
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            {searchTerm ? 'No users found matching your search' : 'No other users available'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
