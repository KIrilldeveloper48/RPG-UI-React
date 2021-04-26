import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Menu.css';

import { fetchRandomName } from '../../store/api';

import Skills from '../Skills/Skills';
import Characteristics from './Characteristics/Characteristics';

import wizardImg from '../../images/characters/wizard.png'
import randomBtn from '../../images/icons/UI/perspective-dice-six-faces-random.svg'
import { replaceAllState, setUserName, toggleMenuOpenedStatus } from '../../store/action';


const Menu = () => {
  const { userName } = useSelector(state => state);
  const currentState = useSelector(state => state)
  const [subMenuOpenedStatus, setSubMenuOpenedStatus] = useState({ char: true, skills: false });
  const nameRef = useRef()
  const exportRef = useRef()
  const importRef = useRef()

  const dispatch = useDispatch()


  const menuCloseHandler = () => {
    dispatch(toggleMenuOpenedStatus())
  }
  const nameChangeHandler = () => {
    dispatch(setUserName(nameRef.current.value))
  }

  const randomBtnClickHandler = () => {
    fetchRandomName()
      .then((userName) => {
        dispatch(setUserName(userName));
      })
  }

  const subMenuClickHandler = (evt) => {
    let newSubMenuOpenedStatus = {}
    for (const subMenu in subMenuOpenedStatus) {
      newSubMenuOpenedStatus[subMenu] = subMenu === evt.currentTarget.value;
    }

    setSubMenuOpenedStatus(newSubMenuOpenedStatus)
  }

  const getSubMenuContent = () => {
    switch (true) {
      case subMenuOpenedStatus.char:
        return <Characteristics />

      case subMenuOpenedStatus.skills:
        return <Skills />

      default:
        break;
    }
  }

  const loadJSON = async (file) => {
    await file.text()
      .then((res) => {
        const userData = JSON.parse(res);
        dispatch(replaceAllState(userData))
      });
  }

  const exportClickHandler = () => {
    const data = JSON.stringify({ ...currentState });
    const file = new Blob([data], { type: 'application/json' });
    exportRef.current.href = URL.createObjectURL(file);
    exportRef.current.download = 'example.json';
    exportRef.current.click();
  }

  const importChangeHandler = () => {
    const file = importRef.current.files[0];
    loadJSON(file);
  }

  return (
    <section className="menu">
      <span className="menu-close" onClick={menuCloseHandler}></span>
      <div className="menu__common-info common-info">

        <div className="common-info__name">
          <input type="text" id="character-name" value={userName} placeholder="Введите имя персонажа" ref={nameRef} onChange={nameChangeHandler} />
          <label className="visually-hidden" htmlFor="character-name">Имя персонажа</label>
          <button onClick={randomBtnClickHandler}>
            <img src={randomBtn} alt="Зарандомить имя" />
          </button>
        </div>

        <div className="common-info__character">
          <div className="character">
            <img src={wizardImg} alt="" />
          </div>
        </div>

        <div className="import-export">
          <button className="btn">
            <label htmlFor="import-user-data">Импорт</label>
            <input type="file" id="import-user-data" ref={importRef} onChange={importChangeHandler} />
          </button>
          <button className="btn" onClick={exportClickHandler}><a href="/" ref={exportRef}></a>Экспорт</button>
        </div>

      </div>

      <div className="menu__parameters parametres">

        <div className="parametres__nav nav">
          <div className="nav__btns">
            <button className="btn" value="char" disabled={subMenuOpenedStatus.char} onClick={subMenuClickHandler}>Характеристики</button>
            <button className="btn" value="skills" disabled={subMenuOpenedStatus.skills} onClick={subMenuClickHandler}>Умения</button>
          </div>
        </div>
        {
          getSubMenuContent()
        }
      </div>
    </section>
  )
}

export default Menu;

