import { useState } from "react"

export const useCustomerType = () => {
  const [customerType, setType] = useState("domestic")

  const changeCustomerType = type => {
    setType(type)
  }

  return { customerType, changeCustomerType }
}
