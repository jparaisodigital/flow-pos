import type { Product, Category } from "../types";

export const products: Product[] = [
  // MILK TEA
  {
    id: 1,
    name: "Wintermelon",
    category: "Milk Tea",
    image: "/products/1%20(1).webp",
    sizes: [
      { id: "s", name: "Small", price: 100 },
      { id: "m", name: "Medium", price: 120 },
      { id: "l", name: "Large", price: 140 },
    ],
  },
  {
    id: 2,
    name: "Okinawa",
    category: "Milk Tea",
    image: "/products/1%20(2).webp",
    sizes: [
      { id: "s", name: "Small", price: 105 },
      { id: "m", name: "Medium", price: 125 },
      { id: "l", name: "Large", price: 145 },
    ],
  },
  {
    id: 3,
    name: "Taro",
    category: "Milk Tea",
    image: "/products/1%20(3).webp",
    sizes: [
      { id: "s", name: "Small", price: 110 },
      { id: "m", name: "Medium", price: 130 },
      { id: "l", name: "Large", price: 150 },
    ],
  },
  {
    id: 4,
    name: "Matcha",
    category: "Milk Tea",
    image: "/products/1%20(4).webp",
    sizes: [
      { id: "s", name: "Small", price: 120 },
      { id: "m", name: "Medium", price: 140 },
      { id: "l", name: "Large", price: 160 },
    ],
  },
  {
    id: 5,
    name: "Hokkaido",
    category: "Milk Tea",
    image: "/products/1%20(5).webp",
    sizes: [
      { id: "s", name: "Small", price: 115 },
      { id: "m", name: "Medium", price: 135 },
      { id: "l", name: "Large", price: 155 },
    ],
  },
  {
    id: 6,
    name: "Dark Choco",
    category: "Milk Tea",
    image: "/products/1%20(6).webp",
    sizes: [
      { id: "s", name: "Small", price: 130 },
      { id: "m", name: "Medium", price: 150 },
      { id: "l", name: "Large", price: 170 },
    ],
  },

  // FRUIT TEA
  {
    id: 7,
    name: "Lemon Tea",
    category: "Fruit Tea",
    image: "/products/2%20(1).webp",
    sizes: [
      { id: "s", name: "Small", price: 90 },
      { id: "m", name: "Medium", price: 110 },
      { id: "l", name: "Large", price: 130 },
    ],
  },
  {
    id: 8,
    name: "Mango Fruit Tea",
    category: "Fruit Tea",
    image: "/products/2%20(2).webp",
    sizes: [
      { id: "s", name: "Small", price: 110 },
      { id: "m", name: "Medium", price: 130 },
      { id: "l", name: "Large", price: 150 },
    ],
  },
  {
    id: 9,
    name: "Passion Fruit Tea",
    category: "Fruit Tea",
    image: "/products/2%20(3).webp",
    sizes: [
      { id: "s", name: "Small", price: 105 },
      { id: "m", name: "Medium", price: 125 },
      { id: "l", name: "Large", price: 145 },
    ],
  },

  // COFFEE
  {
    id: 10,
    name: "Iced Latte",
    category: "Coffee",
    image: "/products/3%20(1).webp",
    sizes: [
      { id: "s", name: "Small", price: 110 },
      { id: "m", name: "Medium", price: 130 },
      { id: "l", name: "Large", price: 150 },
    ],
  },
  {
    id: 11,
    name: "Caramel Macchiato",
    category: "Coffee",
    image: "/products/3%20(2).webp",
    sizes: [
      { id: "s", name: "Small", price: 135 },
      { id: "m", name: "Medium", price: 155 },
      { id: "l", name: "Large", price: 175 },
    ],
  },
  {
    id: 12,
    name: "Spanish Latte",
    category: "Coffee",
    image: "/products/3%20(3).webp",
    sizes: [
      { id: "s", name: "Small", price: 125 },
      { id: "m", name: "Medium", price: 145 },
      { id: "l", name: "Large", price: 165 },
    ],
  },

  // SNACKS
  {
    id: 13,
    name: "French Fries",
    category: "Snacks",
    image: "/products/4%20(1).webp",
    sizes: [
      { id: "r", name: "Regular", price: 80 },
    ],
  },
  {
    id: 14,
    name: "Chicken Nuggets",
    category: "Snacks",
    image: "/products/4%20(2).webp",
    sizes: [
      { id: "s6", name: "6 pcs", price: 120 },
      { id: "s12", name: "12 pcs", price: 200 },
    ],
  },
  {
    id: 15,
    name: "Cheese Sticks",
    category: "Snacks",
    image: "/products/4%20(3).webp",
    sizes: [
      { id: "s4", name: "4 pcs", price: 90 },
      { id: "s8", name: "8 pcs", price: 150 },
    ],
  },
];