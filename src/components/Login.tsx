import axios from "axios";
import { Form, Field, Formik, ErrorMessage, FormikHelpers } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid e-mail address").required("*required"),
  password: Yup.string().required("*required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login",
        values
      );
      setSubmitting(false);
      if (response.data.authToken) {
        navigate("/step");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Login Failed!");
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-[#f8f8ff]">
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="p-4 flex flex-col items-center gap-5 shadow-xl bg-white rounded-md">
          <div className="uppercase text-lg font-medium tracking-widest text-purple-500">
            Login
          </div>
          <div>
            <Field
              className="block p-2 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="email"
              name="email"
              placeholder="Email"
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
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <button
            className="w-full py-2 bg-purple-500 text-white text-sm uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
            type="submit"
          >
            Login
          </button>
          <Link
            to="/forgotpassword"
            className="text-xs text-purple-500 cursor-pointer"
          >
            Forgot password?
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
