import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { userData, login } from "../../slices/userSlice";


function Home(props) {
  const navigate = useNavigate();



  // Provisional añadir token

    const dispach = useDispatch()

    // const userReduzCredentials = useSelector(userData);

    const fakeLogin = () =>{
      let credentials ={
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1MywibmFtZSI6IkFsYmVydG8iLCJlbWFpbCI6ImFsYmVydG9AbW9yZW5vLmNvbSIsInJvbElkUm9sIjoyLCJpYXQiOjE2NjkxMTAyNzR9.GjB6Vp3iSvTHi-synY_kUYpYJfADHUwL5T7DSv3tunw"
      } 
      
      dispach(login({credentials:credentials}));
      
      localStorage.setItem("jwt",credentials.token)

      navigate("/")
    }


  return (
    <div>
      <div className="container-fluid bg-black vh-100 d-flex flex-column align-items-center justify-content-around">
        <div className="row mt-5 mt-lg-0">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <h1 className="text-light mb-5">
              Tus <span className="purple">series</span> y{" "}
              <span className="pink">películas</span> favoritas
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col col-lg-8  text-light d-flex align-items-center justify-content-center flex-column ">
              <p className="fs-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt id obcaecati quaerat sit voluptates nihil cupiditate.
                Ab quibusdam ipsum suscipit deleniti aliquid nulla doloribus.
                Aperiam voluptatibus repellat rem officia architecto!
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-6 d-flex justify-content-center">
                    <Button
                      text={"Series"}
                      onClick={()=> navigate("/series")}
                      className={
                        "fs-3 text-light buttonDesign d-flex align-items-center bgPurple justify-content-center ms-3"
                      }
                    />
                    <Button
                      text={"Películas"}
                      onClick={()=> navigate("/peliculas")}
                      className={
                        "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
                      }
                    />




                      {/* Button provisional añadir token */}

                    <Button text={"Añadir token provisional"}
                    onClick={()=>fakeLogin()}
                    />
                  
                  {/* ________________________________________________ */}
                  
                  
                  
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
