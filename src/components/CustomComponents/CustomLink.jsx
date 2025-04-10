import React from 'react'
import style from "./CustomElements.module.css"
const CustomLink = ({link, item}) => {
  return (
    <a className={style.link} href={`/${link}`}>{item}</a>
  )
};

export default CustomLink
