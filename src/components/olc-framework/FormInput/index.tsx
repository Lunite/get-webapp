import React, { FunctionComponent, HTMLProps } from "react"

import "./styles.scss"

interface FormInputProps {
  label: string
  name: string
  className?: string
  type?: string
  placeholder?: string
  value?: string
  required?: boolean
  pattern?: string
  title?: string
}

const FormInput: FunctionComponent<HTMLProps<HTMLInputElement>> = ({
  label,
  name,
  className = "",
  type = "text",
  placeholder = "",
  value = "",
  required = false,
  children,
  pattern,
  title,
}) => {
  return (
    <div className={`form-input ${className}`}>
      <label className="form-input__label">{label}</label>
      <input
        className="form-input__field"
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        pattern={pattern}
        title={title}
      />
      {children && <div className="form-input__appendix">{children}</div>}
    </div>
  )
}

export default FormInput
