import React, { Dispatch, SetStateAction, useState } from "react"

type ICustomerTypeContext = {
  customerType: String
  setCustomerType: Dispatch<SetStateAction<string>>
}

export const CustomerTypeContext = React.createContext({
  customerType: "",
  setCustomerType: () => {},
} as ICustomerTypeContext)

export const CustomerTypeProvider = ({ children }: { children: any }) => {
  const [customerType, setCustomerType] = useState("domestic")

  return (
    <CustomerTypeContext.Provider value={{ customerType, setCustomerType }}>
      {children}
    </CustomerTypeContext.Provider>
  )
}
