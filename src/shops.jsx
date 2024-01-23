//shops.jsx
export const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "BIM" },
];

export const getShopName = (shopId, shops) => {
  const foundShop = shops.find((shop) => shop.id === shopId);
  return foundShop ? foundShop.name : "Unknown Shop";
};
