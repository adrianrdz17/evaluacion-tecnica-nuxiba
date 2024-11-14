import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/userSlice";

function Sidebar() {
  const usersList = useSelector((state) => state.users.usersList);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    dispatch(selectUser(user));
    navigate(`/user/${user.id}`);
  };

  if (status === "failed") {
    return <p>Hubo un error al cargar los usuarios.</p>;
  }

  return (
    <div className='sidebar'>
      <h2>Usuarios</h2>
      {status === "loading" ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            margin: "12px auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : null}

      {usersList.map((user) => (
        <div
          key={user.id}
          className='user-item'
          onClick={() => handleUserClick(user)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
