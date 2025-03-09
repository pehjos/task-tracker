import { FC, MouseEvent ,JSX} from "react";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; 
  icon?: JSX.Element;
  styles?: string;
  arialLabel?: string;
  isDropdown?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, type, onClick, icon, styles, arialLabel, isDropdown }) => {
  return (
    <button
      className={styles}
      onClick={(event) => onClick?.(event)}
      aria-label={arialLabel ?? label}
      type={type}
    >
      {!isDropdown && <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
      <div className={`flex items-center ${!isDropdown ? "space-x-2" : ""}`}>
        {icon && icon}
        <span className="font-medium">{label}</span>
      </div>
    </button>
  );
};
