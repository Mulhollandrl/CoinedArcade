import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./store/application_slice"
import "./App.css"

function App() {
  const api = useApi();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const authToken = useSelector(state => state.application.authToken)

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  function logout() {
    dispatch(setAuthToken(null));
  }

  
  // async function getProfile() {
  //   const {user} = await api.get("/users/me");
  //   setUser(user);
  // }

  useEffect(() => {
    if (authToken !== null) {
      getUser();
    }
  }, [authToken])

  // useEffect(() => {
  //   getProfile();
  // }, [user])

  return (
    <div>
      <nav className="my-nav"><h2>Coined! Arcade</h2>{
        authToken === null ? (
          <div id="notLoggedIn" className="appInfoSection">
            <Link to="/sign_up">Create Account </Link>
            <Link to="/login">Sign In</Link>
          </div>
        ) : (
          <div className="appInfoSection" id="profileMini">
            <img src="https://i.pinimg.com/originals/8b/16/0f/8b160fb127ad866c4fc6dc570b58d2c0.png" alt="Profile Picture"></img>
            <Link to="/profile">{user && user.firstName}</Link>
            <a className="logout" onClick={logout}><h4>LOGOUT</h4></a>
          </div>
        )
      }</nav>
      <Outlet />
    </div>
  );
}

export default App
