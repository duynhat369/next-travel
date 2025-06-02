'use client';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Profile } from '../components/profile';

export default function ProfilePage() {
  const params = useParams();
  const { data: session } = useSession();

  const { userId } = params;

  const { user } = session || {};

  return (
    <Profile
      user={user}
      //   canEdit={canEdit}
      currentUser={session?.user}
    />
  );
}
