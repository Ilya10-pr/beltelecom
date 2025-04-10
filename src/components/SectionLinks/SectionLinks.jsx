import React from 'react'
import CustomLink from '../CustomComponents/CustomLink';
import style from "./SectionLinks.module.css"

const SectionLinks = ({value}) => {
  return (
    <div className={style.wrapperLinks}>
        <div>
        {Object.keys(value).map((link) => (
          <CustomLink key={link + Date.now()} link={link} item={value[link]} />
        ))}
        </div>
      </div>
  )
};

export default SectionLinks
