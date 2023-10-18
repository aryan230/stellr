import React from "react";
import ReactQuill from "react-quill";

function DefaultRTE({ label, value, onChange }) {
  return (
    <div className="custom-react-quill-editor">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        const
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["clean"],
            // Add custom buttons or options as needed
          ],
        }}
      />
    </div>
  );
}

export default DefaultRTE;
