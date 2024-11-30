/* eslint-disable react/no-unescaped-entities */
import { CameraAlt } from "@mui/icons-material";
import axios from "axios";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:10000/api/user/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        toast.success("User logged in successfully");
        setLoginData({ email: "", password: "" });
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:10000/api/user/register",
        registerData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 201) {
        setLoading(false);
        toast.success("User registered successfully");
        setRegisterData({ name: "", email: "", password: "" });
        setIsLogin(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container
      component={"main"}
      maxWidth={"sm"}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Toaster />
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          transition: "width 0.3s ease-in-out", // Smooth animation
          width: isLogin ? "400px" : "740px", // Dynamic width based on state
          maxWidth: "100%",
        }}
      >
        {isLogin ? (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
                marginBottom: 3,
              }}
            >
              Login
            </Typography>

            <form
              style={{ width: "100%", marginTop: 2 }}
              onSubmit={handleLoginUser}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  marginBottom: 1,
                }}
              >
                Login with your Email and Password
              </Typography>
              <TextField
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />

              <Button
                type="submit"
                sx={{
                  marginTop: 2,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
                fullWidth
                variant="contained"
                color="primary"
              >
                {loading ? (
                  <ThreeDots
                    visible={true}
                    height="50"
                    width="50"
                    color="white"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  "Login"
                )}
              </Button>

              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: 2,
                  fontSize: "0.9rem",
                  color: "text.secondary",
                }}
              >
                Don't have an account?{" "}
                <Button
                  onClick={toggleLogin}
                  color="secondary"
                  sx={{
                    textTransform: "none",
                    fontWeight: "semibold",
                    padding: 0,
                  }}
                >
                  Sign Up
                </Button>
              </Typography>
            </form>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 3,
                textAlign: "center",
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {/* Avatar Section */}
              <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                position={"relative"}
                sx={{ flex: 1 }}
              >
                <Avatar
                  sx={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    marginBottom: 2,
                  }}
                  src={
                    avatar ||
                    "https://via.placeholder.com/150?text=Upload+Avatar"
                  }
                  alt="Profile Avatar"
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 6,
                    right: 6,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    padding: "6px",
                  }}
                >
                  <CameraAlt fontSize="medium" color="primary" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </IconButton>
              </Stack>

              {/* Form Section */}
              <form
                style={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onSubmit={handleRegisterUser}
              >
                <TextField
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  required
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  required
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  sx={{
                    marginTop: 2,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                  variant="contained"
                  color="primary"
                >
                  {loading ? (
                    <ThreeDots
                      visible={true}
                      height="50"
                      width="50"
                      color="white"
                      radius="9"
                      ariaLabel="three-dots-loading"
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <Typography
                  sx={{
                    textAlign: "center",
                    marginTop: 2,
                    fontSize: "0.9rem",
                    color: "text.secondary",
                  }}
                >
                  Already have an account?
                  <Button
                    onClick={toggleLogin}
                    color="secondary"
                    sx={{
                      textTransform: "none",
                      fontWeight: "semibold",
                      padding: 0,
                      marginLeft: -1,
                    }}
                  >
                    Login
                  </Button>
                </Typography>
              </form>
            </Stack>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
