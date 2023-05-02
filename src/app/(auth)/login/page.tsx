import SignInButton from '@/components/SignInButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          signout
          {/* <SignOutButton /> */}
        </>
      ) : (
        <div>
          button
          <SignInButton />
        </div>
      )}
    </div>
  );
};
export default page;
