import React from "react";
import ButtonLogin from "../../components/ButtonLogin/ButtonLogin";
import ButtonRegister from "../../components/ButtonRegister/ButtonRegister";
import "./Home.css"

function Home(props) {
  return (
    <div>
      <div className="container-fluid bg-black vh-100 d-flex flex-column align-items-center justify-content-around">
        <div className="row mt-5 mt-lg-0">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <h1 className="text-light mb-5">
              Tus <span className="purple">series</span> y <span className="pink">películas</span> favoritas
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col col-lg-8  text-light d-flex align-items-center justify-content-center flex-column ">
                <p className="fs-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt id obcaecati quaerat sit voluptates nihil cupiditate. Ab quibusdam ipsum suscipit deleniti aliquid nulla doloribus. Aperiam voluptatibus repellat rem officia architecto!
                </p>

            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
            <ButtonLogin/>
                <ButtonRegister/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
