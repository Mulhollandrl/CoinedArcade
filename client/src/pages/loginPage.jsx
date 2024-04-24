import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../utils/use_api";
import { setAuthToken } from "../store/application_slice";
import { useDispatch } from "react-redux";
import './styles/loginPage.css'

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const api = useApi();
  const dispatch = useDispatch()

  async function login(e) {
    e.preventDefault();
    const {token} = await api.post("/sessions", {
      email,
      password,
    });

    dispatch(setAuthToken(token));
    navigate("/arcade")
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="sign-up-form">
            <input
                placeholder="Email"
                type="email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <button>Sign In</button>
      </form>
    </div>
  )
}