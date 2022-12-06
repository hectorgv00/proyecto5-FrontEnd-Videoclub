import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useJwt } from "react-jwt";
import CyberButton from "../../components/CyberButton/CyberButton";

function Home(props) {
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = "";
  }

  let welcomeGuest = (
    <p className="fs-3 welcome">
      Enjoy the best content just for being a member of Direct. Register or
      login, the best content awaits you.
    </p>
  );

  let welcomeMember = (
    <p className="fs-3 welcome">
      Welcome {decodedToken.name}, what do you want to see today?
    </p>
  );

  return (
    <div>
      <div className="container-fluid bg-black vh-100 d-flex flex-column align-items-center justify-content-around bgImage">
        <div className="row mt-5 mt-lg-0">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <h1 className="text-light mb-5">
              Your favourites <span className="purple">series</span> and
              <span className="pink"> movies</span>
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col col-lg-8  text-light d-flex align-items-center justify-content-center flex-column ">
              {decodedToken ? welcomeMember : welcomeGuest}
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-6 d-flex justify-content-around">
                    <CyberButton
                      text={"Series"}
                      onClick={() => navigate("/series")}
                      className={
                        "CyberButtonColor d-flex align-items-center justify-content-center"
                      }
                    />
                    <CyberButton
                      text={"Movies"}
                      onClick={() => navigate("/movies")}
                      className={
                        "d-flex align-items-center justify-content-center"
                      }
                    />
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
