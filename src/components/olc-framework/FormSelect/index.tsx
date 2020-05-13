import React, { FunctionComponent } from "react"

import "./styles.scss"

interface FormSelectProps {
  label: string
  name: string
  options: string[]
  className?: string
  placeholder?: string
  value?: string
}

const FormSelect: FunctionComponent<FormSelectProps> = ({
  label,
  name,
  options,
  className = "",
  placeholder = "Please select",
  value = "",
  children,
}) => {
  return (
    <div className={`form-select ${className}`}>
      <label className="form-select__label">{label}</label>
      <select name={name} className="form-select__field" defaultValue={value}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options?.map(oValue => (
          <option key={oValue} value={oValue}>
            {oValue}
          </option>
        ))}
      </select>
      {children && <div className="form-select__appendix">{children}</div>}
    </div>
  )
}

export default FormSelect
