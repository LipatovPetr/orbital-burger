import { ChangeEvent, useState } from "react";

export type FormState = {
  [index: string]: string;
};

export function useFormInputs(inputValues = {}) {
  const [values, setValues] = useState<FormState>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
