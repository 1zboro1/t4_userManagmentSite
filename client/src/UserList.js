import { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Image, Container, Row, Col } from "react-bootstrap";
import deleteIcon from "./icons/delete.svg";
import unblockIcon from "./icons/unblock.svg";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const deleteUser = () => {
    Axios.post("http://localhost:1337/api/deleteUser", {
      checkedUsers: checkedUsers,
    }).then((response) => {
      alert("Users deleted");
    });
  };

  const blockUser = () => {
    Axios.post("http://localhost:1337/api/blockUser", {
      checkedUsers: checkedUsers,
    }).then((response) => {
      alert("Users blocked");
    });
  };
  const unblockUser = () => {
    Axios.post("http://localhost:1337/api/unblockUser", {
      checkedUsers: checkedUsers,
    }).then((response) => {
      alert("Users unblocked");
    });
  };

  return (
    <div className="usersDisplay">
      <Container>
        <Row className="mb-3">
          <Col md={{ span: 5, offset: 4 }}>
            <div>
              <Button
                variant="danger"
                size="lg"
                className="me-5"
                onClick={blockUser}
              >
                Ban
              </Button>
              <Button className="me-5" size="sm" onClick={unblockUser}>
                <Image src={unblockIcon} />
              </Button>
              <Button size="sm" onClick={deleteUser}>
                <Image src={deleteIcon} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>User name</th>
            <th>e-mail</th>
            <th>Last login date</th>
            <th>User create date</th>
            <th>User banned</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((user) => {
            return (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedUsers((checkedUsers) => [
                          ...checkedUsers,
                          user._id,
                        ]);
                      } else {
                        setCheckedUsers((users) =>
                          users.filter((_, index) => index !== 0)
                        );
                      }
                    }}
                  />
                </td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin ? user.lastLogin : "didn't login yet"}</td>
                <td>{user.created}</td>
                <td>{user.banned ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
export default UserList;
