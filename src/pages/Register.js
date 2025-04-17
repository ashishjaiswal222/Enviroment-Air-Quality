import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister} fullWidth>
        Register
      </Button>
    </Container>
  );
};
<TextField
  label="Email"
  fullWidth
  margin="normal"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  inputProps={{ "data-parsley-required": true, "data-parsley-type": "email" }}
/>

export default Register;