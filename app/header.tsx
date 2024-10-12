import { useState } from "react";

export default function Header() {


  
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  }
return(
<div>
<header className="flex justify-between items-center p-4 bg-gray-100">
        <h1>My Homepage</h1>
        <div className="relative">
          <span className="text-lg font-semibold">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full px-2">
              {cartCount}
            </span>
          )}
        </div>
      </header>
</div>
);
};