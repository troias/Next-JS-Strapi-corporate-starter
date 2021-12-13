import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@mui/styles";
import Loader from "../elements/loader";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    backgroundColor: "#fafafa",
    width: "100%",
  },
});

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const FeaturedSignUpPage = ({ data }) => {
  //implementing the register function I created in authContext
  const { registerUser, error, user, loginUser } = useContext(AuthContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      alert(JSON.stringify(email, null, 2));
      try {
        setLoading(true);
        const req = await registerUser(email, password);
        const login = await loginUser(email, password);

        setLoading(false);
        router.push("/");
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    },
  });

  return (
    <div className={classes.container}>
      <h1
        className=" font-bold
                text-2xl
                text-center
                text-gray-800
                mb-4"
      >
        {data.title}
      </h1>
      {!loading && !user ? (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            {data.title}
          </Button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FeaturedSignUpPage;
