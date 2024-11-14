import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, fetchUserPosts, fetchUserTodos } from "../redux/userSlice";
const UserDetails = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const posts = useSelector((state) => state.users.posts);
  const todos = useSelector((state) => state.users.todos);
  const [view, setView] = useState("info");
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!selectedUser)
    return (
      <div
        className='user-details'
        style={{ display: "flex", flexDirection: "column" }}
      >
        Seleccione un usuario
      </div>
    );

  const handleShowPosts = () => {
    setView("posts");
    dispatch(fetchUserPosts(selectedUser.id));
  };

  const handleShowTodos = () => {
    setView("todos");
    dispatch(fetchUserTodos(selectedUser.id));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addNewTodo({ userId: selectedUser.id, ...newTodo }));
    setNewTodo({ title: "", completed: false }); // Resetea el formulario
  };

  return (
    <div
      className='user-details'
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{selectedUser.name}</h5>
          <h6 class='card-subtitle mb-2 text-body-secondary'>
            {selectedUser.username}
          </h6>
          <p className='card-text'>
            <strong>Username:</strong> {selectedUser.username}
          </p>
          <p className='card-text'>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p className='card-text'>
            <strong>Teléfono:</strong> {selectedUser.phone}
          </p>
          <p className='card-text'>
            <strong>Compañía:</strong> {selectedUser.company.name}
          </p>
        </div>
      </div>

      <div className='mt-3'>
        <button
          style={{ width: "90px" }}
          className='btn btn-outline-primary mx-2'
          onClick={handleShowPosts}
        >
          Posts
        </button>
        <button
          style={{ width: "90px" }}
          className='btn btn-outline-warning '
          onClick={handleShowTodos}
        >
          Todos
        </button>
      </div>
      <hr
        style={{
          width: "95%",
          display: "flex",
          margin: "1.5em auto",
          height: "3px",
          backgroundColor: "lightgray",
        }}
      />

      {view === "posts" && (
        <div className='m-2' style={{ flex: 1, overflowY: "auto" }}>
          <h3>Posts</h3>
          {posts.map((post) => (
            <div
              key={post.id}
              className='post'
              style={{ width: "95%", margin: "12px auto" }}
            >
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <div className='comments'>
                <h5>Comentarios:</h5>
                {post.comments.map((comment) => (
                  <div key={comment.id} className='comment'>
                    <p>
                      <strong>{comment.name}</strong>: {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "todos" && (
        <div className='m-2' style={{ flex: 1, overflowY: "auto" }}>
          <h3>Todos</h3>
          {/* Aqui va el form */}
          <form
            onSubmit={handleAddTodo}
            className='add-todo-form'
            style={{
              display: "flex",
              flexDirection: "row",
              width: "80%",
            }}
          >
            <div class='m-2' style={{ flex: 2, borderRadius: "14px" }}>
              <label for='txt-user-todo' class='form-label'>
                Task title
              </label>
              <input
                id='txt-user-todo'
                className='form-control'
                type='text'
                name='title'
                value={newTodo.title}
                onChange={handleInputChange}
                placeholder='Nueva tarea'
                required
              />
            </div>
            <div
              class='form-check'
              style={{ margin: "auto", flex: 1, display: "flex" }}
            >
              <input
                type='checkbox'
                name='completed'
                className='form-check-input'
                checked={newTodo.completed}
                onChange={handleInputChange}
              />
              <label
                className='form-check-label'
                style={{ marginLeft: "8px" }}
                for='flexCheckDefault'
              >
                Marcar como completada
              </label>
            </div>
            <button
              className='btn btn-outline-info'
              style={{ flex: 1, height: "48px", margin: "auto 12px" }}
              type='submit'
            >
              Guardar
            </button>
          </form>
          <ul style={{ padding: "0 1em" }}>
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
