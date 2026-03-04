import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";

import apiClient from "../api/apiClient";
import { useLoaderData, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const products = useLoaderData();
  const[fetchedProducts,setFetchedProducts]=useState(products);
  const[curPage,setCurPage]=useState(products.currentPage);
  const[searchText,setSearchText]=useState("");

 const handleSearch=((val)=>{
  setSearchText(val);
  fetchPage(0,val);
 })

  const fetchPage=async(page,keyword=searchText)=>{
  try{
     const res=await apiClient.get(`/products?keyword=${keyword}&page=${page}&size=9`);
     setFetchedProducts(res.data);
     setCurPage(res.data.currentPage);
  }catch(error){
    console.log(error);
  }
  }
  // const location = useLocation();
  // const username = location.state;
  // const path = location.pathname;
  // console.log(username);
  // console.log(path);
  return (
    <>
    <div className="home-container bg-normalbg dark:bg-black min-h-screen">
      <PageHeading title="Explore Crazy Stickers">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers.Perfect for any occasion!
      </PageHeading>
      <ProductListings products={fetchedProducts.content} searchText={searchText} onSearch={handleSearch} />
    </div>
    <div className="flex justify-center gap-4 pb-12">
      <button 
      disabled={curPage===0}
      onClick={()=>fetchPage(curPage-1,searchText)}
      className="bg-primary dark:bg-light text-white dark:text-primary font-medium text-sm py-2 px-4 disabled:bg-gray-300 disabled:text-gray-600 rounded-md hover:cursor-pointer"
      >
        Prev</button>
           <span>Page {curPage + 1} of {fetchedProducts.totalPages}</span>
      <button
      disabled={curPage>=fetchedProducts.totalPages-1}
      onClick={()=>fetchPage(curPage+1,searchText)}
      className="bg-primary dark:bg-light text-white dark:text-primary font-medium text-sm py-2 px-4 disabled:bg-gray-300 disabled:text-gray-600 rounded-md hover:cursor-pointer"
      >
     Next
      </button>

    </div>
    
    </>
  );
}

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products?page=0&size=9");
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
