import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface MyFormValues {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: MyFormValues = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid e-mail address").required("*required"),
  newPassword: Yup.string().required("*required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("*required"),
});

const ForgotPassword = () => {
  const onSubmit = (
    _values: MyFormValues,
    { setSubmitting }: FormikHelpers<MyFormValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-[#f8f8ff]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="p-4 flex flex-col items-center gap-5 shadow-xl bg-white rounded-md">
          <div className="uppercase text-lg font-medium tracking-widest text-purple-500">
            Forgot Password?
          </div>
          <div>
            <Field
              className="block p-2 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="email"
              name="email"
              placeholder="Enter your e-mail"
            />
            <ErrorMessage
              name="email"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div>
            <Field
              className="block p-2 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
            />
            <ErrorMessage
              name="newPassword"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div>
            <Field
              className="block p-2 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
            />
            <ErrorMessage
              name="confirmPassword"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <button
            className="w-full py-2 bg-purple-500 text-white text-sm uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
            type="submit"
          >
            Reset Password
          </button>
          <Link to="/" className="text-xs text-purple-500 cursor-pointer">
            Login!
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
