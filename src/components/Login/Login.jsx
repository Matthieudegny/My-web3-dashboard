import React, { useState, useContext, useEffect } from "react";

//import style
import "./Login.scss";

//import composant
import { useLogin } from "../../CustomHooks/useCustomeHook";

//import context
import { DashBoardContext } from "../../Context/Context";

function Login({
  FormVisibility,
  setFormVisibility,
  userPseudo,
  setuserPseudo,
}) {
  const { setMessage, setbckColor, setToken, token } =
    useContext(DashBoardContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSuccessLogin = (user) => {
    if (user) {
      console.log("bien connecté", user);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(user.token);
      user.user[1] !== null
        ? setuserPseudo(`Dashboard de ${user.user[1]}`)
        : setuserPseudo(`Dashboard de utilisateur`);
      setMessage("Vous êtes bien connecté");
      setpassword("");
      setemail("");
      setFormVisibility(false);
      setbckColor("rgb(6, 181, 230)");
    } else {
      setMessage("Veuillez vérider votre adresse mail et mot de passe");
      setbckColor("#550f87");
    }
    console.log("user", user);
  };

  const { mutate: login, data } = useLogin(onSuccessLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objectToSent = { email, password };
    login(objectToSent);
  };

  const setLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setToken("");
    setuserPseudo("Compte visiteur");
    setMessage("Vous êtes déconnecté");
    setbckColor("#550f87");
    setFormVisibility(false);
  };

  return (
    <div style={{ height: "150px" }}>
      {!FormVisibility ? (
        <div className="container-user">{userPseudo}</div>
      ) : token !== "" ? (
        <div className="container-login-containerButton">
          <button onClick={setLogout}>Logout</button>
        </div>
      ) : (
        <div className="container-login">
          <form>
            <div className="container-login-input">
              <label>Email:</label>
              <input
                type="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
            </div>
            <div className="container-login-input">
              <label>Password:</label>
              <input
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="container-login-containerButton">
              <button onClick={handleSubmit}>Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;