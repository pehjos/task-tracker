import { FC } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { Button } from "./Button";
import { SearchFilter } from "./SearchFilter";
import { Priority } from "../types/taskTypes";

interface HeaderProps {
  toggleForm: () => void;
  handleSearch: (search: string) => void;
  handleFilter: (filter: Priority | "all") => void;
}

export const Header: FC<HeaderProps> = ({ toggleForm, handleSearch, handleFilter }) => {
  return (
    <header className="sticky top-0 z-50 px-3  bg-white pb-3 ">
      <div className="relative  my-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative group">
            <h1 className="text-left text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                My Tracker
              </span>
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-600 hidden sm:block transition-opacity duration-200">
              Stay organized and productive
            </p>
          </div>

          <Button
            type="button"
            label="New Task"
            onClick={toggleForm}
            icon={<BiPlusCircle className="w-5 h-5" />}
            styles="relative px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-sm md:text-base transition-all duration-20 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] overflow-hidden group"
          />
        </div>

        {/* Ensure Correct Filter Values */}
        <SearchFilter handleFilter={(filter) => handleFilter(filter as Priority | "all")} handleSearch={handleSearch} />
      </div>
    </header>
  );
};
