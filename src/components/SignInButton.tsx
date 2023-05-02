'use client';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Error signing in', {
        position: 'top-center',
      });
    }
  };

  return <button onClick={signInWithGoogle}>Sign in</button>;
};

export default SignInButton;
