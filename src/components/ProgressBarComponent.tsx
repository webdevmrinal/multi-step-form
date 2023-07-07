import { useState, useEffect } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-step-progress-bar/styles.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const ProgressBarComponent: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  useEffect(() => {
    if (step === 1) toast.success("Login Successful!");
  }, []);
  return (
    <div className="h-screen w-screen bg-purple-300 relative flex items-center justify-center">
      <ToastContainer />
      <div className="w-4/5 absolute self-start top-[10vh]">
        <ProgressBar
          filledBackground="rgb(168 85 247 / 1)"
          percent={((step - 1) / 4) * 100}
        >
          <Step>
            {({ accomplished }: { accomplished: boolean }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                1
              </div>
            )}
          </Step>

          <Step>
            {({ accomplished }: { accomplished: boolean }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                2
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished }: { accomplished: boolean }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                3
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished }: { accomplished: boolean }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                4
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished }: { accomplished: boolean }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
              >
                5
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      {step === 1 && (
        <Step1 onStepChange={(newStep: number) => setStep(newStep)} />
      )}
      {step === 2 && (
        <Step2 onStepChange={(newStep: number) => setStep(newStep)} />
      )}
      {step === 3 && (
        <Step3 onStepChange={(newStep: number) => setStep(newStep)} />
      )}
      {step === 4 && (
        <Step4 onStepChange={(newStep: number) => setStep(newStep)} />
      )}
      {step === 5 && <Step5 />}
    </div>
  );
};

export default ProgressBarComponent;
