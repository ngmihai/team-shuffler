export const getActionButtonLabel = (step: number) => {
  if (step === 0) {
    return "Save players";
  }
  if (step === 1) {
    return "Split and randomize teams";
  }
  return "Again?";
};
