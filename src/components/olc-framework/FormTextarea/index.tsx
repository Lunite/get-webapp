import React, { FunctionComponent } from "react"

interface FormTextareaProps {
  label: string
  name: string
  className?: string
  placeholder?: string
  value?: string
  required?: boolean
}

const FormTextarea: FunctionComponent<FormTextareaProps> = ({
  label,
  name,
  className = "",
  placeholder = "",
  value = "",
  required = false,
  children,
}) => {
  return (
    <div className={`form-textarea ${className}`}>
      <label className="form-textarea__label">{label}</label>
      <textarea
        name={name}
        className="form-textarea__field"
        defaultValue={value}
        placeholder={placeholder}
        required={required}
      />
      {children && <div className="form-textarea__appendix">{children}</div>}
    </div>
  )
}

export default FormTextarea
