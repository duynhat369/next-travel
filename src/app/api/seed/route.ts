// import { connectToDatabase } from '@/lib/db/mongodb';
// import { NextResponse } from 'next/server';
// import { getTourModel } from '../tours/route'; // Import từ file tours route

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const Tour = getTourModel();

//     // Xóa dữ liệu cũ nếu cần
//     await Tour.deleteMany({});

//     // Thêm dữ liệu mẫu
//     const sampleTours = [
//       {
//         title: 'Núi Bà Đen - Tây Ninh',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm, và đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
//         price: 2160000,
//         originalPrice: 2400000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Hồ Cốc - Vũng Tàu',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
//         price: 900000,
//         originalPrice: 900000,
//         discountPercentage: 0,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Khám Phá Sơn Đòong',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm, và đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị.',
//         price: 10800000,
//         originalPrice: 12000000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Trekking Ngũ Long Công Chúa',
//         description:
//           'Đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
//         price: 10800000,
//         originalPrice: 12000000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Núi Bà Đen - Tây Ninh 2',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm, và đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
//         price: 2160000,
//         originalPrice: 2400000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Hồ Cốc - Vũng Tàu 2',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
//         price: 900000,
//         originalPrice: 900000,
//         discountPercentage: 0,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Khám Phá Sơn Đòong 2',
//         description:
//           'Với LATATA không lo về giá, với đội ngũ dẫn đoàn nhiệt huyết, đầy dẫn kinh nghiệm, và đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị.',
//         price: 10800000,
//         originalPrice: 12000000,
//         discountPercentage: 10,
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//       },
//       {
//         title: 'Trekking Ngũ Long Công Chúa 2',
//         description:
//           'Đội ngũ vô cùng đồng đào chúng tôi tin rằng sẽ mang lại cho bạn những trải nghiệm tuyệt vời nhất những khoảng khắc đáng nhớ, thú vị. Hơn thế nữa chúng tôi đảm bảo chuyến đi của bạn luôn an toàn, bảo tồn văn hoá du lịch',
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
