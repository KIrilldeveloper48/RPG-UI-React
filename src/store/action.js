import { createAction } from '@reduxjs/toolkit';


export const ActionType = {
  INC_CHARACTERISTICS: `user/incCharacteristics`,
  CALC_STAT_CHARACTERISTICS: `user/calcStatincCharacteristics`,
  RESET_CHARACTERISTICS: `user/resetCharacteristics`,
  DEC_PARAMS_POINT: `user/decParamsPoint`,
  SET_USER_NAME: `user/setUserName`,
  TOGGLE_MENU_OPENED_STATUS: `main/toggleMenuOpenedStatus`,
  INC_SKILL_LEVEL: `skill/incSkillLevel`,
  DEC_SKILL_POINT: `skill/decSkillPoint`,
  RESET_SKILLS: `skill/resetSkills`,
  DEC_HEALTH: `user/decHealth`,
  REPLACE_ALL_STATE: `user/replaceAllState`
};

export const incCharacteristics = createAction(ActionType.INC_CHARACTERISTICS, (name) => {
  return {
    payload: name
  }
});

export const calcStatCharacteristics = createAction(ActionType.CALC_STAT_CHARACTERISTICS);
export const resetCharacteristics = createAction(ActionType.RESET_CHARACTERISTICS);
export const decParamsPoint = createAction(ActionType.DEC_PARAMS_POINT);

export const setUserName = createAction(ActionType.SET_USER_NAME, (userName) => {
  return {
    payload: userName
  };
});

export const toggleMenuOpenedStatus = createAction(ActionType.TOGGLE_MENU_OPENED_STATUS);

export const incSkillLevel = createAction(ActionType.INC_SKILL_LEVEL, (skillData) => {
  return {
    payload: skillData
  }
});

export const decSkillPoint = createAction(ActionType.DEC_SKILL_POINT);
export const resetSkills = createAction(ActionType.RESET_SKILLS);
export const decHealth = createAction(ActionType.DEC_HEALTH);
export const replaceAllState = createAction(ActionType.REPLACE_ALL_STATE, (allState) => {
  return {
    payload: allState
  }
});

