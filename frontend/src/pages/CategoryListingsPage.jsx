import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import AllListings from "../components/Listing/CategoryListings"

const CategoryListingsPage = () =>{
  return(
    <>
    <Header/>
    <AllListings/>
    <Footer/>
    </>
  )
}
export default CategoryListingsPage;