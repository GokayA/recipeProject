'use client';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface SignInButtonProps {
  className?: string;
  children?: string;
  onClick?: () => void;
}

const SignInButton = ({ className }: SignInButtonProps): React.ReactElement => {
  const signInWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Error signing in', {
        position: 'top-center',
      });
    }
  };

  return (
    <button className={className} onClick={signInWithGoogle}>
      Sign in
    </button>
  );
};

export default SignInButton;
