import React from "react";

export default function SearchBox({ label, placeholder, value, handleSearch }) {
  return (
    <div className="flex items-center gap-3 pl-4 flex-1 font-primary">
      <label className="text-lg font-semibold text-primary dark:text-primary">
        {label}
      </label>
      <input
        type="text"
        className="glass-input max-w-[260px]"
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}
