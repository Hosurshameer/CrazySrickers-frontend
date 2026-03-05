import React from 'react'
import { useLocation } from 'react-router-dom';
import PageTltle from './PageTltle';
import { Link } from 'react-router-dom';

export default function UserOrdersAfterClick() {

      const location=useLocation();
       const item=location.state;
  return (
    <>
    <PageTltle title="Your sticker will look like this "/>
    <div className="w-64 mx-auto mt-20 bg-blue-200">

       
        
         <img src={item.imageUrl}
         
         alt={item.name}
         className=" h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"

         />

       
    </div>
       <div className="w-64 mx-auto mt-10 bg-blue-200">
           <Link
              to="/orders"
              className=" mx-auto   py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
            >
              Back Orders
            </Link>
            </div>
            </>
  );
}
