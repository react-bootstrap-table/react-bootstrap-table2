/* eslint no-mixed-operators: 0 */
/* eslint no-param-reassign: 0 */

/**
 * products generator for stories
 * 
 * @param {Number} quantity - quantity of products
 * @param {Function} callback - callback func which is similiar to 'mapFunction'
 * aims to customize product format
 * 
 * @return {Array} - products array
 */
export const productsGenerator = (quantity = 5, callback) => {
  if (callback) return Array.from({ length: quantity }, callback);

  // if no given callback, retrun default product format.
  return (
    Array.from({ length: quantity }, (value, index) => ({
      id: index,
      name: `Item name ${index}`,
      price: 2100 + index
    }))
  );
};

export const withOnSale = rows => rows.map((row) => {
  if (row.id > 2) row.onSale = false;
  else row.onSale = true;
  return row;
});

export const withRandomPrice = rows => rows.map((row) => {
  row.price = Math.floor((Math.random() * 10) + 2000);
  return row;
});

export const productsQualityGenerator = (quantity = 5, factor = 0) =>
  Array.from({ length: quantity }, (value, index) => ({
    id: index + factor,
    name: `Item name ${index + factor}`,
    quality: index % 3
  }));

const jobType = ['A', 'B', 'C', 'D', 'E'];

const jobOwner = ['Allen', 'Bob', 'Cindy'];

export const jobsGenerator = (quantity = 5) =>
  Array.from({ length: quantity }, (value, index) => ({
    id: index,
    name: `Job name ${index}`,
    owner: jobOwner[Math.floor((Math.random() * 2) + 1)],
    type: jobType[Math.floor((Math.random() * 4) + 1)]
  }));

export const jobsGenerator1 = (quantity = 5) =>
  Array.from({ length: quantity }, (value, index) => ({
    id: index,
    name: `Job name ${index}`,
    owner: Math.floor((Math.random() * 2) + 1),
    type: Math.floor((Math.random() * 4) + 1)
  }));

export const todosGenerator = (quantity = 5) =>
  Array.from({ length: quantity }, (value, index) => ({
    id: index,
    todo: `Todo item ${index}`,
    done: Math.random() > 0.4 ? 'Y' : 'N'
  }));

const startDate = new Date(2017, 0, 1);
const endDate = new Date();

export const stockGenerator = (quantity = 5) =>
  Array.from({ length: quantity }, (value, index) => ({
    id: index,
    name: `Stock Name ${index}`,
    price: Math.floor((Math.random() * 2) + 1),
    visible: Math.random() > 0.5,
    quality: index % 3,
    inStockDate:
      new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
  }));

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const productsExpandRowsGenerator = (quantity = 5, callback) => {
  if (callback) return Array.from({ length: quantity }, callback);

  // if no given callback, retrun default product format.
  return (
    Array.from({ length: quantity }, (value, index) => ({
      id: index,
      name: `Item name ${index}`,
      price: 2100 + index,
      expand: productsQualityGenerator(index)
    }))
  );
};
