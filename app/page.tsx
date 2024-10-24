"use client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Define the Product type
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Use the Product type for products
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]); // Explicitly type cartItems as Product[]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json(); // Explicitly type the fetched data
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]); // Add product to cartItems
    setCartCount(cartCount + 1); // Increment cart count
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1>My Homepage</h1>
        <div className="relative">
          <button className="text-lg font-semibold flex">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute top-0 right-5 bg-red-500 text-white text-sm rounded-full px-2">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(products) &&
          products.map((product) => (
            <div key={product.id} className="border border-black p-4 text-center">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={500}
                className="h-48 rounded"
              />
              <h2 className="font-bold">{product.title}</h2>
              <h2>${product.price?.toFixed(2)}</h2>
              <div className="text-end">
                <button
                  onClick={() => handleAddToCart(product)} // Pass product details
                  className="border border-black bg-orange-500 w-14 h-10 rounded-lg text-white hover:bg-orange-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-4">
          <h2>Cart Items</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.title} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <div>Total: ${calculateTotal()}</div>
        </div>
      )}
    </div>
  );
}
