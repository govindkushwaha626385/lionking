import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
// import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import Footer from "../components/Layout/Footer";
import { useNavigate } from "react-router-dom";

const StudentProfilePage = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  if (!id) {
    navigate("/login");
  }
  const [active, setActive] = useState(1);

  return (
    <>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
      <Footer />
    </>
  );
};

export default StudentProfilePage;
