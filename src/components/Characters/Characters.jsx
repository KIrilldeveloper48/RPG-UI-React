import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Characters.css';
import wizardImg from '../../images/characters/wizard.png'
import enemyImg from '../../images/characters/enemy.png'

import { decHealth } from './../../store/action';
import { KEYS_CODE, Parameters } from '../../const';


const getCurrentHealth = (statChar) => {
  for (const char of statChar) {
    if (char.name === Parameters.HEALTH.name) {
      return char.currentValue;
    }
  }
}

const Characters = () => {
  const { menuOpenedStatus, statCharacteristics } = useSelector(state => state)
  const [hitCount, setHitCount] = useState(0);
  const [wizardPosition, setWizardPosition] = useState(`50%`);
  const wizardRef = useRef();
  const enemyRef = useRef();

  const dispatch = useDispatch()

  const keyDownHandler = (evt) => {
    let newWizardPosition;
    switch (evt.keyCode) {
      case KEYS_CODE.ARROW_LEFT:
        newWizardPosition = wizardRef.current.offsetLeft - (wizardRef.current.width / 2);
        newWizardPosition > 0 && setWizardPosition(newWizardPosition + `px`);
        break;
      case KEYS_CODE.ARROW_RIGHT:
        newWizardPosition = wizardRef.current.offsetLeft + (wizardRef.current.width / 2);
        newWizardPosition < enemyRef.current.offsetLeft && setWizardPosition(newWizardPosition + `px`);
        if (wizardRef.current.offsetLeft > (enemyRef.current.offsetLeft - (enemyRef.current.width / 2))) {
          setHitCount(prev => prev + 1);
        }
        break;
      default:
        break;
    };
  };

  useEffect(() => {
    if (hitCount === 0) {
      return;
    }

    const currentHealth = getCurrentHealth(statCharacteristics);
    if (currentHealth <= 0) {
      alert(`Wizard: Не попал!`);
    } else if (currentHealth > 0) {
      alert(`Wizard: Ай!`);
      dispatch(decHealth());
    }
  }, [hitCount]);


  useEffect(() => {
    if (!menuOpenedStatus) {
      document.addEventListener(`keydown`, keyDownHandler)
    }
    return () => {
      document.removeEventListener(`keydown`, keyDownHandler);
    }
  }, [menuOpenedStatus]);

  return (
    <div className="main__characters characters ">
      <img className="characters__wizard" style={{ left: `${wizardPosition}` }} src={wizardImg} alt=" wizard" ref={wizardRef} />
      <img className="characters__enemy" src={enemyImg} alt="wizard's enemy" ref={enemyRef} />
    </div>
  )
}

export default Characters