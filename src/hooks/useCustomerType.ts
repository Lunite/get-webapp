import { useState } from "react"

export const useCustomerType = () => {
  const [type, setType] = useState("residential")

  const changeCustomerType = type => {
    setType(type)
  }

  return { type, changeCustomerType }
}
