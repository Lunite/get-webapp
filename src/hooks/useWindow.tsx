import { useState } from "react"

export const useWindow = () => {
  const [windowYo, setWindow] = useState(
    typeof window !== "undefined" ? window : {}
  )

  return [windowYo, setWindow]
}
