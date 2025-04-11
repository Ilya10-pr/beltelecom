import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { channels } from '../../../helpers/itemLink';
import { useLocation } from 'react-router-dom';
import style from "../Packages.module.css"

const PopupChannels = () => {
    const url = useLocation()
    const path = url.pathname.split("/")[2]
    const [isOpen, setIsOpen] = useState(false)
    const popupRef = useRef(null);

    useLayoutEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const openModal = (e) => {
      e.preventDefault()
      setIsOpen(!isOpen)
      console.log("openModal")
    }

  return (
    path === "tv" ? 
      <div className={style.popupContainer} ref={popupRef}>
        <button onClick={openModal}>
          Доступные каналы
        </button> 
        {isOpen ? <div className={style.popup}>
        <ul className={style.channelList}>
          {channels.map(channel => (
            <li key={channel}>
              {channel}
            </li>
          ))}
        </ul>
      </div> : null}
        
      </div>
      : null
  )
};

export default PopupChannels
