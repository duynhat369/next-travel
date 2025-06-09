'use client';

import { userApi } from '@/lib/api/user';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Profile } from '../components/profile';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { user } = session || {};

  // Query để lấy thông tin user từ API
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => userApi.getProfile(user?.id as string),
    enabled: !!user?.id,
    retry: 1,
  });

  // Loading state cho session
  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated - Full page component
  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
        <div className="flex items-center justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <User className="w-12 h-12 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-foreground mb-4"
            >
              Vui lòng đăng nhập
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-foreground-secondary text-lg mb-10 max-w-sm mx-auto"
            >
              Bạn cần đăng nhập để xem thông tin và dữ liệu.
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Authenticated - show profile
  return <Profile user={userProfile?.user} />;
}
