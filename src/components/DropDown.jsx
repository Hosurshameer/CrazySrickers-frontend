import React from "react";

export default function Dropdown({
  label,
  options,
  selectedValue,
  handleSort,
}) {
  return (
    <div className="flex items-center gap-2 justify-end pr-12 flex-1 font-primary">
      <label className="text-lg font-semibold text-primary dark:text-primary">
        {label}
      </label>
      <select
        className="glass-input max-w-[220px]"
        value={selectedValue}
        onChange={(event) => handleSort(event.target.value)}
      >
        {options.map((optionVal, index) => (
          <option
            key={index}
            value={optionVal}
            className="dark:text-gray-200"
          >
            {optionVal}
          </option>
        ))}
      </select>
    </div>
  );
}
