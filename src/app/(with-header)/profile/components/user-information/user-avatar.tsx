'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserDB } from '@/lib/api/user';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  user: UserDB;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const UserAvatar = ({ user }: Props) => {
  const handleAvatarChange = () => {
    toast.info('Chức năng thay đổi avatar sẽ được phát triển sau');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user?.avatar || '/placeholder.svg'} alt={user?.displayName || 'User'} />
          <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
            {getInitials(user?.displayName || 'User')}
          </AvatarFallback>
        </Avatar>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleAvatarChange}
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg"
        >
          <Camera className="w-4 h-4 cursor-pointer" />
        </motion.button>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">{user?.displayName}</h2>
      </div>
    </div>
  );
};
