import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart-slice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
const dispatch=useDispatch();
  return (
    <div className="w-72 rounded-md mx-auto border border-primary/40 dark:border-primary/40 shadow-md overflow-hidden flex flex-col bg-white dark:bg-black hover:border-primary dark:hover:border-primary transition">
      <Link
        to={`/products/${product.productId}`}
        state={{ product }}
        className="relative w-full h-72 border-b border-primary/30 dark:border-primary/30"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </Link>
      <div className="relative h-48 p-4 flex flex-col font-primary">
        <h2 className="text-xl font-semibold text-primary dark:text-primary mb-2">
          {product.name}
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="bg-lighter dark:bg-primary/20 text-primary dark:text-primary font-medium text-sm py-2 px-4 rounded-tl-md">
            <Price currency="$" price={product.price} />
          </div>
          <button
            className="bg-primary dark:bg-primary dark:text-gray-300 text-white  font-medium text-sm py-2 px-4 rounded-md hover:cursor-pointer"
            onClick={() => dispatch(addToCart(product, 1))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
