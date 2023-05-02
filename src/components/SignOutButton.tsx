'use client';

import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const SignOutButton = () => {
  const signOuthandler = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error('Error signing in', {
        position: 'top-center',
      });
    }
  };

  return <button onClick={signOuthandler}>Sign Out</button>;
};
export default SignOutButton;
