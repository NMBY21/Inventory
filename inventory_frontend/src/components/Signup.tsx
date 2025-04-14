import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  InputBase,
  Typography,
} from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    id: null,
    username: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const response = await axios.post(process.env.REACT_APP_BASE_URL + "/auth/register", user);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, user);
      console.log("User registered successfully:", response.data);
      setUser({
        id: null,
        username: "",
        fullName: "",
        phone: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error registering user:", error.response?.data?.message);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundSize: "contain",
        height: "calc(100vh - 64px)",
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
          Sign Up New User
        </Typography>
        <Box component="form" sx={{ color: "#fff" }} onSubmit={submitHandle}>
          <InputBase
            required
            placeholder="Username"
            fullWidth
            sx={{
              mb: 2,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
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
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <InputBase
            required
            placeholder="Full Name"
            fullWidth
            sx={{
              mb: 2,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
          <InputBase
            required
            placeholder="Phone Number"
            type="phone"
            fullWidth
            sx={{
              mb: 2,
              padding: "5px 10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <FormControlLabel
              style={{display: 'flex', justifyContent: 'center', padding: "5px 10px"}}
            control={<Button style={{textAlign: 'center', width: 'fit-content'}} variant="contained" fullWidth type="submit">Sign Up</Button>} label={undefined}          />
          {/*<Box>*/}
          {/*  <Typography fontWeight={300} mt={2}>*/}
          {/*    <Link href="/login" underline="hover" sx={{ color: "#fff" }}>*/}
          {/*      Already have an account? Login*/}
          {/*    </Link>*/}
          {/*  </Typography>*/}
          {/*</Box>*/}
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
