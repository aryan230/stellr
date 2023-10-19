import React from "react";

function HelperText({ text, link, onClick }) {
  return (
    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
      {text}
      {link && (
        <a
          href="#"
          onClick={onClick}
          className="font-medium text-blue-600 hover:underline"
        >
          {link}
        </a>
      )}
      .
    </p>
  );
}

export default HelperText;
