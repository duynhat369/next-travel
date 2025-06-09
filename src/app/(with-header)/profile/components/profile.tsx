import { UserDB } from '@/lib/api/user';
import { UserInformation } from './user-information/user-information';
import { UserTabs } from './user-tabs';

interface ProfileClientProps {
  user?: UserDB;
}

export function Profile({ user }: ProfileClientProps) {
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
        <p className="text-center text-lg text-gray-500">Không tìm thấy thông tin người dùng.</p>
      </div>
    );
  }
  // Nếu không có user, có thể hiển thị thông báo hoặc redirect
  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
      <UserInformation user={user} />
      <UserTabs />
    </div>
  );
}
