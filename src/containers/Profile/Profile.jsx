import { useJwt } from "react-jwt";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { userout } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import CyberButton from "../../components/CyberButton/CyberButton";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }

  const logout = () => {
    dispatch(userout({ credentials: {} }));
    localStorage.removeItem("jwt");
    return navigate("/");
  };
  if (localStorage.getItem("jwt") === null) {
    navigate("/");
  }

  if (decodedToken.rolIdRol === 2) {
    return (
      <div className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0 bgImage">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">
              {decodedToken.name.toUpperCase()}'S AREA
            </h1>
            <CyberButton
              className={"d-flex align-items-center "}
              text={"Current rentals"}
              onClick={() => navigate("/profileloans")}
            />
            <CyberButton
              text={"Modify profile"}
              onClick={() => navigate("/profilemodify")}
              className={"CyberButtonColor d-flex align-items-center "}
            />
            <CyberButton
              text={"Delete account"}
              onClick={() => navigate("/profiledestroy")}
              className={"d-flex align-items-center CyberButtonColorRed1"}
            />
            <CyberButton
              onClick={() => logout()}
              className={"d-flex align-items-center CyberButtonColorRed2 GlitchButtonReflex"}
              text={"Log out"}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0 bgImage">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">
              {decodedToken.name.toUpperCase()}'S AREA
            </h1>
            <CyberButton
              className={"d-flex align-items-center "}
              text={"Current rentals"}
              onClick={() => navigate("/profileloans")}
            />
            <CyberButton
              text={"Modify profile"}
              onClick={() => navigate("/profilemodify")}
              className={"CyberButtonColor d-flex align-items-center "}
            />
            <CyberButton
              onClick={() => logout()}
              className={"d-flex align-items-center CyberButtonColorRed2 GlitchButtonReflex"}
              text={"Log out"}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
