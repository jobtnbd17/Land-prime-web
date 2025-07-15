import React from "react";

function FromInput({ name, register, errors, type = "text" }) {
  return (
    <div className="flex flex-col">
      <input
        {...register(name)}
        type={type}
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        className="p-3 border border-[#5C5A52] rounded-lg bg-[#2A2825] text-[#EDE6DA] placeholder-[#A9A29E] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
      />
      {errors[name] && (
        <span className="text-red-400 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default FromInput;
