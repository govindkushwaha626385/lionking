import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import FeaturedRooms from "../components/Route/FeaturedListing/FeaturedRooms";
// import Sponsored from "../components/Route/Sponsored";    
import Footer from "../components/Layout/Footer";
import FeaturedCafes from "../components/Route/FeaturedListing/FeaturedCafes";
import FeaturedCafeAndBars from "../components/Route/FeaturedListing/FeaturedCafeAndBars";
import FeaturedHospitals from "../components/Route/FeaturedListing/FeaturedHospitals";
import FeaturedStores from "../components/Route/FeaturedListing/FeaturedStores";
import whatsapp from "../Assests/images/whatsapp.png";
const HomePage = () => {
  return (
    <>
      <div>
        <Header />
        <Hero />
        <Categories />
        <FeaturedRooms />
        <FeaturedCafes />
        <FeaturedCafeAndBars />
        <FeaturedHospitals />
        <FeaturedStores />
        {/* <Sponsored /> */}
        <Footer />
      </div>
      <div className="fixed bottom-3 right-3 p-3">
        <a
          href="https://wa.me/916263859670?text=Hello how can I help you?"
          target="_blank"  rel="noreferrer"
        >
          <img src={whatsapp} alt="chat" className="w-12 h-12" />
        </a>
      </div>
    </>
  );
};

export default HomePage;
