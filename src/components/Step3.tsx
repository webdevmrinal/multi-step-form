import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";


type Props = {
  onStepChange: (step: number) => void;
};


type InitialValues = {
  single_file: File | null;
};

const initialValues: InitialValues = {
  single_file: null,
};

const validationSchema = Yup.object().shape({
  single_file: Yup.mixed<File>()
    .test("fileType", "Invalid File Type", (value) => {
      if (!value) return false;
      const type = value.type;
      return type === "image/png" || type === "application/pdf";
    })
    .test("fileSize", "File too large", (value) => {
      if (!value) return false;
      return value.size <= 1048576;
    })
    .required("A file is required"),
});

function Step3({ onStepChange }: Props) {
  const uploadButton = useRef<HTMLInputElement | null>(null);
  const onSubmit = (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => {
    console.log(values);
    onStepChange(4);
    formikHelpers.setSubmitting(false);
  };
  return (
    <div className="h-3/5 w-1/2 max-w-[350px] min-w-[250px] min-h-[350px] bg-white rounded-md shadow-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, validateForm }) => (
          <Form className="p-2 h-4/5">
            <div className="uppercase text-center text-lg font-medium tracking-widest text-purple-500">
              File Upload
            </div>
            <div className="h-full">
              <input
                hidden
                ref={uploadButton}
                type="file"
                accept=".png, .pdf"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("single_file", event.currentTarget.files?.[0] || null);
                }}
              />
              <div className="p-2 h-1/2 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-5">
                {values.single_file && (
                  <div className="w-full overflow-hidden">
                    {values.single_file.name}
                  </div>
                )}
                <button
                  className="w-1/2 mx-auto py-2 bg-purple-500 text-white text-xs uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
                  type="button"
                  onClick={() => {
                    uploadButton.current?.click();
                    validateForm();
                  }}
                >
                  Upload
                </button>
              </div>
              <ErrorMessage
                name="single_file"
                render={(msg: string) => (
                  <div className="text-red-500 text-xs text-end px-2">
                    {msg}
                  </div>
                )}
              />
              <div className="text-center text-xs text-purple-500">(valid type PNG and PDF)</div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white text-sm uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
            >
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Step3;
