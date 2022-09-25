import { useEffect, useState } from "react";
import Axios from "axios";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);
  return (
    <div className="usersDisplay">
      {listOfUsers.map((user) => {
        return (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>Last login: {user.lastLogin}</p>
            <p>User created: {user.created}</p>
            <p>Banned: {user.banned ? "Yes" : "No"}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
}
export default UserList;
