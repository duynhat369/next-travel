'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { UserDB } from '@/lib/api/user';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { UserAvatar } from './user-avatar';
import { UserDetail } from './user-detail';

interface Props {
  user?: UserDB;
}

interface FormData {
  email: string;
  phoneNumber: string;
}

export const UserInformation = ({ user }: Props) => {
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Thông tin cá nhân</h1>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <UserAvatar user={user} />

            {/* User Info Section */}
            <div className="flex-1 space-y-6">
              <UserDetail
                user={user}
                isEditingPhone={isEditingPhone}
                onEditPhone={() => setIsEditingPhone(true)}
                onSuccess={() => setIsEditingPhone(false)}
                onCancel={() => setIsEditingPhone(false)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
