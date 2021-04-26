import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PropTypes } from 'prop-types';

import starIcon from '../../../images/icons/UI/round-star.svg'

import { decSkillPoint, incSkillLevel } from '../../../store/action';
import { LEVELS_NAME, MAX_SKILL_LEVEL } from '../../../const'


const getUnavailabelStatus = (skillLevel, dependence, baseChar) => {
  let dependenceLevel;
  for (const char of baseChar) {
    if (char.name === dependence) {
      dependenceLevel = char.currentValue
    }
  }
  return dependenceLevel < (skillLevel + 1)
}

const SkillItem = ({ skillLevel, skillName, skillImage, dependence }) => {
  const { skillPoint, baseCharacteristics } = useSelector(state => state)
  const hintDescrRef = useRef();
  const hintWarningRef = useRef();
  const dispatch = useDispatch()

  const isUnavailabel = getUnavailabelStatus(skillLevel, dependence, baseCharacteristics);

  const unavailabelClass = isUnavailabel ? `skills__item--unavailabel` : ``;
  const disabledClass = !skillPoint ? `skills__item--disabled` : ``;
  const notStudiedClass = !skillLevel ? `skills__item--not-studied` : ``;
  const maxLevelClass = skillLevel === MAX_SKILL_LEVEL ? `skills__item--max-level` : ``;

  const starCount = new Array(skillLevel).fill(0);

  const skillClickHandler = (skillName, dependence) => {
    if (skillLevel !== MAX_SKILL_LEVEL && !isUnavailabel && skillPoint) {
      dispatch(incSkillLevel({ skillName, dependence }))
      dispatch(decSkillPoint())
    }
  }

  const hintWarningMouseOverHandler = () => {
    hintWarningRef.current.classList.remove(`visually-hidden`)
  }

  const hintWarningMouseLeaveHandler = () => {
    hintWarningRef.current.classList.add(`visually-hidden`)
  }

  const hintDescrMouseOverHandler = () => {
    hintDescrRef.current.classList.remove(`visually-hidden`)
  }

  const hintDescrMouseLeaveHandler = () => {
    hintDescrRef.current.classList.add(`visually-hidden`)
  }

  return (
    <li className={`skills__item ${disabledClass} ${unavailabelClass} ${notStudiedClass} ${maxLevelClass}`} key={skillName} onClick={() => skillClickHandler(skillName, dependence)}>

      <ul>
        {
          starCount.map((level, i) =>
            <li className="skill__item-level" key={`${skillName}-${level + i}`} >
              <img src={starIcon} alt="" />
            </li>
          )
        }

      </ul>

      {
        isUnavailabel && skillPoint && skillLevel !== MAX_SKILL_LEVEL ?
          <div className="skills__item-hint skills__item-hint--warning hint" onMouseOver={hintWarningMouseOverHandler} onMouseLeave={hintWarningMouseLeaveHandler}>
            !
        <div className="hint__content visually-hidden" ref={hintWarningRef}>
              <p>Уровень навыка не может превышать уровня соответствующего параметра</p>
            </div>
          </div>
          : null
      }


      <img src={skillImage} alt={`${skillName}`} />


      <div className="skills__item-hint skills__item-hint--descr" onMouseOver={hintDescrMouseOverHandler} onMouseLeave={hintDescrMouseLeaveHandler}>
        ?
        <div className="hint__content visually-hidden" ref={hintDescrRef}>
          <p className="hint__content-skill-name">{skillName}</p>
          <p className="hint__content-skill-level">Уровень владения навыком: <span>{LEVELS_NAME[skillLevel]}</span></p>
        </div>
      </div>

    </li>
  )
}

SkillItem.propTypes = {
  skillLevel: PropTypes.number.isRequired,
  skillName: PropTypes.string.isRequired,
  skillImage: PropTypes.string.isRequired,
  dependence: PropTypes.string.isRequired
}

export default SkillItem;