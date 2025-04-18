import React from 'react';
import style from "./CustomElements.module.css";

const CustomSectionLinks = ({prefix, links}) => {
  return (
    <div className={style.wrapperLinks}>
      <div>
        {links.map((link) => (
          <a key={link.path} className={style.link} href={prefix + link.path}>{link.name}</a>
        ))}
      </div>
    </div>
  )
};

export default CustomSectionLinks
