import { useState } from "react";

type MultiStepProps = {
  elements: JSX.Element[];
};

export const useMultiStep = ({ elements }: MultiStepProps) => {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < elements.length - 1) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return {
    step,
    activeElement: elements[step],
    next,
    isNextDisabled: step === elements.length - 1,
    back,
    isBackDisabled: step === 0,
  };
};
