import React, { FunctionComponent, useState, useEffect } from "react"
import { globalHistory } from "@reach/router"

import "./styles.scss"

import Burger from "~/vectors/burger.inline.svg"
import Close from "~/vectors/close.inline.svg"

interface BurgerMenuProps {
  className: string
}

const BurgerMenu: FunctionComponent<BurgerMenuProps> = ({
  className,
  children,
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    return globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        setOpen(false)
      }
    })
  }, [])

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div
      className={`burger-menu ${className} ${open ? "burger-menu--open" : ""}`}
    >
      <div className="burger-menu__toggle" onClick={toggleOpen}>
        {open && <Close />}
        {!open && <Burger />}
      </div>
      <div className="burger-menu__items">{children}</div>
    </div>
  )
}

export default BurgerMenu
