import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";

import apiClient from "../api/apiClient";
import { useLoaderData, useLocation } from "react-router-dom";

export default function Home() {
  const products = useLoaderData();
  // const location = useLocation();
  // const username = location.state;
  // const path = location.pathname;
  // console.log(username);
  // console.log(path);
  return (
    <div className="home-container bg-normalbg dark:bg-black min-h-screen">
      <PageHeading title="Explore Crazy Stickers">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers.Perfect for any occasion!
      </PageHeading>
      <ProductListings products={products.content} />
    </div>
  );
}

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products?page=0&size=10");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
      
        error.message ||
        "Failed to fetch the products  .Pleasse try again",
      {
        status: error.status || 500,
      }
    );
  }
}
