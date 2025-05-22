import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    id: '1',
    question: 'Chuyển đi của tôi có an toàn không?',
    answer:
      'Chúng tôi cam kết đảm bảo an toàn tuyệt đối cho mọi chuyến đi. Tất cả tài xế đều được kiểm tra lý lịch kỹ càng và xe được bảo dưỡng định kỳ.',
  },
  {
    id: '2',
    question: 'Bao nhiều tôi quên đồ là đồ cho chuyến đi này?',
    answer:
      'Nếu bạn quên đồ trên xe, hãy liên hệ ngay với hotline 1900-xxx-xxx hoặc báo qua app. Chúng tôi sẽ hỗ trợ liên lạc với tài xế để tìm lại đồ của bạn.',
  },
  {
    id: '3',
    question: 'Chuyến đi của tôi có an toàn không?',
    answer:
      'Mọi chuyến đi đều được theo dõi GPS thời gian thực và có hệ thống báo động khẩn cấp. Bạn có thể chia sẻ vị trí với người thân để đảm bảo an toàn.',
  },
  {
    id: '4',
    question: 'Bao nhiều tôi quên đồ là đồ cho chuyến đi này?',
    answer:
      'Thời gian xử lý tìm đồ thất lạc thường từ 24-48 giờ. Chúng tôi sẽ thông báo ngay khi tìm thấy và hỗ trợ giao trả đồ cho bạn.',
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>

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
  );
};
