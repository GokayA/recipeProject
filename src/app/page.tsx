import SignInButton from '@/components/SignInButton';
import SignOutButton from '@/components/SignOutButton';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
