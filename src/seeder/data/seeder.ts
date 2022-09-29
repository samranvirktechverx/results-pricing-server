import { BadRequestException } from '@nestjs/common';
//import { Category } from '@root/user/entities/category.entity';

async function categoriesInsertMany(categoriesArray) {
  try {
    //await Category.insertMany(categoriesArray);
    return {
      message: 'SuccessFully Seeded Categories',
      badge: true,
    };
  } catch (error) {
    throw new BadRequestException('Error While Seeding Categories');
  }
}

// /* eslint-disable-next-line */
// const createCategoriesFakerData = async () => {
//   const categoriesArray = [];
//   await categoriesInsertMany(categoriesArray);
// };

// module.exports = {
//   createCategoriesFakerData,
// };
