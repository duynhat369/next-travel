import ToursClient from './tours-client';

export async function generateMetadata() {
  return {
    title: 'Các tour của Latata',
    description:
      'Latata là một nền tảng booking du lịch trực tuyến, cung cấp các tour du lịch chất lượng cao, tour du lịch độc đáo, mạo hiểm và dịch vụ tour theo yêu cầu trọn gói của khách hàng.',
    openGraph: {
      title: 'Các tour của Latata',
      description:
        'Latata là một nền tảng booking du lịch trực tuyến, cung cấp các tour du lịch chất lượng cao, tour du lịch độc đáo, mạo hiểm và dịch vụ tour theo yêu cầu trọn gói của khách hàng.',
      // images: [
      //   signOgImageUrl({
      //     title: "Các tour của Latata",
      //     brand: config.blog.name,
      //   }),
      // ],
    },
  };
}

export default function ToursPage() {
  return <ToursClient />;
}
