import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import signup_img from "../../assets/images/signup_img.jpg";
import { fetchUserData } from "../../redux/Slices/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

// APIs
const SIGNUP_API = `${
  import.meta.env.VITE_BACKEND_DOMAIN_NAME
}/api/authentication/createUser`;

// Validation Schema
const validationSchema = Yup.object({
  username: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  city: Yup.string().required("City is required"),
  password: Yup.string()
    .min(3, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    axios
      .post(SIGNUP_API, values, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success(res.data.message || "Registered successfully!");
          dispatch(fetchUserData({ id: res.data.user._id }));
          setSubmitting(false);
          setLoading(false);
          setTimeout(() => {
            navigate("/emailverification");
          }, 1000);
        } else {
          setLoading(false);
          toast.error("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error Message:", error.message);
        toast.error("Registration failed. Please try again.");
        setSubmitting(false);
      });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 0,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              maxWidth: "900px",
              maxHeight: "90vh",
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "block" },
                backgroundImage: `url(${signup_img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px 0 0 8px",
              }}
            />

            {/* Form Section */}
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: { xs: 4, md: 6 },
              }}
            >
              <Box
                sx={{
                  marginBottom: 4,
                  display: "flex",
                  justifyContent: "center", // Center the logo horizontally
                }}
              >
                <img src={logo} alt="Logo Img" style={{ height: "50px" }} />
              </Box>

              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  city: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="username"
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          error={touched.username && Boolean(errors.username)}
                          helperText={touched.username && errors.username}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor:
                                touched.username && errors.username
                                  ? "#fdd"
                                  : "white",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="email"
                          type="email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor:
                                touched.email && errors.email
                                  ? "#fdd"
                                  : "white",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="city"
                          label="City"
                          variant="outlined"
                          fullWidth
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor:
                                touched.city && errors.city ? "#fdd" : "white",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          name="password"
                          type="password"
                          label="Password"
                          variant="outlined"
                          fullWidth
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor:
                                touched.password && errors.password
                                  ? "#fdd"
                                  : "white",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#0B355B",
                        color: "white",
                        paddingX: "40px",
                        marginTop: 4,
                        "&:hover": { backgroundColor: "#54728c" },
                        width: "100%",
                        fontWeight: 600,
                      }}
                      disabled={isSubmitting}
                    >
                      {loading && (
                        <CircularProgress size={24} color="inherit" />
                      )}
                      {!loading && "Sign Up"}
                    </Button>
                  </Form>
                )}
              </Formik>

              <Typography
                variant="body2"
                sx={{
                  marginTop: 3,
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#0a66c2",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  <u>Login</u>
                </Link>
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Box>
  );
}
