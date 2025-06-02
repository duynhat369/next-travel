// import { connectToDatabase } from '@/lib/db/mongodb';
// import { NextResponse } from 'next/server';
// import { getProductModel } from '../products/route';

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const Product = getProductModel();

//     const sampleProducts = [
//       {
//         name: 'Đèn trợ sáng cho xe máy cao cấp',
//         description:
//           'Đèn trợ sáng cho xe máy cao cấp giúp tăng cường ánh sáng, an toàn khi di chuyển vào ban đêm. Thiết kế hiện đại, dễ lắp đặt và sử dụng với nhiều chế độ chiếu sáng linh hoạt. Sản phẩm phù hợp cho mọi loại xe máy, mang lại trải nghiệm lái xe an toàn và thoải mái hơn. Đặc biệt, đèn có khả năng chống nước và bụi bẩn, đảm bảo hiệu suất ổn định trong mọi điều kiện thời tiết.',
//         productCode: 'MOT-123221',
//         price: 2000000,
//         originalPrice: 2000000,
//         discountPercentage: 0,
//         categoryType: ['camping', 'motor'],
//         tags: ['camping', 'motor'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `<div class="product-description text-base leading-relaxed text-gray-700">
//   <h2 class="text-2xl font-bold text-gray-900 mb-4">Đèn trợ sáng cho xe máy cao cấp</h2>

//   <p class="mb-4">
//     <strong>LATATA</strong> là thương hiệu uy tín chuyên cung cấp các sản phẩm chất lượng cao trong lĩnh vực <em>du lịch dã ngoại (camping)</em>, <em>đồ lưu niệm cá tính</em>, và <em>phụ kiện xe máy</em>. Với triết lý "Sống chất – Đi xa – Khám phá nhiều hơn", LATATA cam kết mang đến những trải nghiệm thực tế và bền vững cho cộng đồng yêu thích khám phá và sáng tạo phong cách sống cá nhân.
//   </p>

//   <p class="mb-4">
//     Một trong những sản phẩm nổi bật của LATATA chính là <strong>bình giữ nhiệt LATATA Steel 750ml</strong> – sự lựa chọn lý tưởng cho những ai yêu thích sự gọn nhẹ, đa năng và tinh tế trong từng chi tiết. Được nghiên cứu và thiết kế phù hợp với khí hậu và lối sống năng động của người Việt, sản phẩm này không chỉ là một bình nước – mà còn là một phần trong hành trình sống xanh và chủ động.
//   </p>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Đặc điểm nổi bật của sản phẩm:</h3>
//   <ul class="list-disc list-inside space-y-2 mb-4">
//     <li><strong>Chất liệu Inox 304 cao cấp:</strong> Không chứa BPA, đảm bảo an toàn cho sức khỏe ngay cả khi sử dụng trong thời gian dài.</li>
//     <li><strong>Khả năng giữ nhiệt vượt trội:</strong> Giữ nóng lên đến <span class="text-red-500 font-semibold">12 giờ</span>, giữ lạnh đến <span class="text-blue-500 font-semibold">24 giờ</span> – phù hợp cho cả mùa hè lẫn mùa đông.</li>
//     <li><strong>Thiết kế kín tuyệt đối:</strong> Nắp đậy xoắn chắc chắn, chống rò rỉ nước kể cả khi lật úp hoặc để trong balo.</li>
//     <li><strong>Dễ vệ sinh:</strong> Miệng bình rộng, tiện lợi cho việc làm sạch và thêm đá viên hoặc lát trái cây.</li>
//     <li><strong>Dung tích 750ml:</strong> Đủ dùng cho cả ngày dài mà vẫn gọn nhẹ khi mang theo bên người.</li>
//   </ul>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Phong cách thiết kế:</h3>
//   <p class="mb-4">
//     LATATA Steel sở hữu thiết kế tối giản mang hơi hướng hiện đại. Lớp sơn tĩnh điện nhám mịn chống trầy giúp bình luôn bền đẹp dù sử dụng thường xuyên. Logo được khắc laser tinh tế ở phần đế và nắp tạo điểm nhấn đặc trưng cho thương hiệu.
//   </p>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Ứng dụng linh hoạt:</h3>
//   <p class="mb-4">
//     Sản phẩm phù hợp sử dụng trong nhiều hoàn cảnh: từ học sinh, sinh viên đến nhân viên văn phòng, người chơi thể thao, các tín đồ du lịch bụi hay người lái xe đường dài. Dù bạn đang khám phá núi rừng, cắm trại ở vùng biển, hay chỉ đơn giản là cần một chiếc bình giữ nhiệt chất lượng trong ngày làm việc – LATATA Steel đều là lựa chọn hoàn hảo.
//   </p>

//   <div class="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-4">
//     <p class="text-gray-800 font-medium">🎁 <strong>Bảo hành 2 năm</strong> – Cam kết chống rò rỉ, gỉ sét và lỗi kỹ thuật từ nhà sản xuất.</p>
//     <p class="text-gray-600 text-sm mt-2">Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm có lỗi. Dịch vụ chăm sóc khách hàng 24/7 từ LATATA.</p>
//   </div>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Vì sao nên chọn sản phẩm từ LATATA?</h3>
//   <ul class="list-disc list-inside space-y-1 mb-4">
//     <li>Sản phẩm được thiết kế dành riêng cho nhu cầu thực tế của người Việt.</li>
//     <li>Chất lượng cao, giá thành hợp lý và hậu mãi minh bạch.</li>
//     <li>Mẫu mã đa dạng, cập nhật liên tục theo xu hướng mới nhất.</li>
//     <li>Thương hiệu được cộng đồng du lịch và phượt thủ tin dùng.</li>
//   </ul>

//   <p class="italic text-sm text-gray-500">
//     *Lưu ý: Không sử dụng bình để chứa chất lỏng có gas, axit mạnh hoặc các dung dịch dễ ăn mòn.
//   </p>
// </div>
// `,
//         stock: 100,
//       },
//       {
//         name: 'Móc khóa xe máy LATATA - Travel',
//         description:
//           'Móc khóa xe máy LATATA - Travel là phụ kiện tiện ích và thời trang, giúp bạn dễ dàng quản lý chìa khóa xe máy. Sản phẩm được làm từ chất liệu cao cấp, bền bỉ, với thiết kế nhỏ gọn và nhẹ nhàng. Móc khóa có thể gắn vào balo, túi xách hoặc chìa khóa xe, mang lại sự tiện lợi và phong cách cho người sử dụng. Đây là món quà ý nghĩa cho những người yêu thích du lịch và khám phá.',
//         productCode: 'SUV-894219',
//         price: 49500,
//         discountPercentage: 10,
//         originalPrice: 55000,
//         categoryType: ['camping', 'motor'],
//         tags: ['camping', 'motor'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `<div class="product-description text-base leading-relaxed text-gray-700">
//   <h2 class="text-2xl font-bold text-gray-900 mb-4">Móc khóa xe máy LATATA - Travel</h2>

//   <p class="mb-4">
//     <strong>LATATA</strong> là thương hiệu uy tín chuyên cung cấp các sản phẩm chất lượng cao trong lĩnh vực <em>du lịch dã ngoại (camping)</em>, <em>đồ lưu niệm cá tính</em>, và <em>phụ kiện xe máy</em>. Với triết lý "Sống chất – Đi xa – Khám phá nhiều hơn", LATATA cam kết mang đến những trải nghiệm thực tế và bền vững cho cộng đồng yêu thích khám phá và sáng tạo phong cách sống cá nhân.
//   </p>

//   <p class="mb-4">
//     Một trong những sản phẩm nổi bật của LATATA chính là <strong>bình giữ nhiệt LATATA Steel 750ml</strong> – sự lựa chọn lý tưởng cho những ai yêu thích sự gọn nhẹ, đa năng và tinh tế trong từng chi tiết. Được nghiên cứu và thiết kế phù hợp với khí hậu và lối sống năng động của người Việt, sản phẩm này không chỉ là một bình nước – mà còn là một phần trong hành trình sống xanh và chủ động.
//   </p>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Đặc điểm nổi bật của sản phẩm:</h3>
//   <ul class="list-disc list-inside space-y-2 mb-4">
//     <li><strong>Chất liệu Inox 304 cao cấp:</strong> Không chứa BPA, đảm bảo an toàn cho sức khỏe ngay cả khi sử dụng trong thời gian dài.</li>
//     <li><strong>Khả năng giữ nhiệt vượt trội:</strong> Giữ nóng lên đến <span class="text-red-500 font-semibold">12 giờ</span>, giữ lạnh đến <span class="text-blue-500 font-semibold">24 giờ</span> – phù hợp cho cả mùa hè lẫn mùa đông.</li>
//     <li><strong>Thiết kế kín tuyệt đối:</strong> Nắp đậy xoắn chắc chắn, chống rò rỉ nước kể cả khi lật úp hoặc để trong balo.</li>
//     <li><strong>Dễ vệ sinh:</strong> Miệng bình rộng, tiện lợi cho việc làm sạch và thêm đá viên hoặc lát trái cây.</li>
//     <li><strong>Dung tích 750ml:</strong> Đủ dùng cho cả ngày dài mà vẫn gọn nhẹ khi mang theo bên người.</li>
//   </ul>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Phong cách thiết kế:</h3>
//   <p class="mb-4">
//     LATATA Steel sở hữu thiết kế tối giản mang hơi hướng hiện đại. Lớp sơn tĩnh điện nhám mịn chống trầy giúp bình luôn bền đẹp dù sử dụng thường xuyên. Logo được khắc laser tinh tế ở phần đế và nắp tạo điểm nhấn đặc trưng cho thương hiệu.
//   </p>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Ứng dụng linh hoạt:</h3>
//   <p class="mb-4">
//     Sản phẩm phù hợp sử dụng trong nhiều hoàn cảnh: từ học sinh, sinh viên đến nhân viên văn phòng, người chơi thể thao, các tín đồ du lịch bụi hay người lái xe đường dài. Dù bạn đang khám phá núi rừng, cắm trại ở vùng biển, hay chỉ đơn giản là cần một chiếc bình giữ nhiệt chất lượng trong ngày làm việc – LATATA Steel đều là lựa chọn hoàn hảo.
//   </p>

//   <div class="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-4">
//     <p class="text-gray-800 font-medium">🎁 <strong>Bảo hành 2 năm</strong> – Cam kết chống rò rỉ, gỉ sét và lỗi kỹ thuật từ nhà sản xuất.</p>
//     <p class="text-gray-600 text-sm mt-2">Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm có lỗi. Dịch vụ chăm sóc khách hàng 24/7 từ LATATA.</p>
//   </div>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Vì sao nên chọn sản phẩm từ LATATA?</h3>
//   <ul class="list-disc list-inside space-y-1 mb-4">
//     <li>Sản phẩm được thiết kế dành riêng cho nhu cầu thực tế của người Việt.</li>
//     <li>Chất lượng cao, giá thành hợp lý và hậu mãi minh bạch.</li>
//     <li>Mẫu mã đa dạng, cập nhật liên tục theo xu hướng mới nhất.</li>
//     <li>Thương hiệu được cộng đồng du lịch và phượt thủ tin dùng.</li>
//   </ul>

//   <p class="italic text-sm text-gray-500">
//     *Lưu ý: Không sử dụng bình để chứa chất lỏng có gas, axit mạnh hoặc các dung dịch dễ ăn mòn.
//   </p>
// </div>
// `,
//         stock: 100,
//       },
//       {
//         name: 'Mũ thời trang leo núi LATATA - Explore',
//         description:
//           'Mũ thời trang leo núi LATATA - Explore là sản phẩm thiết kế đặc biệt dành cho những người yêu thích khám phá thiên nhiên. Với chất liệu vải cao cấp, mũ mang lại cảm giác thoải mái và bảo vệ tốt khỏi ánh nắng mặt trời. Thiết kế hiện đại, dễ dàng điều chỉnh kích thước, phù hợp với nhiều kích cỡ đầu. Mũ có thể gập gọn, tiện lợi khi mang theo trong các chuyến đi. Đây là món phụ kiện không thể thiếu cho những chuyến phiêu lưu ngoài trời của bạn.',
//         productCode: 'CLO-214000',
//         price: 120370,
//         discountPercentage: 5,
//         originalPrice: 126000,
//         categoryType: ['camping', 'clothing'],
//         tags: ['camping', 'clothing'],
//         thumbnail:
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         gallery: [
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
//           'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
//         ],
//         content: `<div class="product-description text-base leading-relaxed text-gray-700">
//   <h2 class="text-2xl font-bold text-gray-900 mb-4">Mũ thời trang leo núi LATATA - Explore</h2>

//   <p class="mb-4">
//     <strong>LATATA</strong> là thương hiệu uy tín chuyên cung cấp các sản phẩm chất lượng cao trong lĩnh vực <em>du lịch dã ngoại (camping)</em>, <em>đồ lưu niệm cá tính</em>, và <em>phụ kiện xe máy</em>. Với triết lý "Sống chất – Đi xa – Khám phá nhiều hơn", LATATA cam kết mang đến những trải nghiệm thực tế và bền vững cho cộng đồng yêu thích khám phá và sáng tạo phong cách sống cá nhân.
//   </p>

//   <p class="mb-4">
//     Một trong những sản phẩm nổi bật của LATATA chính là <strong>bình giữ nhiệt LATATA Steel 750ml</strong> – sự lựa chọn lý tưởng cho những ai yêu thích sự gọn nhẹ, đa năng và tinh tế trong từng chi tiết. Được nghiên cứu và thiết kế phù hợp với khí hậu và lối sống năng động của người Việt, sản phẩm này không chỉ là một bình nước – mà còn là một phần trong hành trình sống xanh và chủ động.
//   </p>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Đặc điểm nổi bật của sản phẩm:</h3>
//   <ul class="list-disc list-inside space-y-2 mb-4">
//     <li><strong>Chất liệu Inox 304 cao cấp:</strong> Không chứa BPA, đảm bảo an toàn cho sức khỏe ngay cả khi sử dụng trong thời gian dài.</li>
//     <li><strong>Khả năng giữ nhiệt vượt trội:</strong> Giữ nóng lên đến <span class="text-red-500 font-semibold">12 giờ</span>, giữ lạnh đến <span class="text-blue-500 font-semibold">24 giờ</span> – phù hợp cho cả mùa hè lẫn mùa đông.</li>
//     <li><strong>Thiết kế kín tuyệt đối:</strong> Nắp đậy xoắn chắc chắn, chống rò rỉ nước kể cả khi lật úp hoặc để trong balo.</li>
//     <li><strong>Dễ vệ sinh:</strong> Miệng bình rộng, tiện lợi cho việc làm sạch và thêm đá viên hoặc lát trái cây.</li>
//     <li><strong>Dung tích 750ml:</strong> Đủ dùng cho cả ngày dài mà vẫn gọn nhẹ khi mang theo bên người.</li>
//   </ul>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Phong cách thiết kế:</h3>
//   <p class="mb-4">
//     LATATA Steel sở hữu thiết kế tối giản mang hơi hướng hiện đại. Lớp sơn tĩnh điện nhám mịn chống trầy giúp bình luôn bền đẹp dù sử dụng thường xuyên. Logo được khắc laser tinh tế ở phần đế và nắp tạo điểm nhấn đặc trưng cho thương hiệu.
//   </p>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Ứng dụng linh hoạt:</h3>
//   <p class="mb-4">
//     Sản phẩm phù hợp sử dụng trong nhiều hoàn cảnh: từ học sinh, sinh viên đến nhân viên văn phòng, người chơi thể thao, các tín đồ du lịch bụi hay người lái xe đường dài. Dù bạn đang khám phá núi rừng, cắm trại ở vùng biển, hay chỉ đơn giản là cần một chiếc bình giữ nhiệt chất lượng trong ngày làm việc – LATATA Steel đều là lựa chọn hoàn hảo.
//   </p>

//   <div class="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-4">
//     <p class="text-gray-800 font-medium">🎁 <strong>Bảo hành 2 năm</strong> – Cam kết chống rò rỉ, gỉ sét và lỗi kỹ thuật từ nhà sản xuất.</p>
//     <p class="text-gray-600 text-sm mt-2">Hỗ trợ đổi trả trong 7 ngày nếu sản phẩm có lỗi. Dịch vụ chăm sóc khách hàng 24/7 từ LATATA.</p>
//   </div>

//   <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">Vì sao nên chọn sản phẩm từ LATATA?</h3>
//   <ul class="list-disc list-inside space-y-1 mb-4">
//     <li>Sản phẩm được thiết kế dành riêng cho nhu cầu thực tế của người Việt.</li>
//     <li>Chất lượng cao, giá thành hợp lý và hậu mãi minh bạch.</li>
//     <li>Mẫu mã đa dạng, cập nhật liên tục theo xu hướng mới nhất.</li>
//     <li>Thương hiệu được cộng đồng du lịch và phượt thủ tin dùng.</li>
//   </ul>

//   <p class="italic text-sm text-gray-500">
//     *Lưu ý: Không sử dụng bình để chứa chất lỏng có gas, axit mạnh hoặc các dung dịch dễ ăn mòn.
//   </p>
// </div>
// `,
//         stock: 100,
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
