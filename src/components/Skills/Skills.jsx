import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Skills.css';

import SkillItem from './SkillItem/SkillItem';
import { resetSkills } from '../../store/action';

const Skills = () => {
  const { baseCharacteristics, skills, skillPoint } = useSelector(state => state)
  const dispatch = useDispatch()

  const resetBtnClickHandler = () => {
    dispatch(resetSkills())
  }

  return (
    <div className="parameters__skills skills">
      {
        baseCharacteristics.map(({ name: charName, currentValue }) =>
          <div className="skills__list" key={charName}>
            <h3>{charName} {currentValue}</h3>
            <ul>
              {
                skills[charName].map(({ name: skillName, image, level }) =>
                  <SkillItem key={skillName} skillLevel={level} skillImage={image} skillName={skillName} dependence={charName} />
                )
              }

            </ul>
          </div>
        )
      }
      <div className="skills__point">
        <p>Очков Навыков: <span>{skillPoint}</span></p>
        <button className="skills__reset btn" onClick={resetBtnClickHandler}>
          Сбросить Навыки
        </button>
      </div>
    </div>
  )
}

export default Skills;