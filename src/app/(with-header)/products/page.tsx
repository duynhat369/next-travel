import ProductsClient from './products-client';

export async function generateMetadata() {
  return {
    title: 'Các sản phẩm của Latata',
    description:
      'Latata cung cấp sản phẩm, thiết bị du lịch và cắm trại chất lượng cao, giúp bạn tận hưởng những chuyến đi tuyệt vời nhất.',
    openGraph: {
      title: 'Các tour của Latata',
      description:
        'Latata cung cấp sản phẩm, thiết bị du lịch và cắm trại chất lượng cao, giúp bạn tận hưởng những chuyến đi tuyệt vời nhất.',
      // images: [
      //   signOgImageUrl({
      //     title: "Các tour của Latata",
      //     brand: config.blog.name,
      //   }),
      // ],
    },
  };
}

export default function ProductsPage() {
  return <ProductsClient />;
}
