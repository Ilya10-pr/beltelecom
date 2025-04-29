import React from 'react';
import style from "./CustomElements.module.css";
import { NavLink } from 'react-router-dom';
import { isAction } from '@reduxjs/toolkit';

const CustomSectionLinks = ({prefix, links}) => {
  return (
    <div className={style.wrapperLinks}>
      <div>
        {links.map((link) => (
          <NavLink key={link.path} className={({isActive}) => isActive ? style.activeLink : style.link} to={prefix + link.path}>{link.name}</NavLink>
        ))}
      </div>
    </div>
  )
};

export default CustomSectionLinks
