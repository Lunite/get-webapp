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
  style?: React.CSSProperties
}

<<<<<<< HEAD
const FormInput: FunctionComponent<HTMLProps<HTMLInputElement>> = props => {
=======
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
>>>>>>> upstream/master
  return (
    <div className={`form-input ${props.className}`} style={props.style}>
      <label className="form-input__label">{props.label}</label>
      <input {...props} style={{}} className="form-input__field" />
      {props.children && (
        <div className="form-input__appendix">{props.children}</div>
      )}
    </div>
  )
}

export default FormInput
