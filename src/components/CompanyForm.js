import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { authHeader } from "../utils/auth";



const CompanyForm = ({ company, setCompany }) => {
  const initialValues = {
    name: company.name,
    address: company.address,
    city: company.city,
    state: company.state,
    zip: company.zip,
    phone: company.phone,
    email: company.email,
    contact: company.contact,
    notes: company.notes,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact: Yup.string().required("Required"),
    notes: Yup.string().required("Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .put(
        `http://localhost:3001/companies/${company.id}`,
        {
          company: values,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return null;
};

export default CompanyForm;