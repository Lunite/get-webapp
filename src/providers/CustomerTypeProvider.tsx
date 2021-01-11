import React, { Dispatch, SetStateAction, useState } from "react"

type ICustomerTypeContext = {
  customerType: String
  setCustomerType: Dispatch<SetStateAction<string>>
}

export const CustomerTypeContext = React.createContext({
  customerType: "",
  setCustomerType: () => {},
} as ICustomerTypeContext)

interface CustomerTypeProviderProps {
  children: any;
  defaultCustomerType?: string;
}


export const CustomerTypeProvider = ({ 
  children,
  defaultCustomerType = "domestic" 
}: CustomerTypeProviderProps) => {
  const [customerType, setCustomerType] = useState(defaultCustomerType);

  console.log('CustomerTypeProvider:customerType', customerType);

  return (
    <CustomerTypeContext.Provider value={{ customerType, setCustomerType }}>
      {children}
    </CustomerTypeContext.Provider>
  )
}
