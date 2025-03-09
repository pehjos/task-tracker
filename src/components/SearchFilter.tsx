import { FC, useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { Button } from "./Button";
import { Priority } from "../types/taskTypes";

interface SearchFilterProps {
  handleSearch: (searchTerm: string) => void;
  handleFilter: (filter: Priority | "all") => void;
}

export const SearchFilter: FC<SearchFilterProps> = ({ handleSearch, handleFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<Priority | "all">("all");

  useEffect((): (() => void) => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500); 
  
    return (): void => clearTimeout(delayDebounce);
  }, [searchTerm]); 

  const filterTasks = (filter: Priority | "all"): void => {
    setActiveFilter(filter);
    handleFilter(filter);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <form onSubmit={(e) => e.preventDefault()} className="relative flex-grow">
        <Button
          type="submit"
          label=""
          arialLabel="Submit button"
          onClick={undefined}
          icon={<BiSearch className="h-5 w-5 text-gray-400" />}
          styles="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
        />
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm md:text-base text-gray-700 placeholder-gray-400 transition-all outline-none duration-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Filter Options */}
      <div className="flex justify-between md:justify-start gap-2 md:gap-3 p-1 overflow-x-auto hideScrollbar">
        <FilterCheckbox label="All" filterValue="all" activeFilter={activeFilter} onChange={filterTasks} />
        <FilterCheckbox label="Low" filterValue="Low" activeFilter={activeFilter} onChange={filterTasks} />
        <FilterCheckbox label="Medium" filterValue="Medium" activeFilter={activeFilter} onChange={filterTasks} />
        <FilterCheckbox label="High" filterValue="High" activeFilter={activeFilter} onChange={filterTasks} />
      </div>
    </div>
  );
};

interface FilterCheckboxProps {
  label: string;
  filterValue: Priority | "all";
  activeFilter: Priority | "all";
  onChange: (filter: Priority | "all") => void;
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({ label, filterValue, activeFilter, onChange }) => (
  <label className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${activeFilter === filterValue ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
    <input
      type="checkbox"
      checked={activeFilter === filterValue}
      onChange={() => onChange(filterValue)}
      className="h-4 w-4 text-blue-600 rounded focus:ring-0 transition duration-150 cursor-pointer"
    />
    {label}
  </label>
);
