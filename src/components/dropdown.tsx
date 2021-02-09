import React, { useState, useRef, useEffect } from "react";

type TProps = {
  type: string,
  setType:(value:string)=>void
}

const Dropdown = ({ type, setType }: TProps) => {
  const [showMenu, toggleMenu] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const types = ["user", "repository"]
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if ((buttonRef.current && listRef.current) &&
        (!buttonRef.current.contains(event.target as HTMLElement) &&
        !listRef.current.contains(event.target as HTMLElement))) {
        toggleMenu(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, listRef]);
  
  return (
    <div className="typeFilter">
      <button
        ref={buttonRef}
        onClick={() => toggleMenu(showMenu ? false : true)}>
        {type} &#9662;
            </button>
      <ul className={`dropdown ${showMenu ? "showMenu" : ''}`} ref={listRef}>
        {
          types.map((type, idx) =>
            <li key={idx}><span onClick={() => { setType(type); toggleMenu(false) }}>{type}</span></li>)
        }
      </ul>
    </div>
  )
}

export default Dropdown