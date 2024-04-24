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
        <h1>REPTILE TRACKER</h1>

        <p>
            This is the application for all things tracking reptiles! 
            You can keep track of schedules, husbandry records, feedings, and more!
            (Mine is the best and I should get the most points)
        </p>
        {!user && <p>
            It looks like you are currently signed out! Sign in or sign up now!
        </p>}
      </div>
    )
  }