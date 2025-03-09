import { FC, MouseEvent } from "react";
import { Button } from "../Button";
import { BsThreeDotsVertical, BsTrash2 } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

interface ActionButtonsProps {
  deleteTask: () => void;
  handleOnEditClick: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ deleteTask, handleOnEditClick, isMenuOpen, setIsMenuOpen }) => {

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>): void => {
    (event as MouseEvent<HTMLButtonElement>).stopPropagation();
    setIsMenuOpen((prev: boolean) => !prev);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        label=""
        arialLabel="Open action menu"
        onClick={handleMenuClick} 
        isDropdown={true}
        icon={<BsThreeDotsVertical className="text-slate-500 size-4 text-center" />}
        styles="p-2 rounded-full hover:bg-slate-100 transition-all -mt-1"
      />

      {isMenuOpen && (
        <div className="absolute right-0 -mt-1 w-28 bg-white border border-slate-200 shadow-lg rounded-lg z-20">
          <Button
            type="button"
            label="Edit"
            arialLabel="Edit task"
            isDropdown={true}
            onClick={(event) => {
              event.stopPropagation();
              handleOnEditClick();
            }}
            icon={<FiEdit2 className="size-4 text-yellow-600 mr-2" />}
            styles="w-full flex items-center gap-2 p-2 text-gray-500 hover:bg-slate-100 transition-all"
          />
          <Button
            type="button"
            label="Delete"
            arialLabel="Delete task"
            isDropdown={true}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              deleteTask();
              setIsMenuOpen(false);
            }}
            icon={<BsTrash2 className="size-4 text-red-500 mr-2" />}
            styles="w-full flex items-center hover:bg-slate-100 gap-2 p-2 text-gray-700 transition-all"
          />
        </div>
      )}
    </div>
  );
};
