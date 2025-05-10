// import { connectToDatabase } from '@/lib/db/mongodb';
// import { NextResponse } from 'next/server';
// import { getTourModel } from '../tours/route'; // Import từ file tours route

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const Tour = getTourModel();

//     // Xóa dữ liệu cũ nếu cần
//     // await Tour.deleteMany({});

//     // Thêm dữ liệu mẫu
//     const sampleTours = [
//       {
//         title: 'An Giang - Châu Đốc',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm, và đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
//         price: 2160000,
//         originalPrice: 2400000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         isHot: false,
//       },
//       {
//         title: 'Mùa Hạ Buôn Ma Thuột',
//         description:
//           'Khám phá Buôn Ma Thuột vào mùa hạ là tour trải nghiệm dài ngày đặc biệt của Latata, ở đây bạn được "lên rừng xuống suối" được thưởng thức vẻ đẹp hoang sơ hùng vĩ của đại ngàn Tây Nguyên, được thưởng thức những ly cà phê thơm ngon đậm vị nhất trong đời mình. Được cưỡi Voi được tắm thác và hơn thế nữa',
//         price: 900000,
//         originalPrice: 900000,
//         discountPercentage: 0,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         isHot: true,
//       },
//       {
//         title: 'Tour Xuyên Việt bằng xe máy',
//         description:
//           'Tour xuyên việt bằng xe máy là một hành trình dài và đầy thử thách, đưa bạn từ miền Bắc đến miền Nam của Việt Nam. Bạn sẽ được trải nghiệm những cảnh đẹp tuyệt vời, từ những dãy núi hùng vĩ đến những bãi biển tuyệt đẹp.',
//         price: 10800000,
//         originalPrice: 12000000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//     ];

//     await Tour.insertMany(sampleTours);

//     return NextResponse.json({
//       success: true,
//       message: 'Dữ liệu mẫu đã được thêm thành công',
//     });
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     return NextResponse.json(
//       { success: false, error: 'Đã xảy ra lỗi khi thêm dữ liệu mẫu' },
//       { status: 500 }
//     );
//   }
// }
