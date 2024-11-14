import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const addNewTodo = createAsyncThunk(
  "users/addNewTodo",
  async ({ userId, title, completed }) => {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        completed,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const fetchUserPosts = createAsyncThunk(
  "users/fetchUserPosts",
  async (userId) => {
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const posts = await postsResponse.json();

    // Para cada post, obtener sus comentarios
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await fetch(
          // `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
          `${baseUrl}/posts/${post.id}/comments`
        );
        const comments = await commentsResponse.json();
        return { ...post, comments };
      })
    );

    return postsWithComments;
  }
);

export const fetchUserTodos = createAsyncThunk(
  "users/fetchUserTodos",
  async (userId) => {
    const response = await fetch(`${baseUrl}/users/${userId}/todos`);
    const data = await response.json();

    return data;
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(`${baseUrl}/users`);
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    selectedUser: null,
    posts: [],
    todos: [],
    stats: "idle",
    error: null,
  },

  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
      state.posts = [];
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      });
  },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
