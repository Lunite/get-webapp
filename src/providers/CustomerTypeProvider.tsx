import React, { useState } from "react"

export const CustomerTypeContext = React.createContext(undefined)

export const CustomerTypeProvider = ({ children }: { children: any }) => {
  const [customerType, setCustomerType] = useState("domestic")

  return (
    <CustomerTypeContext.Provider value={{ customerType, setCustomerType }}>
      {children}
    </CustomerTypeContext.Provider>
  )
}
