import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useAppDispatch } from "shared/lib/store";
import { updateBookFromList } from "entities/book/bookList";

const steps = ["New", "Reading", "Finished"];

interface Props {
  id: number;
  status: number;
}

export default function Steps({ id, status = 0 }: Props) {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = React.useState(status);

  const handleUpdate = async (index: number) => {
    try {
      await dispatch(updateBookFromList({ id, status: index })).unwrap();
      setActiveStep(index);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleUpdate(index);
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
