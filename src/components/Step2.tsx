import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

type Props = {};

const initialValues = {
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
};

const validationSchema = Yup.object().shape({
  address_1: Yup.string().required("Required"),
  address_2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

function Step2({onStepChange}: Props) {
  const onSubmit = (values, { setSubmitting }) => {
    onStepChange((step) => step + 1);
    setSubmitting(false);
  };
  return (
    <div className="h-3/5 w-1/2 max-w-[350px] min-w-[250px] min-h-[380px] bg-white rounded-md shadow-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="p-2">
          <div className=" mb-2 uppercase text-center text-lg font-medium tracking-widest text-purple-500">
            Address
          </div>
          <div className="h-12">
            <Field
              className="block w-full p-1 text-sm text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="text"
              name="address_1"
              placeholder="Address line one"
            />
            <ErrorMessage
              name="address_1"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div className="h-12">
            <Field
              className="block w-full p-1 text-sm text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="text"
              name="address_2"
              placeholder="Address line two"
            />
            <ErrorMessage
              name="address_2"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div className="h-12">
            <Field
              className="block w-full p-1 text-sm text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="text"
              name="city"
              placeholder="City"
            />
            <ErrorMessage
              name="city"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div className="h-12">
            <Field
              className="block w-full p-1 text-sm text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="text"
              name="state"
              placeholder="State"
            />
            <ErrorMessage
              name="state"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div className="h-12">
            <Field
              className="block w-full p-1 text-sm text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="number"
              name="pincode"
              placeholder="Pincode"
            />
            <ErrorMessage
              name="pincode"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <div className="h-12">
            <Field
              className="block w-full p-1 text-sm text-purple-600 bg-purple-100 rounded-md outline-none placeholder:text-purple-300"
              type="text"
              name="country"
              placeholder="Country"
            />
            <ErrorMessage
              name="country"
              render={(msg: string) => (
                <div className="text-red-500 text-xs text-end px-2">{msg}</div>
              )}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white text-sm uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
          >
            Next
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Step2;
