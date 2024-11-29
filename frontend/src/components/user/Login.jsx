/* eslint-disable react/no-unescaped-entities */
import { CameraAlt } from "@mui/icons-material";
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

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add form handling logic here
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
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          boxShadow: "0px 4px 5px rgba(0,0,0,0.1)",
          width: "70%",
          maxWidth: 420,
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
              onSubmit={handleFormSubmit}
            >
              <Typography sx={{ fontSize: "0.9rem", marginBottom: 1 }}>
                Login with your username and password
              </Typography>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
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
                Login
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

            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleFormSubmit}
            >
              <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{
                  marginBottom: 3,
                  position: "relative", // Added to position the camera icon
                }}
              >
                <Avatar
                  sx={{
                    width: 160, // Increased the size
                    height: 160,
                    objectFit: "cover",
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
                    bottom: 0,
                    right: 0,
                    transform: "translate(50%, 50%)", // Adjusts positioning to fully overlap bottom-right
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle background for better visibility
                    borderRadius: "50%",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Slight shadow for a raised effect
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

              <TextField
                required
                fullWidth
                label="Full Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Username"
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
                Sign Up
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
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
