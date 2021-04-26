import React, { useEffect } from 'react';
import './App.css';
import 'normalize.css'
import Characters from './components/Characters/Characters';
import Menu from './components/Menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { calcStatCharacteristics, toggleMenuOpenedStatus } from './store/action';


const App = () => {
  const dispatch = useDispatch();
  const { menuOpenedStatus } = useSelector(state => state)
  const btnClickHandler = () => {
    dispatch(toggleMenuOpenedStatus())
  }

  return (
    <div className="container">
      <div className="main">
        <Characters />
        {menuOpenedStatus && <Menu />}

      </div>
      <div className="footer">
        <button className="menu-btn btn" disabled={menuOpenedStatus} onClick={btnClickHandler}>Меню персонажа</button>
      </div>
    </div>
  );
}

export default App;
