import { useState, useEffect } from "react";
import { fetchAPI } from "utils/api";
import dynamic from 'next/dynamic'
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "../elements/button";
import Loader from "../elements/loader";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const Notification = dynamic(
  () => import('../ui/notification/notification'),
  { ssr: false }
)

const EmailContactForm = ({ data }) => {
  console.log("EmailContactForm", data);
  const [loading, setLoading] = useState(false);
  const [reqStatus, setReqstatus] = useState();


  const LeadSchema = yup.object().shape({
    email: yup.string().email().required(),
    mobile: yup.string().matches(phoneRegExp, "Phone number is not valid").required(),
    name: yup.string().required(),
    message: yup.string().required(),
  });

  useEffect(() => {
    if (reqStatus === "pending" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqstatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (reqStatus === "success") {
      const timer = setTimeout(() => {
        setReqstatus(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [reqStatus]);


  let reqData = {};

  if (reqStatus === "pending") {
    reqData = {
      status: "pending",
      message: "message sent pending",
      title: "pending",
    };
  }

  if (reqStatus === "success") {
    reqData = {
      status: "success",
      message: "message sent success",
      title: "success",
    };
  }

  if (reqStatus === "error") {
    reqData = {
      status: "error",
      message: "error error",
      title: "error",
    };
  }


  return (
    <div className="py-10 text-center">
      <h1 className="text-3xl mb-10 font-bold mb-10">{data.title}</h1>

      {reqStatus && (
        <Notification
          title={reqData.title}
          status={reqData.status}
          message={reqData.message}
        />
      )}
      <div className="flex flex-col items-center">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={LeadSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setLoading(true);

            try {
              setErrors({ api: null });
              setSubmitting(true);
              setReqstatus("pending");
              await fetchAPI("/lead-form-submissions", {
                method: "POST",
                body: JSON.stringify({
                  email: values.email,
                }),
              });

              setReqstatus("success");
            } catch (err) {
              setErrors({ api: err.message });
              setReqstatus("error");
            }

            setLoading(false);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <div>
              {console.log("errors", errors)}
              {isSubmitting && <Loader />}

              <Form className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label className="mr-5" htmlFor={data.emailTitle}>
                    {data.emailTitle}
                  </label>
                  <Field
                    className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md "
                    type="email"
                    name="email"
                    placeholder={data.emailPlaceholder}
                  />
                </div>
                <div className="flex justify-between">
                  <label className="mr-5" htmlFor={data.mobileTitle}>
                    {data.mobileTitle}
                  </label>
                  <Field
                    className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                    type="mobile"
                    name="mobile"
                    placeholder={data.mobilePlaceholder}
                  />
                </div>
                <div className="flex justify-between">
                  <label className="mr-5" htmlFor={data.name}>
                    {data.nameTitle}
                  </label>
                  <Field
                    className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                    type="text"
                    name="name"
                    placeholder={data.namePlaceholder}
                  />
                </div>
                <div className="flex justify-between">
                  <label className="mr-5" htmlFor={data.messageTitle}>
                    {data.messageTitle}
                  </label>
                  <Field
                    className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                    type="text"
                    name="message"
                    placeholder={data.messagePlaceholder}
                  />
                </div>

                {data.submitButton.map((button) => (
                  <Button
                    type="submit"
                    button={{ text: button.text }}
                    disabled={isSubmitting}
                    loading={loading}
                  />
                ))}
              </Form>

              <div className=" flex-col text-red-500 h-12 text-sm mt-1 ml-2 text-left ">
                <p> {(errors.email && touched.email && errors.email) || errors.api} </p>
                <p> {(errors.mobile && touched.mobile && errors.mobile) || errors.api} </p>
                <p> {(errors.name && touched.name && errors.name) || errors.api}   </p>
                <p>  {(errors.message && touched.message && errors.message) || errors.api}  </p>
                  </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmailContactForm;
