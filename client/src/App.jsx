import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [user, setUser] = useState(null);

  const authToken = useSelector(state => state.application.authToken)

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }
  
  // async function getProfile() {
  //   const {user} = await api.get("/users/me");
  //   setUser(user);
  // }

  useEffect(() => {
    getUser();
  }, [authToken])

  // useEffect(() => {
  //   getProfile();
  // }, [user])

  return (
    <div>
      <nav className="my-nav"><h2>Coined! Arcade</h2>{
        authToken ? (
          <>
            <Link to="/sign_up">Create Account </Link>
            <Link to="/login">Sign In</Link>
          </>
        ) : (
          <>
            <image href="https://i.pinimg.com/originals/8b/16/0f/8b160fb127ad866c4fc6dc570b58d2c0.png">Profile Picture</image>
            <Link to="/profile">{user.firstName}</Link>
          </>
        )
      }</nav>
      <Outlet />
    </div>
  );
}

export default App
