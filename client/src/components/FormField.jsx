import React from 'react';

const FormField = ({
  handleSurpriseMe,
  isSurpriseMe,
  handleChange,
  value,
  placeholder,
  name,
  type,
  labelName,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 "
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <div>
            <span className="font-bold text-black">Or</span>
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="font-semibold text-md ml-3 bg-blue-700  hover:bg-blue-200 ring-2 ring-blue-700 py-1 px-2 rounded-[5px] text-black"
            >
              Blow my mind
            </button>
          </div>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg border focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;
