import { useState } from "react";
import { useApi } from "../utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/application_slice";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createUser(e) {
    e.preventDefault();
    const res = await api.post("/users", {
      email,
      password,
      firstName,
      lastName
    });
    dispatch(setAuthToken(res.token));

    navigate("/arcade");
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={createUser}>
        <div className="sign-up-form">
            <input
            placeholder="First name"
            type="text"
            value={firstName}
            required
            onChange={e => setFirstName(e.target.value)}
            />
            <input
            placeholder="Last name"
            type="text"
            value={lastName}
            required
            onChange={e => setLastName(e.target.value)}
            />
        </div>
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

        <button>Create Account</button>
      </form>
    </div>
  )
}