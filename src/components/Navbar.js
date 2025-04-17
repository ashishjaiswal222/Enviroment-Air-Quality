import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useAuth from "../hooks/useAuth";
import { Button, Container } from "@mui/material";
import Logo from "./Logo";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow py-4">
      <Container className="flex justify-between items-center">
        <Logo />
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.email}</span>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")} variant="contained" className="ml-2">
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;