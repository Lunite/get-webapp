import React, { FunctionComponent } from "react"

import "./styles.scss"

interface FormInputProps {
  label: string
  name: string
  className?: string
  type?: string
  placeholder?: string
  value?: string
  required?: boolean;
  style?: React.CSSProperties;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  label,
  name,
  className = "",
  type = "text",
  placeholder = "",
  value = "",
  required = false,
  children,
  style,
}) => {
  return (
    <div className={`form-input ${className}`} style={style}>
      <label className="form-input__label">{label}</label>
      <input
        className="form-input__field"
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
      />
      {children && <div className="form-input__appendix">{children}</div>}
    </div>
  )
}

export default FormInput
