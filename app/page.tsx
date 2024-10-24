"use client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [showCart, setShowCart] = useState(false); // Toggle cart view

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
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

  const toggleCart = () => {
    setShowCart(!showCart); // Toggle cart visibility
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1>My Homepage</h1>
        <div className="relative">
          <button onClick={toggleCart} className="text-lg font-semibold flex">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute top-0 right-5 bg-red-500 text-white text-sm rounded-full px-2">
                {cartCount}
              </span>
            )}
          </button>
          {showCart && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
              <h2 className="font-bold text-xl mb-2">Cart Items</h2>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index} className="border-b py-2 flex justify-between">
                      <span>{item.title}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty.</p>
              )}
              {cartItems.length > 0 && (
                <div className="font-bold text-lg mt-4">
                  Total: ${calculateTotal()}
                </div>
              )}
            </div>
          )}
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
                onError={(e) => (e.target.src = "/fallback.png")} // Fallback image if loading fails
              />
              <h2 className="font-bold">{product.title}</h2>
              <h2>${product.price?.toFixed(2)}</h2>
              <div className="text-end">
                <button
                  onClick={() => handleAddToCart(product)} // Pass product details
                  aria-label={`Add ${product.title} to cart`}
                  className="border border-black bg-orange-500 w-14 h-10 rounded-lg text-white hover:bg-orange-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
