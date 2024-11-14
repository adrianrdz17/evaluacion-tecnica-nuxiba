import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { fetchUsers } from "./redux/userSlice";
import Sidebar from "./components/Sidebar";
import UserDetails from "./components/UserDetails";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Router>
      <div className='app-container'>
        <Sidebar />
        <Routes>
          <Route path='/user/:userId' element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
