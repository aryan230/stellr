import React from "react";

function InputWithLabel({
  label,
  onChange,
  required,
  placeholder,
  name,
  value,
}) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label ? label : placeholder}
      </label>
      <input
        type="text"
        id={label}
        name={name ? name : label}
        value={value && value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder ? placeholder : label}
        required={required ? required : false}
        onChange={onChange}
      />
    </div>
  );
}

export default InputWithLabel;
