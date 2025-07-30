import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRepassword, setInputRePassword] = useState("");

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_URL;
  console.log(API_URL);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: inputFirstName,
          lastName: inputLastName,
          email: inputEmail,
          password: inputPassword,
          repassword: inputRepassword,
        }),
      });
      const data = await response.json(); 
      
      navigate("/home", { state: { user: data.user}})
    } catch (err) {
      console.error(`${err}`);
    }
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <ul>
        <li>
          <label htmlFor="firstNameInput">First name</label>
          <input
            id="firstNameInput"
            type="text"
            required
            value={inputFirstName}
            onChange={(e) => setInputFirstName(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="lastNameInput">Last name</label>
          <input
            id="lastNameInput"
            type="text"
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="emailInput">Email</label>
          <input
            id="emailInput"
            type="email"
            required
            value={inputEmail}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
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
        <li>
          <label htmlFor="reEnterPasswordInput">Re-enter Password</label>
          <input
            id="reEnterPasswordInput"
            type="password"
            required
            value={inputRepassword}
            onChange={(e) => {
              setInputRePassword(e.target.value);
            }}
          />
        </li>
      </ul>

      <button type="submit">Create Account</button>

      <Link to="/">Back to Log in</Link>
    </form>
  );
}

export default SignupForm;
