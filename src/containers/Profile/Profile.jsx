import { useJwt } from "react-jwt";
import "./Profile.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { userout } from "../../slices/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("jwt");

  let { decodedToken } = useJwt(localStorageToken);

  if (decodedToken === null) {
    decodedToken = { name: "" };
  };

  const logout = () => {
    dispatch(userout({ credentials: {} }));
    localStorage.removeItem("jwt");
    return navigate("/");
  };

  return (
    <form className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">
            Esta es tu area {decodedToken.name}!
          </h1>
          <Button
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"
            }
            text={"Ver alquileres vigentes"}
            onClick={() => navigate("/profileloans")}
          />
          <Button
            text={"Modifica tus datos"}
            onClick={() => navigate("/profilemodify")}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"
            }
          />
          <Button
            text={"Elimina tu cuenta"}
            onClick={() => navigate("/profiledestroy")}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"
            }
          />
          <Button
            onClick={() => logout()}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"
            }
            text={"Deslogeate"}
          />
        </div>
      </div>
    </form>
  );
}

export default Profile;
