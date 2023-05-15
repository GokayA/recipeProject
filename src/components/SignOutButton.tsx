import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface SignOutButtonProps {
  className?: string;
  children?: string;
}

const SignOutButton = ({
  className,
}: SignOutButtonProps): React.ReactElement => {
  const signOuthandler = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error('Error signing in', {
        position: 'top-center',
      });
    }
  };

  return (
    <button className={className} onClick={signOuthandler}>
      Sign Out
    </button>
  );
};
export default SignOutButton;
