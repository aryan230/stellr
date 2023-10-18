import React from "react";

function TextareaWithLabel({ label, onChange, required, placeholder, name }) {
  return (
    <div className="my-4">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label ? label : placeholder}
      </label>
      <textarea
        id="message"
        rows={4}
        name={name ? name : label}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder ? placeholder : label}
        required={required ? required : false}
        onChange={onChange}
      />
    </div>
  );
}

export default TextareaWithLabel;
