'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cartApi } from '@/lib/api/cart';
import { useCartStore } from '@/store/cart-store';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BookingContent } from './booking/booking-content';
import { CartContent } from './cart/cart-content';

export const UserTabs = () => {
  const { data: session } = useSession();
  const { id: userId } = session?.user || {};
  const [activeTab, setActiveTab] = useState('cart');
  const { setCarts } = useCartStore();

  // Fetch cart data using React Query
  const { data: cartData, error } = useQuery({
    queryKey: ['cart-by-user-1', userId],
    queryFn: () => cartApi.getCart((userId as string) || ''),
    enabled: activeTab === 'cart', // Only fetch when cart tab is active
  });
  // setCarts(cartData?.cart ? [cartData.cart] : []);
  useEffect(() => {
    if (cartData?.cart) {
      setCarts([cartData.cart]);
    } else {
      setCarts([]);
    }
  }, [cartData, setCarts]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-0 border-gray-200">
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
                    <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 ml-1">
                      {cartData?.cart.totalItems}
                    </span>
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
                  <CartContent userId={userId as string} />
                )}
              </TabsContent>

              <TabsContent value="booking-history" className="mt-0">
                {userId && <BookingContent userId={userId as string} />}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
