import {Box, Button, Checkbox, FormControlLabel, InputBase, Link, Typography,} from "@mui/material";
import {useContext, useState} from "react";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { login } = authContext;
  const navigate = useNavigate();

  const submitHandle = async (e: any) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await login({email, password});
    navigate('/home');
  };

  return (
    <Box
      sx={{
        backgroundSize: "contain",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Navbar />

      <Box
        p={4}
        sx={{
          width: "100%",
          background: "rgba(0,0,0,0.3)",
          maxWidth: "380px",
        }}
      >
        <Typography variant="h2" mb={3} fontSize="1.25rem">
          Login
        </Typography>
        <Box component="form" sx={{ color: "#fff" }} onSubmit={submitHandle}>
          <InputBase
            required
            placeholder="Email address"
            type="email"
            fullWidth
            sx={{
              mb: 2,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBase
            required
            placeholder="Password"
            type="password"
            fullWidth
            sx={{
              mb: 1,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ color: "#fff" }}
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Login
          </Button>
          <Box>
            <Typography fontWeight={300} mt={2}>
              <Link href="#" underline="hover" sx={{ color: "#fff" }}>
                Forgot Password
              </Link>
            </Typography>
            <Typography fontWeight={300} mt={2}>
             <Link href="/signup" underline="hover" sx={{ color: "#fff" }}>
               Don't have an account ? Sign up
             </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
