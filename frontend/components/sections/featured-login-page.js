import React, {useContext} from 'react';
import { fetchAPI } from "../../utils/api"
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@mui/styles';
import AuthContext from '../../context/authContext'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        backgroundColor: '#fafafa',
        width: '100%',
    },
  });

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const FeaturedLoginPage = ({ data }) => {
    console.log("data", data)
    const classes = useStyles()
    const {loginUser, error, success, user, test } = useContext(AuthContext)

    console.log("user", user)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async ({email, password}) => {
         
            try {
                const req = await loginUser(email, password)
                console.log("req", req)
            } catch (error) {
                console.log('error', error);
            }
        },
        })
       
    return (
        <div className={classes.container}>
             <h1 className="
              font-bold
                text-2xl
                text-center
                text-gray-800
                mb-4
                
             " >{data.title}</h1> 
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
                <Button color="primary" variant="contained" fullWidth  type="submit"  > 
                     {data.title} 
                </Button>
            </form>
        </div>
    );
};




export default FeaturedLoginPage