import React, { FunctionComponent } from "react"

import "./styles.scss"
import Heading from "~/components/configurable/Heading"

interface FormCheckboxProps {
  label: string
  name: string
  options: string[]
  className?: string
  placeholder?: string
  value?: string
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
          />
          <label
            className="form-checkbox__label"
            htmlFor={`checkbox-${name}-${oIndex}`}
          >
            {oValue}
          </label>
        </div>
      ))}
      {children && <div className="form-checkbox__appendix">{children}</div>}
    </div>
  )
}

export default FormCheckbox
