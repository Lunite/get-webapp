import React, { FunctionComponent } from "react"

import "./styles.scss"
import Heading from "~/components/configurable/Heading"

interface FormCheckboxProps {
  label: string
  name: string
  options: string[]
  getOptionLabel?: (option: string) => string
  className?: string
  placeholder?: string
  value?: any
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormCheckbox: FunctionComponent<FormCheckboxProps> = ({
  label,
  name,
  options,
  className = "",
  children,
  onChange = e => {},
  getOptionLabel = option => {
    return option
  },
  value,
}) => {
  return (
    <div className={`form-checkbox ${className}`}>
      <Heading level={4}>{label}</Heading>
      {options?.map((oValue, oIndex) => (
        <div className="form-checkbox__item" key={oIndex}>
          <input
            className="form-checkbox__box"
            type="checkbox"
            name={`${name}: ${oValue}`}
            value={oValue}
            id={`checkbox-${name}-${oIndex}`}
            onChange={onChange}
            checked={value && value[oValue]}
          />
          <label
            className="form-checkbox__label"
            htmlFor={`checkbox-${name}-${oIndex}`}
          >
            {getOptionLabel(oValue)}
          </label>
        </div>
      ))}
      {children && <div className="form-checkbox__appendix">{children}</div>}
    </div>
  )
}

export default FormCheckbox
