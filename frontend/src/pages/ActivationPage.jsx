import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const responce = await axios.post(`${server}/student/activation`, {
            activation_token,
          });
          if(responce.data.success){
            navigate("/login");
          }else{
            setError(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
