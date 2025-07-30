import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const user = location.state?.user;
  console.log(user)

  const getAllData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/home/all-users`
      );
      const data = await response.json();
      setUsers(data);
      setShowUsers(true);
    } catch (e) {
      console.error("Falied to fetch users");
    }
  };

  let userList = null;
  if (showUsers) {
    userList = (
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    );
  }

  let welcomeMessage = null;
  if(user) {
    welcomeMessage = <p>Hi {user.firstName} {user.lastName} !</p>
  } else {
    welcomeMessage = <p>Hello!</p>
  }

  return (
    <div>
      <h2>This is Home page.</h2>
      {welcomeMessage}
      <button onClick={getAllData}>Check all users!</button>
      {userList}
    </div>
  );
}

export default Home;
