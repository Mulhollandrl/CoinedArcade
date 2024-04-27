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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const authToken = useSelector(state => state.application.authToken)

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  function logout() {
    dispatch(setAuthToken(null));
  }

  
  async function getProfile() {
    const {profile} = await api.get("/users/me/profile");
    setProfile(profile);
    setLoading(false)
  }

  useEffect(() => {
    if (authToken !== null) {
      getUser();
    }
  }, [authToken])

  useEffect(() => {
    if (user == null) {
      getUser();
    }

    getProfile();
  }, [user])

  return (
    <div>
      {!loading && 
        <div>
          <nav className="my-nav">
            <h2>Coined! Arcade</h2>
            <Link id="arcadeLink" to="/arcade">Go To Arcade</Link>
            {
              authToken === null ? (
                <div id="notLoggedIn" className="appInfoSection">
                  <Link to="/sign_up">Create Account</Link>
                  <Link to="/login">Sign In</Link>
                </div>
              ) : (
                <div className="appInfoSection" id="profileMini">
                  {/* https://i.pinimg.com/736x/01/c6/fe/01c6feefce5fe8dde74acfab66c030a0.jpg */}
                  {/* https://i.pinimg.com/originals/8b/16/0f/8b160fb127ad866c4fc6dc570b58d2c0.png */}
                  <img src={profile.profileImageURL || "https://i.pinimg.com/736x/01/c6/fe/01c6feefce5fe8dde74acfab66c030a0.jpg"} alt="Profile Picture"></img>
                  <Link to="/profile">{user && user.firstName}</Link>
                  <a className="logout" onClick={logout}><h4>LOGOUT</h4></a>
                </div>
              )
            }
          </nav>
          <Outlet />
        </div>
      }
    </div>
  );
}

export default App
