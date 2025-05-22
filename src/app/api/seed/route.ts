import { connectToDatabase } from '@/lib/db/mongodb';
import { NextResponse } from 'next/server';
import { getTourModel } from '../tours/route'; // Import từ file tours route

export async function GET() {
  try {
    await connectToDatabase();
    const Tour = getTourModel();

    // await Tour.updateMany(
    //   {}, // tất cả documents
    //   {
    //     $set: {
    //       itinerary: 'Lịch trình sẽ được cập nhật sớm.',
    //       whatToBring: [
    //         'Giấy tờ tùy thân',
    //         'Đồ dùng cá nhân',
    //         'Đồ ăn nhẹ',
    //         'Nước uống',
    //         'Kem chống nắng',
    //         'Mũ nón',
    //         'Kính mát',
    //       ],
    //       guides: [
    //         {
    //           name: 'Nguyễn Văn A',
    //           avatar:
    //             'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
    //           bio: 'Hướng dẫn viên du lịch với 5 năm kinh nghiệm, yêu thích khám phá và chia sẻ văn hóa địa phương.',
    //         },
    //         {
    //           name: 'Trần Thị B',
    //           avatar:
    //             'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
    //           bio: 'Hướng dẫn viên du lịch với 3 năm kinh nghiệm, chuyên về các tour khám phá thiên nhiên.',
    //         },
    //         {
    //           name: 'Nguyễn Thị C',
    //           avatar:
    //             'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
    //           bio: 'Hướng dẫn viên du lịch với 4 năm kinh nghiệm, đam mê khám phá văn hóa và ẩm thực địa phương.',
    //         },
    //       ],
    //       gallery: [
    //         'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
    //         'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
    //         'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
    //         'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
    //         'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
    //       ],
    //     },
    //   }
    // );

    // Thêm dữ liệu mẫu
    const sampleTours = [
      {
        title: 'Tour từ thiện tại Cao Bằng',
        slug: 'tour-tu-thien-tai-cao-bang',
        description:
          'Tour từ thiện tại Cao Bằng là một hành trình đầy ý nghĩa, nơi bạn có thể khám phá vẻ đẹp thiên nhiên hùng vĩ của vùng núi phía Bắc Việt Nam và đồng thời tham gia vào các hoạt động từ thiện giúp đỡ cộng đồng địa phương.',
        price: 2160000,
        originalPrice: 2400000,
        discountPercentage: 10,
        thumbnail:
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
        isHot: false,
        itinerary: 'Lịch trình sẽ được cập nhật sớm.',
        whatToBring: [
          'Giấy tờ tùy thân',
          'Đồ dùng cá nhân',
          'Đồ ăn nhẹ',
          'Nước uống',
          'Kem chống nắng',
          'Mũ nón',
          'Kính mát',
        ],
        guides: [
          {
            name: 'Nguyễn Văn A',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
            bio: 'Hướng dẫn viên du lịch với 5 năm kinh nghiệm, yêu thích khám phá và chia sẻ văn hóa địa phương.',
          },
          {
            name: 'Trần Thị B',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
            bio: 'Hướng dẫn viên du lịch với 3 năm kinh nghiệm, chuyên về các tour khám phá thiên nhiên.',
          },
          {
            name: 'Nguyễn Thị C',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
            bio: 'Hướng dẫn viên du lịch với 4 năm kinh nghiệm, đam mê khám phá văn hóa và ẩm thực địa phương.',
          },
        ],
        gallery: [
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
        ],
      },
      {
        title: 'Tour khám phá Vịnh Vĩnh Hy',
        slug: 'tour-kham-pha-vinh-vinh-hy',
        description:
          'Tour khám phá Vịnh Vĩnh Hy là một hành trình tuyệt vời để bạn trải nghiệm vẻ đẹp hoang sơ của biển cả và thiên nhiên. Bạn sẽ được tham gia vào các hoạt động như lặn biển, câu cá, và thưởng thức hải sản tươi ngon.',
        price: 900000,
        originalPrice: 900000,
        discountPercentage: 0,
        thumbnail:
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
        isHot: true,
        itinerary: 'Lịch trình sẽ được cập nhật sớm.',
        whatToBring: [
          'Giấy tờ tùy thân',
          'Đồ dùng cá nhân',
          'Đồ ăn nhẹ',
          'Nước uống',
          'Kem chống nắng',
          'Mũ nón',
          'Kính mát',
        ],
        guides: [
          {
            name: 'Nguyễn Văn A',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
            bio: 'Hướng dẫn viên du lịch với 5 năm kinh nghiệm, yêu thích khám phá và chia sẻ văn hóa địa phương.',
          },
          {
            name: 'Trần Thị B',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
            bio: 'Hướng dẫn viên du lịch với 3 năm kinh nghiệm, chuyên về các tour khám phá thiên nhiên.',
          },
          {
            name: 'Nguyễn Thị C',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
            bio: 'Hướng dẫn viên du lịch với 4 năm kinh nghiệm, đam mê khám phá văn hóa và ẩm thực địa phương.',
          },
        ],
        gallery: [
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
        ],
      },
      {
        title: 'Lặn cùng rùa biênh tại Nha Trang',
        slug: 'lan-cung-rua-bienh-tai-nha-trang',
        description:
          'Tour lặn cùng rùa biển tại Nha Trang là một trải nghiệm độc đáo, nơi bạn có thể khám phá thế giới dưới nước và gặp gỡ những chú rùa biển đáng yêu. Bạn sẽ được trang bị đầy đủ thiết bị lặn và hướng dẫn viên chuyên nghiệp.',
        price: 10800000,
        originalPrice: 12000000,
        discountPercentage: 10,
        thumbnail:
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
        isHot: true,
        itinerary: 'Lịch trình sẽ được cập nhật sớm.',
        whatToBring: [
          'Giấy tờ tùy thân',
          'Đồ dùng cá nhân',
          'Đồ ăn nhẹ',
          'Nước uống',
          'Kem chống nắng',
          'Mũ nón',
          'Kính mát',
        ],
        guides: [
          {
            name: 'Nguyễn Văn A',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
            bio: 'Hướng dẫn viên du lịch với 5 năm kinh nghiệm, yêu thích khám phá và chia sẻ văn hóa địa phương.',
          },
          {
            name: 'Trần Thị B',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
            bio: 'Hướng dẫn viên du lịch với 3 năm kinh nghiệm, chuyên về các tour khám phá thiên nhiên.',
          },
          {
            name: 'Nguyễn Thị C',
            avatar:
              'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
            bio: 'Hướng dẫn viên du lịch với 4 năm kinh nghiệm, đam mê khám phá văn hóa và ẩm thực địa phương.',
          },
        ],
        gallery: [
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/preserving-planet_1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/global/our-purpose/images/family-in-forest-1600x900.jpg',
          'https://pk.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/images/deserted-beach-travel-800x450.jpg',
        ],
      },
    ];

    await Tour.insertMany(sampleTours);

    return NextResponse.json({
      success: true,
      message: 'Dữ liệu mẫu đã được thêm thành công',
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi thêm dữ liệu mẫu' },
      { status: 500 }
    );
  }
}
