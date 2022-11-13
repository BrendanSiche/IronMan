import { ChangeEvent } from "react";
import { styled } from "../styles/theme";

type RadioProps = {
  label: string;
  groupName?: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => unknown;
};

export const Radio = ({ label, groupName, id, onChange }: RadioProps) => {
  return (
    <div>
      <input type="radio" id={id} name={groupName} onChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

const Label = styled("label", {
  marginLeft: "4px",
});
