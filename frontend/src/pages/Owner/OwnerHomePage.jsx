import React from 'react'
import styles from '../../styles/styles'
import OwnerInfo from "../../components/Owner/OwnerInfo";
import OwnerProfileData from "../../components/Owner/OwnerProfileData";
// import { useNavigate } from 'react-router-dom';

const OwnerHomePage = () => {
  // const navigate = useNavigate();

  // const id = localStorage.getItem("owner_id");
  // if (!id) {
  //   navigate("/owner-login");
  // }
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
            <OwnerInfo isOwner={localStorage.getItem("owner_id") ? true : false} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <OwnerProfileData isOwner={localStorage.getItem("owner_id") ? true : false} />
          </div>
         </div>
    </div>
  )
}

export default OwnerHomePage