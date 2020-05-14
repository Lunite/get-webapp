import { FunctionComponent, useState } from "react"

import React from "react"

import "./styles.scss"

interface BurgerMenuProps {
  className: string
}

const BurgerMenu: FunctionComponent<BurgerMenuProps> = ({
  className,
  children,
}) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div
      className={`burger-menu ${className} ${open ? "burger-menu--open" : ""}`}
    >
      <div className="burger-menu__toggle" onClick={toggleOpen}>
        T
      </div>
      <div className="burger-menu__items">{children}</div>
    </div>
  )
}

export default BurgerMenu
