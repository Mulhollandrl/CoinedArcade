import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api";
import { useNavigate } from "react-router-dom";
import "./styles/homePage.css"

export const HomePage = () => {
    const [user, setUser] = useState(null);
    const api = useApi();
    const navigate = useNavigate();
  
    async function getUser() {
      const {user} = await api.get("/users/me");
      setUser(user);
      
      if (user) {
        navigate(to="/arcade")
      }
    }
  
    useEffect(() => {
      getUser();
    }, [])
  
    return (
      <div>
        <h3>This is the...</h3>
        <h1>Coined! Arcade</h1>

        <p>
            This is the application where I put all of my games from when I took Game Development (and more!).
        </p>
        {!user && <p>
            It looks like you are currently signed out! Sign in or sign up now to go to the arcade!
        </p>}
      </div>
    )
  }