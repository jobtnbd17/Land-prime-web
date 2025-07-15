import React from "react";

function FromInput({ name, label, register, errors, type = "text" }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-semibold text-[#5D4037]">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={label || name.charAt(0).toUpperCase() + name.slice(1)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default FromInput;
