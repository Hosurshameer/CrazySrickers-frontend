import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import Dropdown from "./DropDown";
import SearchBox from "./SearchBox";
import { useState } from "react";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];
export default function ProductListings({ products,searchText,onSearch}) {
 
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }
    
    return products.slice().sort((a, b) => {
      switch (selectedSort) {
        case "Price Low to High":
          return parseFloat(a.price) - parseFloat(b.price);

        case "Price High to Low":
          return parseFloat(b.price) - parseFloat(a.price);

        case "Popularity":
        default:
          return parseInt(b.popularity - a.popularity);
      }
    });
  }, [selectedSort, products]);

  

  function handleSortChange(sortType) {
    setSelectedSort(sortType);
  }

  return (
    <div className="max-w-[1152px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label="Search"
          placeholder="Search products.."
          value={searchText}
          handleSearch={onSearch}
        />
        <Dropdown
          label="Sort by"
          options={sortList}
          value={selectedSort}
          handleSort={(val) => handleSortChange(val)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedProducts && filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary dark:text-primary">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
