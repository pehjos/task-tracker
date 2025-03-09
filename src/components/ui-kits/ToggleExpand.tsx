import { FC } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface ToggleExpandProps {
  isExpanded: boolean;
}

export const ToggleExpand: FC<ToggleExpandProps> = ({ isExpanded }) =>
  isExpanded ? (
    <>
      <MdVisibilityOff className="size-4" />
      <span>Less</span>
    </>
  ) : (
    <>
      <MdVisibility className="size-4" />
      <span>More</span>
    </>
  );
