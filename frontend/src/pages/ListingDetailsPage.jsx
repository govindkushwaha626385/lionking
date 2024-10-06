import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ListingDetails from "../components/Listing/ListingDetails";
import SuggestedListings from "../components/Listing/SuggestedListings";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";
// import whatsapp from "../Assests/images/whatsapp.png";

const ListingDetailsPage = () => {
  const { id } = useParams();

  // console.log("Id ", id)

  const [data, setData] = useState({}); 
  const [type, setType] = useState("");   
  const [reviews, setReviews] = useState([]);

  const fetchData = async (id) => {
    try {
      const responce = await axios.get(`${server}/listing/${id}`);
      if (responce.data.success) {
        setData(responce.data.data.listing);
        setType(responce.data.data.listing.type); 
        console.log("Type in Listing Details ", type);   
      }
    } catch (error) {
      console.log(error);
    }
  };
   
  const fetchReviews = async (id) => { 
    try {
      const responce = await axios.get(
        `${server}/review/listing-reviews/${id}`
      );
      if (responce.data.success) {
        // console.log("reviews : " + responce.data.data.reviews);
        setReviews(responce.data.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(id);
    fetchReviews(id);
  }, []);

  return (
    <> 
      <Header />
      <ListingDetails data={data} reviews={reviews} />
      {<>{type !== "" && <SuggestedListings type={type} />}</>} 
      <Footer />
    </>
  );
};
export default ListingDetailsPage;
