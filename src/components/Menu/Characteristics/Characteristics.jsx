import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Characteristics.css'

import { decParamsPoint, incCharacteristics, resetCharacteristics } from '../../../store/action';
import { PARAMS_POINT } from '../../../const';

const Characteristics = () => {
  const { baseCharacteristics, statCharacteristics, paramsPoint } = useSelector((state) => state)
  const dispatch = useDispatch()

  const plusClickHandler = (name) => {
    dispatch(incCharacteristics(name))
    dispatch(decParamsPoint())
  }

  const resetClickHandler = () => {
    dispatch(resetCharacteristics())
  }

  return (
    <div className="parameters__characteristics characteristics">
      <div className="characteristics__all">
        <h3>Параметры</h3>
        <ul className="all-list">
          {
            baseCharacteristics.map((param) =>
              <li key={param.name} className="all-list__item">
                {param.name}
              </li>
            )
          }
          {
            statCharacteristics.map((param) =>
              <li key={param.name} className="all-list__item">
                {param.name}
              </li>
            )
          }
        </ul>
      </div>

      <div className="characteristics__base">
        <h3>Базовые</h3>
        <ul className=" base-list">
          {
            baseCharacteristics.map((param) =>
              <li key={param.name + `-base`} className="base-list__item">
                {param.baseValue}
              </li>
            )
          }
          {
            statCharacteristics.map((param) =>
              <li key={param.name + `-base`} className="base-list__item">
                {param.baseValue}
              </li>
            )
          }

        </ul>
      </div>

      <div className="characteristics__current">
        <h3>Текущие</h3>
        <ul className="current-list">
          {
            baseCharacteristics.map((param) =>
              <li key={param.name + `-current`} className="current-list__item">
                {param.currentValue}
                {
                  paramsPoint ? <span onClick={() => plusClickHandler(param.name)}></span> : ``

                }
              </li>
            )
          }
          {
            statCharacteristics.map((param) =>
              <li key={param.name + `-current`} className="all-list__item">
                {param.currentValue}
              </li>)
          }
        </ul>
      </div>

      <div className="characteristics__point">
        <p>Очков параметров: <span>{paramsPoint}</span></p>
        <button className="characteristics__reset btn" disabled={paramsPoint === PARAMS_POINT} onClick={resetClickHandler}>
          Сбросить параметры
        </button>
      </div>
    </div >
  )
}

export default Characteristics;