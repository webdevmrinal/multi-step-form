type Props = {};
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const intialValues = {
  username: "",
  email: "",
  phone: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("*required"),
  email: Yup.string().email("Invalid email").required("*required"),
  phone: Yup.string()
    .test(
      "phone",
      "Invalid phone number",
      (value) => !value || isValidPhoneNumber(value)
    )
    .required("*required"),
});

function FormikPhoneNumberInput({ field, form, ...props }) {
  const { name } = field;
  const { setFieldValue, touched, errors, setFieldTouched } = form;
  console.log(form);
  return (
    <div>
      <PhoneInput
        international
        defaultCountry="IN"
        value={field.value}
        onChange={(value) => {
          setFieldValue(field.name, value);
          setFieldTouched(name, true, false);
        }}
        onBlur={() => setFieldTouched(name, true, false)}
        {...props}
      />
      {touched[name] && errors[name] && (
        <div className="text-red-500 text-xs text-end px-2">{errors[name]}</div>
      )}
    </div>
  );
}

function Step1({ onStepChange }: Props) {
  const onSubmit = (values, { setSubmitting }) => {
    onStepChange((step) => step + 1);
    setSubmitting(false);
  };
  return (
    <div className="h-3/5 w-1/2 max-w-[350px] min-w-[250px] min-h-[350px] bg-white rounded-md shadow-xl">
      <Formik
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="p-2">
          <div className="uppercase text-center text-lg font-medium tracking-widest text-purple-500">
            Basic Details
          </div>
          <div className="mt-4 flex flex-col gap-9">
            <div className="h-12">
              <Field
                className="block w-full p-1 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
                type="text"
                name="username"
                placeholder="User Name"
              />
              <ErrorMessage
                name="username"
                render={(msg: string) => (
                  <div className="text-red-500 text-xs text-end px-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="h-12">
              <Field
                className="block w-full p-1 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                render={(msg: string) => (
                  <div className="text-red-500 text-xs text-end px-2">
                    {msg}
                  </div>
                )}
              />
            </div>
            <div className="h-12">
              <Field
                className="block p-1 text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
                component={FormikPhoneNumberInput}
                name="phone"
              />
            </div>
            <button
              type="submit"
              className="py-2 bg-purple-500 text-white text-sm uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
            >
              Next
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Step1;
