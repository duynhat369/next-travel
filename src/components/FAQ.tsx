'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    id: '1',
    question: 'Chuyến đi của tôi có an toàn không?',
    answer:
      'Chúng tôi cam kết đảm bảo an toàn tuyệt đối cho mọi chuyến đi. Tất cả tài xế đều được kiểm tra lý lịch kỹ càng và xe được bảo dưỡng định kỳ. Bạn có thể yên tâm khi sử dụng dịch vụ của chúng tôi. Nếu có bất kỳ vấn đề gì xảy ra trong chuyến đi, hãy liên hệ ngay với chúng tôi qua hotline 0815567712 để được hỗ trợ kịp thời.',
  },
  {
    id: '6',
    question: 'Các sản phẩm handmade của LATATA có gì đặc biệt?',
    answer:
      'Sản phẩm handmade của LATATA được làm thủ công từ những nguyên liệu tự nhiên, mang đậm bản sắc văn hóa Việt Nam. Mỗi sản phẩm đều có câu chuyện riêng, thể hiện tâm huyết và sự sáng tạo của người nghệ nhân. Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng và độc đáo nhất. Hãy ghé thăm cửa hàng của chúng tôi để trải nghiệm và lựa chọn những sản phẩm yêu thích nhé! Nếu bạn cần thêm thông tin, hãy liên hệ với chúng tôi qua hotline hoặc email.',
  },
  {
    id: '2',
    question: 'Tôi quên đồ trên xe, phải làm sao?',
    answer:
      'Nếu bạn quên đồ trên xe, hãy liên hệ ngay với hotline 0815567712 hoặc báo qua email. Chúng tôi sẽ hỗ trợ liên lạc với tài xế để tìm lại đồ của bạn.',
  },
  {
    id: '3',
    question: 'Tôi muốn hủy chuyến đi, có mất phí không?',
    answer:
      'Nếu bạn hủy chuyến đi trước 24 giờ so với thời gian khởi hành, sẽ không mất phí. Tuy nhiên, nếu hủy trong vòng 24 giờ trước chuyến đi, bạn sẽ bị tính phí hủy là 50% giá trị chuyến đi.',
  },
  {
    id: '4',
    question: 'Tôi có thể thay đổi thông tin chuyến đi đã đặt không?',
    answer:
      'Bạn có thể thay đổi thông tin chuyến đi đã đặt bằng cách liên hệ với chúng tôi qua hotline hoặc email. Chúng tôi sẽ hỗ trợ bạn thay đổi thông tin nếu còn thời gian trước chuyến đi.',
  },
  {
    id: '5',
    question: 'Làm thế nào để cá nhân hóa chuyến đi của tôi?',
    answer:
      'Bạn có thể cá nhân hóa chuyến đi của mình bằng cách cung cấp thông tin chi tiết về điểm đón, điểm đến, thời gian và các yêu cầu đặc biệt khi đặt xe. Chúng tôi sẽ cố gắng đáp ứng mọi nhu cầu của bạn để chuyến đi trở nên thoải mái nhất.',
  },
  {
    id: '7',
    question: 'Tôi có thể đặt chuyến đi cho người khác không?',
    answer:
      'Hoàn toàn có thể! Bạn có thể đặt chuyến đi cho người khác bằng cách cung cấp thông tin của họ khi đặt xe. Chúng tôi sẽ đảm bảo rằng người được đặt xe sẽ nhận được dịch vụ tốt nhất. Nếu bạn cần hỗ trợ, hãy liên hệ với chúng tôi qua hotline hoặc email.',
  },
  {
    id: '8',
    question: 'Các câu hỏi thường gặp khác',
    answer:
      'Nếu bạn có bất kỳ câu hỏi nào khác, hãy tham khảo phần Câu hỏi thường gặp trên trang web của chúng tôi hoặc liên hệ với chúng tôi qua hotline 0815567712 hoặc email. Chúng tôi luôn sẵn sàng hỗ trợ bạn.',
  },
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="mt-20 md:mt-24 mb-16 bg-white" id="FAQs">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Câu hỏi thường gặp</h2>

        <div className="space-y-3">
          {faqData.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-900 font-medium pr-4">{item.question}</span>
                <motion.div
                  animate={{
                    rotate: openItems.has(item.id) ? 45 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.has(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed pt-4">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
