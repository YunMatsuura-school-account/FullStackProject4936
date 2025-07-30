import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_URL;
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: inputEmail, password: inputPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successfull", data);
        console.log(data.user)
        navigate("/home", { state: { user: data.user}});

      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <ul>
        <li>
          <label htmlFor="emailInput">Email</label>
          <input
            id="emailInput"
            type="email"
            required
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="passwordInput">Password</label>
          <input
            id="passwordInput"
            type="password"
            required
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
          />
        </li>
      </ul>

      <button type="submit">Login</button>

      <p>Don't have an account?</p>
      <Link to="/signup">Sign up</Link>
    </form>
  );
}

export default LoginForm;
