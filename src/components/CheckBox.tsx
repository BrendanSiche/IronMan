import { ChangeEvent } from "react";
import { styled } from "../styles/theme";

type CheckBoxProps = {
  label: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export const CheckBox = ({ label, id, onChange }: CheckBoxProps) => {
  return (
    <div>
      <input type="checkbox" id={id} onChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

const Label = styled("label", {
  marginLeft: "4px",
});
