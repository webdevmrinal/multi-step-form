import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRef, useState, useEffect, ChangeEvent } from "react";

type Props = {
  onStepChange: (step: number) => void;
};

interface InitialValues {
  files: Array<{ type: string; size: number; name: string }>;
}

const initialValues: InitialValues = {
  files: [],
};

const validationSchema = Yup.object().shape({
  files: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string()
          .oneOf(["image/png", "application/pdf"], "Invalid file type")
          .required("A file is required"),
        size: Yup.number()
          .max(1048576, "File too large")
          .required("A file is required"),
      })
    )
    .max(5, "Too many files")
    .required("A file is required"),
});

const Step4: React.FC<Props> = ({ onStepChange }: Props) => {
  const uploadButton = useRef<HTMLInputElement>(null);
  const [geoLocationStatus, setGeoLocationStatus] = useState<string>(
    "Acquiring coordinates..."
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocationStatus(
            `Location captured: ${position.coords.latitude}, ${position.coords.longitude}`
          );
        },
        (error) => {
          setGeoLocationStatus(`Error: ${error.message}`);
        }
      );
    } else {
      setGeoLocationStatus("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = (
    values: InitialValues,
    { setSubmitting }: FormikHelpers<InitialValues>
  ) => {
    console.log(values);
    onStepChange(5);
    setSubmitting(false);
  };

  return (
    <div className="h-3/5 w-1/2 max-w-[350px] min-w-[250px] min-h-[350px] bg-white rounded-md shadow-xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, validateForm }) => (
          <Form className="p-2 h-2/3">
            <div className="uppercase text-center text-lg font-medium tracking-widest text-purple-500">
              Multi File Upload
            </div>
            <div className="h-full">
              <input
                hidden
                ref={uploadButton}
                type="file"
                accept=".png, .pdf"
                multiple
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const { files } = event.currentTarget;
                  if (files) {
                    setFieldValue(
                      "files",
                      Array.from(files).map((file) => ({
                        type: file.type,
                        size: file.size,
                        name: file.name,
                      }))
                    );
                    validateForm();
                  }
                }}
              />
              <div className="p-2 h-1/2 border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-5">
                {values.files && (
                  <div className="w-full overflow-x-hidden overflow-y-scroll">
                    {values.files.map((file, index) => (
                      <p key={index}>{file.name}</p>
                    ))}
                  </div>
                )}
                <button
                  className="w-1/2 mx-auto py-2 bg-purple-500 text-white text-xs uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
                  type="button"
                  onClick={() => {
                    if (uploadButton.current) {
                      uploadButton.current.click();
                      validateForm();
                    }
                  }}
                >
                  Upload
                </button>
              </div>
              <ErrorMessage
                name="files"
                render={(msg: string) => (
                  <div className="text-red-500 text-xs text-end px-2">
                    {Array.isArray(msg) ? "Too many files" : msg}
                  </div>
                )}
              />
              <div className="text-center text-xs text-purple-500">
                valid type PNG and PDF (upto 5 files)
              </div>
            </div>
            <div className="text-center text-xs mt-2">{geoLocationStatus}</div>
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-purple-500 text-white text-sm uppercase rounded-md tracking-[0.3em] hover:bg-purple-600"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step4;
