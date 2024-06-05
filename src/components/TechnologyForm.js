import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { authHeader } from "../utils/auth";


const TechnologyForm = ({ technology, setTechnology, setTechnologies }) => {

    const initialValues = {
        name: technology ? technology.name : "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            if (technology) {
                await axios.put(`/technologies/${technology._id}`, values, { headers: authHeader() });
                setTechnology(null);
            } else {
                await axios.post("/technologies", values, { headers: authHeader() });
            }
            const response = await axios.get("/technologies", { headers: authHeader() });
            setTechnologies(response.data);
        } catch (error) {
            console.error("TechnologyForm onSubmit", error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div>
                    <label>Name</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                </div>
                <button type="submit">Save</button>
            </Form>
        </Formik>
    );
};

export default TechnologyForm;