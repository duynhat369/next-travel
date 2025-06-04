'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cartApi } from '@/lib/api/cart';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, ShoppingCart } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { CartContent } from './cart/cart-content';

interface Props {}

export const UserTabs = ({}: Props) => {
  const params = useParams();

  const { userId } = params;
  const [activeTab, setActiveTab] = useState('cart');

  // Fetch cart data using React Query
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart-by-user', userId],
    queryFn: () => cartApi.getCart((userId as string) || ''),
    enabled: activeTab === 'cart', // Only fetch when cart tab is active
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-0">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 rounded-none">
                <TabsTrigger
                  value="cart"
                  className="relative py-4 px-6 rounded-none border-b-2 data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 font-medium"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Giỏ hàng
                    {cartData?.cart?.totalItems ? (
                      <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 ml-1">
                        {cartData.cart.totalItems}
                      </span>
                    ) : null}
                  </motion.div>
                </TabsTrigger>
                <TabsTrigger
                  value="booking-history"
                  className="relative py-4 px-6 rounded-none border-b-2 data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Calendar className="w-5 h-5" />
                    Tour booking
                  </motion.div>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="cart" className="mt-0">
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Không thể tải giỏ hàng
                    </h3>
                    <p className="text-foreground-secondary">
                      Đã xảy ra lỗi khi tải giỏ hàng. Vui lòng thử lại sau.
                    </p>
                  </motion.div>
                ) : (
                  <CartContent
                    cartData={cartData}
                    isLoading={isLoading}
                    userId={userId as string}
                  />
                )}
              </TabsContent>

              <TabsContent value="booking-history" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Tour booking</h3>
                  <p className="text-foreground-secondary">
                    Lịch sử đặt tour sẽ được hiển thị ở đây
                  </p>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
