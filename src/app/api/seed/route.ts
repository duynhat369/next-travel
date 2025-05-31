// import { connectToDatabase } from '@/lib/db/mongodb';
// import { NextResponse } from 'next/server';
// import { getProductModel } from '../products/route';

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const Product = getProductModel();

//     const sampleProducts = [
//       {
//         name: 'Dao lưỡi vằn LATATA',
//         description:
//           'Dao lưỡi vằn là một sản phẩm chuyên dụng cho các hoạt động cắm trại và dã ngoại, được thiết kế để bảo vệ người sử dụng khỏi các tác nhân bên ngoài như côn trùng, tia UV và thời tiết khắc nghiệt. Với chất liệu chống nước và thoáng khí, sản phẩm này sẽ là người bạn đồng hành lý tưởng trong mọi chuyến phiêu lưu.',
//         productCode: 'CAM-00001',
//         price: 200000,
//         originalPrice: 250000,
//         discountPercentage: 20,
//         categoryType: ['camping', 'clothing'],
//         tags: ['camping', 'clothing'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Dao lưỡi vằn LATATA - Bảo Vệ Hoàn Hảo</h2>
//  <p>Dao lưỡi vằn LATATA được thiết kế đặc biệt cho những chuyến phiêu lưu khám phá thiên nhiên Việt Nam.</p>
//  <h3>Tính năng nổi bật:</h3>
//  <ul>
//    <li><strong>Chống UV</strong>: Bảo vệ 99% tia UV có hại</li>
//    <li><strong>Thoáng khí</strong>: Hệ thống lỗ thông hơi thông minh</li>
//    <li><strong>Chống nước</strong>: Vải chống thấm nước hiệu quả</li>
//  </ul>
//  <p>Sản phẩm được <em>bảo hành 2 năm</em> và miễn phí bảo trì.</p>
// </div>
// `,
//         stock: 100,
//       },
//       {
//         name: 'Đồ đánh lửa LATATA Firestarter',
//         description:
//           'Đồ đánh lửa LATATA Firestarter là bộ dụng cụ hoàn hảo để khởi động lửa nhanh chóng và an toàn trong mọi điều kiện thời tiết. Bao gồm que đánh lửa, đá lửa và dây thừng chống cháy.',
//         productCode: 'CAM-00002',
//         price: 1500000,
//         originalPrice: 1800000,
//         discountPercentage: 17,
//         categoryType: ['camping', 'souvenir'],
//         tags: ['camping', 'souvenir'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Đồ đánh lửa LATATA Firestarter</h2>
//  <p>Đồ đánh lửa LATATA Firestarter mang đến không gian nghỉ ngơi thoải mái và an toàn trong mọi điều kiện thời tiết.</p>
//  <h3>Đặc điểm kỹ thuật:</h3>
//  <ul>
//    <li><strong>Chống thấm</strong>: Độ chống thấm 3000mm</li>
//    <li><strong>Nhẹ gọn</strong>: Chỉ 2.5kg khi đóng gói</li>
//    <li><strong>Dễ lắp đặt</strong>: Chỉ mất 5 phút để dựng lều</li>
//    <li><strong>Thông gió tốt</strong>: 2 cửa sổ lưới chống muỗi</li>
//  </ul>
//  <p>Bảo hành <em>3 năm</em> cho khung lều và vải chống thấm.</p>
// </div>
// `,
//         stock: 50,
//       },
//       {
//         name: 'Ốp điện thoại LATATA EcoCase',
//         description:
//           'Ốp điện thoại LATATA EcoCase được làm từ vật liệu tái chế, bảo vệ môi trường và an toàn cho sức khỏe. Thiết kế mỏng nhẹ, vừa vặn với các dòng điện thoại phổ biến.',
//         productCode: 'SUV-00003',
//         price: 800000,
//         originalPrice: 950000,
//         discountPercentage: 16,
//         categoryType: ['camping', 'souvenir'],
//         tags: ['souvenir'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Ba Lô Trekking LATATA Mountain 45L - Người Bạn Đồng Hành</h2>
//  <p>Ba lô trekking LATATA Mountain 45L được thiết kế để đáp ứng mọi nhu cầu của những chuyến đi dài ngày.</p>
//  <h3>Tính năng vượt trội:</h3>
//  <ul>
//    <li><strong>Ergonomic</strong>: Hệ thống đeo giảm áp lực lưng</li>
//    <li><strong>Đa ngăn</strong>: 7 ngăn chứa đồ khác nhau</li>
//    <li><strong>Chống nước</strong>: Vải Ripstop chống thấm</li>
//    <li><strong>Phản quang</strong>: Dải phản quang an toàn</li>
//  </ul>
//  <p>Bảo hành <em>5 năm</em> cho khóa kéo và khung đỡ.</p>
// </div>
// `,
//         stock: 75,
//       },
//       {
//         name: 'Sticker mũ bảo hiểm LATATA',
//         description:
//           'Sticker mũ bảo hiểm LATATA là bộ sưu tập hình dán độc đáo, giúp bạn cá nhân hóa mũ bảo hiểm của mình. Chất liệu vinyl chống nước, bền màu và dễ dán.',
//         productCode: 'SUV-00004',
//         price: 350000,
//         originalPrice: 400000,
//         discountPercentage: 13,
//         categoryType: ['camping', 'motor', 'souvenir'],
//         tags: ['souvenir'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Đèn Pin LED LATATA Torch - Ánh Sáng Mạnh Mẽ</h2>
//  <p>Đèn pin LED LATATA Torch mang đến ánh sáng mạnh mẽ và tin cậy cho mọi chuyến phiêu lưu của bạn.</p>
//  <h3>Thông số kỹ thuật:</h3>
//  <ul>
//    <li><strong>Độ sáng</strong>: 1000 lumens siêu sáng</li>
//    <li><strong>Pin</strong>: Sạc USB-C, sử dụng 12 giờ</li>
//    <li><strong>Chống nước</strong>: Chuẩn IPX7</li>
//    <li><strong>5 chế độ</strong>: Sáng, vừa, nhỏ, nhấp nháy, SOS</li>
//  </ul>
//  <p>Bảo hành <em>2 năm</em> và thay pin miễn phí trong năm đầu.</p>
// </div>
// `,
//         stock: 120,
//       },
//       {
//         name: 'Mũ fullface LATATA',
//         description:
//           'Mũ fullface LATATA được thiết kế để bảo vệ toàn diện trong các chuyến đi phượt. Chất liệu nhựa ABS cao cấp, kính chắn gió chống trầy xước và thoáng khí.',
//         productCode: 'MOT-00005',
//         price: 450000,
//         originalPrice: 500000,
//         discountPercentage: 10,
//         categoryType: ['souvenir', 'camping', 'motor'],
//         tags: ['souvenir', 'camping', 'motor'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Áo Khoác Gió LATATA Windbreaker - Bảo Vệ Linh Hoạt</h2>
//  <p>Áo khoác gió LATATA Windbreaker là lựa chọn hoàn hảo cho những ai cần sự linh hoạt trong mọi điều kiện thời tiết.</p>
//  <h3>Ưu điểm nổi bật:</h3>
//  <ul>
//    <li><strong>Siêu nhẹ</strong>: Chỉ 180g, gấp gọn như chiếc điện thoại</li>
//    <li><strong>Chống gió</strong>: Vải Ripstop chống gió hiệu quả</li>
//    <li><strong>Thoáng khí</strong>: Lỗ thông hơi dưới nách</li>
//    <li><strong>Phản quang</strong>: Logo phản quang an toàn</li>
//  </ul>
//  <p>Có 5 size từ S đến XXL, bảo hành <em>1 năm</em>.</p>
// </div>
// `,
//         stock: 80,
//       },
//       {
//         name: 'Dao gỗ LATATA Vietnam',
//         description:
//           'Dao gỗ LATATA Vietnam là món quà lưu niệm độc đáo, được làm thủ công từ gỗ tự nhiên. Thiết kế hình bản đồ Việt Nam tinh xảo, mang đậm dấu ấn văn hóa Việt Nam.',
//         productCode: 'SUV-00006',
//         price: 50000,
//         originalPrice: 60000,
//         discountPercentage: 17,
//         categoryType: ['souvenir'],
//         tags: ['souvenir'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Móc Khóa Gỗ LATATA Vietnam - Kỷ Niệm Đáng Nhớ</h2>
//  <p>Móc khóa gỗ LATATA Vietnam là món quà lưu niệm hoàn hảo, mang đậm dấu ấn văn hóa Việt Nam.</p>
//  <h3>Đặc điểm sản phẩm:</h3>
//  <ul>
//    <li><strong>Thủ công</strong>: Khắc tay bởi nghệ nhân lành nghề</li>
//    <li><strong>Gỗ tự nhiên</strong>: Gỗ sồi cao cấp, bền đẹp</li>
//    <li><strong>Thiết kế độc đáo</strong>: Hình bản đồ Việt Nam tinh xảo</li>
//    <li><strong>Ý nghĩa</strong>: Tượng trưng cho tình yêu quê hương</li>
//  </ul>
//  <p>Sản phẩm thân thiện môi trường, <em>không bảo hành</em> do tính chất tự nhiên.</p>
// </div>
// `,
//         stock: 200,
//       },
//       {
//         name: 'Mũ 3/4 LATATA',
//         description:
//           'Mũ 3/4 LATATA là lựa chọn hoàn hảo cho những chuyến đi phượt. Chất liệu nhựa ABS cao cấp, kính chắn gió chống trầy xước và thoáng khí. Thiết kế thời trang, phù hợp với nhiều phong cách.',
//         productCode: 'MOT-00007',
//         price: 1200000,
//         originalPrice: 1400000,
//         discountPercentage: 14,
//         categoryType: ['camping', 'motor', 'souvenir'],
//         tags: ['camping', 'motor', 'souvenir'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Túi Ngủ LATATA Comfort -5°C - Giấc Ngủ Ấm Áp</h2>
//  <p>Túi ngủ LATATA Comfort được thiết kế để mang đến giấc ngủ thoải mái ngay cả trong điều kiện thời tiết khắc nghiệt.</p>
//  <h3>Thông số kỹ thuật:</h3>
//  <ul>
//    <li><strong>Nhiệt độ</strong>: Thoải mái ở 0°C, chịu được -5°C</li>
//    <li><strong>Trọng lượng</strong>: 1.8kg khi đóng gói</li>
//    <li><strong>Chất liệu</strong>: Vỏ nylon, lót bông tổng hợp</li>
//    <li><strong>Kích thước</strong>: 220cm x 80cm</li>
//  </ul>
//  <p>Bảo hành <em>3 năm</em> cho khóa kéo và chất liệu vỏ.</p>
// </div>
// `,
//         stock: 40,
//       },
//       {
//         name: 'Tấm cách nhiệt LATATA Insulator',
//         description:
//           'Tấm cách nhiệt LATATA Insulator là giải pháp hoàn hảo để giữ ấm trong các chuyến đi cắm trại. Chất liệu nhôm phản xạ nhiệt, dễ dàng gấp gọn và mang theo.',
//         productCode: 'CAM-00008',
//         price: 280000,
//         originalPrice: 320000,
//         discountPercentage: 13,
//         categoryType: ['camping'],
//         tags: ['camping'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `
// <div class="product-description">
//  <h2>Bình Nước LATATA Steel 750ml - Hydration Hoàn Hảo</h2>
//  <p>Bình nước LATATA Steel mang đến giải pháp hydration lý tưởng cho mọi hoạt động outdoor và thể thao.</p>
//  <h3>Tính năng ưu việt:</h3>
//  <ul>
//    <li><strong>Inox 304</strong>: An toàn tuyệt đối cho sức khỏe</li>
//    <li><strong>Cách nhiệt</strong>: Giữ nhiệt 12h, giữ lạnh 24h</li>
//    <li><strong>Chống rò rỉ</strong>: Nắp đậy kín 100%</li>
//    <li><strong>Dung tích</strong>: 750ml vừa phải</li>
//  </ul>
//  <p>Thân thiện môi trường, bảo hành <em>2 năm</em> chống rỉ sét.</p>
// </div>
// `,
//         stock: 150,
//       },
//     ];
//     // Sử dụng insertMany thay vì insertOne để thêm nhiều document
//     const result = await Product.insertMany(sampleProducts);

//     return NextResponse.json({
//       success: true,
//       message: `Đã thêm thành công sản phẩm mẫu`,
//     });
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     return NextResponse.json(
//       { success: false, error: 'Đã xảy ra lỗi khi thêm dữ liệu mẫu' },
//       { status: 500 }
//     );
//   }
// }
