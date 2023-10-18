import React from "react";

function DatePickerCustom({ label, onChange, required, placeholder, name }) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label ? label : placeholder}
      </label>
      <input
        type="date"
        id="first_name"
        name={name ? name : label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder ? placeholder : label}
        required={required ? required : false}
        onChange={onChange}
      />
    </div>
  );
}

export default DatePickerCustom;
