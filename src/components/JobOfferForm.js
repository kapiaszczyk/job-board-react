import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { authHeader } from "../utils/auth";


/**
 * JobForm component.
 * 
 * @returns {JSX.Element}
 * 
 */
const JobOfferForm = ({ match }) => {

    // Check if the form is for editing a job offer
    const isEdit = !!match.params.id;
    const API_URL = 'http://localhost:8080/api/v1/job-offers';

    const [technologies, setTechnologies] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [addresses, setAddresses] = useState([]);

    /*
    * Fetch metadata for the form
    */
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [techResponse, companyResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/v1/technologies', { headers: authHeader() }),
                    axios.get('http://localhost:8080/api/v1/companies', { headers: authHeader() }),
                ]);
                setTechnologies(techResponse.data);
                setCompanies(companyResponse.data);
            } catch (error) {
                console.error('Error fetching metadata', error);
            }
        };

        fetchMetadata();
    }, []);

    /*
    * Fetch addresses for the selected company
    */
    const fetchAddresses = async (companyId) => {
        try {
            const response = await axios.get(`http://yourapi.com/companies/${companyId}/addresses`, { headers: authHeader() });
            setAddresses(response.data);
        } catch (error) {
            console.error('Error fetching addresses', error);
        }
    };

    const VALID_SALARY_TYPES = ["HOURLY", "MONTHLY", "ANNUAL", "OTHER"];
    const VALID_OPERATING_MODES = ["REMOTE", "HYBRID", "ONSITE"];
    const VALID_CONTRACT_TYPES = ["FULL_TIME", "PART_TIME", "TEMPORARY", "CONTRACT", "OTHER", "INTERNSHIP", "B2B"];
    const VALID_CURRENCIES = ["EUR", "BGN", "CZK", "DKK", "HUF", "PLN", "RON", "SEK", "CHF", "TRY", "USD", "AUD", "CAD", "GBP"];
    const VALID_EXPERIENCES = ["INTERN", "JUNIOR", "REGULAR", "MID", "SENIOR", "EXPERT", "ARCHITECT", "OTHER"];
    const VALID_DEGREES = ["NONE", "BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

    const isExpirationDateValid = (date) => {
        const currentDate = new Date();

        const expirationDate = new Date(date);

        const differenceInTime = expirationDate.getTime() - currentDate.getTime();

        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays >= 7;
    };


    const initialValues = {
        name: "",
        shortDescription: "",
        description: "",
        contractType: "full-time",
        salary: 0,
        salaryCurrency: "",
        salaryType: "hourly",
        experience: "intern",
        operatingMode: "remote",
        expiresAt: "",
        companyId: 0,
        addressId: 0,
        technologies: { 1: 'NONE', 2: 'NONE', 3: 'NONE' },
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        shortDescription: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        contractType: Yup.string().oneOf(VALID_CONTRACT_TYPES).required("Required"),
        salary: Yup.number().isInteger().min(0).required("Required"),
        salaryCurrency: Yup.string().oneOf(VALID_CURRENCIES).required("Required"),
        salaryType: Yup.string().oneOf(VALID_SALARY_TYPES).required("Required"),
        experience: Yup.string().oneOf(VALID_EXPERIENCES).required("Required"),
        operatingMode: Yup.string().oneOf(VALID_OPERATING_MODES).required("Required"),
        expiresAt: Yup.date().test("is-valid-date", "Expiration date must be at least 7 days from now", isExpirationDateValid).required("Required"),
        companyId: Yup.number().required("Required"),
        addressId: Yup.number().required("Required"),
        technologies: Yup.object().shape(
            Object.fromEntries(
                Array.from({ length: 10 }, (_, index) => [
                    `${index + 1}`,
                    Yup.string().oneOf(VALID_DEGREES).required("Required")
                ])
            )
        ).required("Required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(API_URL, values, { headers: authHeader() });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating job offer", error);
        }
        setSubmitting(false);
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div>
                <label>Name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label>Short Description</label>
                <Field type="text" name="shortDescription" />
                <ErrorMessage name="shortDescription" component="div" />
              </div>
              <div>
                <label>Description</label>
                <Field type="text" name="description" />
                <ErrorMessage name="description" component="div" />
              </div>
              <div>
                <label>Contract Type</label>
                <Field as="select" name="contractType">
                  <option value="">Select contract type</option>
                  {VALID_CONTRACT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Field>
                <ErrorMessage name="contractType" component="div" />
              </div>
              <div>
                <label>Salary</label>
                <Field type="number" name="salary" />
                <ErrorMessage name="salary" component="div" />
              </div>
              <div>
                <label>Salary Currency</label>
                <Field as="select" name="salaryCurrency">
                  <option value="">Select currency</option>
                  {VALID_CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </Field>
                <ErrorMessage name="salaryCurrency" component="div" />
              </div>
              <div>
                <label>Salary Type</label>
                <Field as="select" name="salaryType">
                  <option value="">Select salary type</option>
                  {VALID_SALARY_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Field>
                <ErrorMessage name="salaryType" component="div" />
              </div>
              <div>
                <label>Experience</label>
                <Field as="select" name="experience">
                  <option value="">Select experience level</option>
                  {VALID_EXPERIENCES.map((experience) => (
                    <option key={experience} value={experience}>{experience}</option>
                  ))}
                </Field>
                <ErrorMessage name="experience" component="div" />
              </div>
              <div>
                <label>Operating Mode</label>
                <Field as="select" name="operatingMode">
                  <option value="">Select operating mode</option>
                  {VALID_OPERATING_MODES.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </Field>
                <ErrorMessage name="operatingMode" component="div" />
              </div>
              <div>
                <label>Expiration Date</label>
                <Field type="date" name="expiresAt" />
                <ErrorMessage name="expiresAt" component="div" />
              </div>
              <div>
                <label>Company</label>
                <Field as="select" name="companyId" onChange={(e) => {
                  const companyId = e.target.value;
                  setFieldValue('companyId', companyId);
                  fetchAddresses(companyId);
                }}>
                  <option value="">Select company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="companyId" component="div" />
              </div>
              <div>
                <label>Address</label>
                <Field as="select" name="addressId">
                  <option value="">Select address</option>
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id}>{address.address}</option>
                  ))}
                </Field>
                <ErrorMessage name="addressId" component="div" />
              </div>
              <div>
                <label>Technologies</label>
                {technologies.map((tech) => (
                  <div key={tech.id}>
                    <label>{tech.name}</label>
                    <Field as="select" name={`technologies.${tech.id}`}>
                      <option value="">Select knowledge degree</option>
                      {VALID_DEGREES.map((degree) => (
                        <option key={degree} value={degree}>{degree}</option>
                      ))}
                    </Field>
                    <ErrorMessage name={`technologies.${tech.id}`} component="div" />
                  </div>
                ))}
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isEdit ? 'Update' : 'Create'} Job
              </button>
            </Form>
          )}
        </Formik>
      );
    };
    
    export default JobOfferForm;