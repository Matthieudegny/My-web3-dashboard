import React, { useState, useContext } from "react";

//import style
import "./Login.scss";

//import composant
import { useLogin } from "../../CustomHooks/useCustomeHook";

//import context
import { DashBoardContext } from "../../Context/Context";

function Login({ FormVisibility, setFormVisibility }) {
  const { setMessage, setbckColor } = useContext(DashBoardContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSuccessLogin = (data) => {
    if (data.ok === true) {
      console.log("bien connecté");
      setMessage("Vous êtes bien connecté");
      setbckColor("rgb(6, 181, 230)");
    } else {
      setMessage("Veuillez vérider votre adresse mail et mot de passe");
      setbckColor("#550f87");
    }
  };

  const { mutate: login } = useLogin(onSuccessLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objectToSent = { email, password };
    login(objectToSent);
  };

  return (
    <div style={{ height: "150px" }}>
      {!FormVisibility ? (
        <div className="container-user">Compte visiteur</div>
      ) : (
        <div className="container-login">
          <form action="" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
            <div className="container-login-containerButton">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
