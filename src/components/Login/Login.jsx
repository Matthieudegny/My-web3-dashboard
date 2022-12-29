import React, { useState } from "react";

import { useLogin } from "../../CustomHooks/useCustomeHook";

function Login() {
  const [email, setemail] = useState("dfgdf");
  const [password, setpassword] = useState("dfgdfg");

  // const onSuccessLogin = (data) => {
  //   console.log("succes", data);
  // };

  // const onErrorLogin = (error) => {
  //   console.log("error", error);
  // };

  // const { mutate: login } = useLogin(onSuccessLogin, onErrorLogin);

  async function fetchLogin(object) {
    console.log(object);
    const loginRequest = await fetch("/api/dashboard/login", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objectToSent = { email, password };
    console.log(JSON.stringify(objectToSent));
    fetchLogin(objectToSent);

    // login(objectToSent);
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <h3>Login</h3>
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

      <button type="submit">Sign up</button>
    </form>
  );
}

export default Login;
