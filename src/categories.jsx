export const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Deli" },
  { id: 3, name: "Toys" },
  { id: 4, name: "Groceries" },
  { id: 5, name: "Bakery" },
];
export const getCategoryName = (categoryId) => {
  const foundCategory = categories.find(
    (category) => category.id === categoryId
  );
  return foundCategory ? foundCategory.name : "Unknown Shop";
};
