import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Input } from './FormFormik.styled';

const initialValues = {
    login: '',
    password: '',
};

const schema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().min(6).max(10).required(),
});

const FormFormik = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    }
    return (
        <Formik 
            initialValues={initialValues} 
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            <Form autoComplete="off">
                <label htmlFor="login">
                    Login
                    <Input type="text" name="login" />
                    <ErrorMessage name="login" component="div" />
                </label>
                <label htmlFor="password">
                    Password
                    <Input type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default FormFormik;