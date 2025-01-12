import { forwardRef, useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const TextInput = forwardRef(
  (
    {
      value,
      setValue,
      type = "text",
      placeholder = "",
      disabled = false,
      required = false,
      name = "",
      id = "",
      label = "",
      error = "",
      className = "",
      containerClassName = "",
      labelClassName = "",
      debounceTime = 500,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, debounceTime);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      if (setValue && debouncedValue !== value) {
        setValue(debouncedValue);
      }
    }, [debouncedValue]);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    return (
      <div className={`w-full max-w-sm min-w-[200px] ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id || name}
            className={`block mb-2 text-sm text-light1/80 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={type}
            value={localValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            name={name}
            id={id || name}
            className={`bg-gray-700 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 text-left dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p className="flex items-center mt-2 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
