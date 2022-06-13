const Input = ({
  label,
  type = "text",
  placeholder,
  labelClass = "",
  inputClass = "",
  wrapperClass = "",
  fullWidth = false,
  register,
  name,
  ...input
}) => {
  return (
    <div
      className={`form-control w-full ${
        fullWidth ? "max-w-full" : "max-w-xs"
      } ${wrapperClass}`}
    >
      {label && (
        <label className={`label ${labelClass}`}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        {...input}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${
          fullWidth ? "max-w-full" : "max-w-xs"
        } ${inputClass}`}
      />
    </div>
  );
};

export default Input;
