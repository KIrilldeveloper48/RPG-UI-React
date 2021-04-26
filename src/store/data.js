import { createReducer } from "@reduxjs/toolkit";
import { Parameters, PARAMS_POINT, SKILL_POINT } from "../const";
import { calcStatCharacteristics, decParamsPoint, incCharacteristics, setUserName, resetCharacteristics, toggleMenuOpenedStatus, incSkillLevel, decSkillPoint, resetSkills, decHealth, replaceAllState } from "./action";
import { INITIAL_SKILLS_STATE } from './../const';

const { STRENGTH, AGILITY, INTELLIGENCE, CHARISMA, HEALTH, DODGE, ENERGY } = Parameters;

const incBaseChar = (baseChar, changedName) => {
  return baseChar.map((param) => {
    if (param.name === changedName) {
      return Object.assign({ ...param }, { currentValue: param.currentValue + 1 })
    }
    return param
  })
}

const getCurrentValue = (name, baseChar) => {
  for (const param of baseChar) {
    if (param.name === name) {
      return param.currentValue
    }
  }
}

const calcStatChar = (baseChar, statChar) => {
  return statChar.map((param) => {

    switch (param.name) {

      case HEALTH.name:
        return Object.assign({
          ...param,
          currentValue: param.baseValue + getCurrentValue(STRENGTH.name, baseChar)
        })

      case DODGE.name:

        return Object.assign({
          ...param,
          currentValue: param.baseValue + getCurrentValue(AGILITY.name, baseChar)
        })

      case ENERGY.name:
        return Object.assign({
          ...param,
          currentValue: getCurrentValue(AGILITY.name, baseChar) + getCurrentValue(INTELLIGENCE.name, baseChar)
        })

      default:
        return param
    }
  })
}

const resetChar = (baseChar) => {
  return baseChar.map((param) => Object.assign({
    ...param,
    currentValue: param.baseValue
  }))
}


const changeSkillLevel = (skills, { skillName, dependence }) => {
  const newSkillList = skills[dependence].map((skill) => {
    return skill.name === skillName
      ? { name: skill.name, level: skill.level + 1, image: skill.image }
      : skill
  });

  return Object.assign({ ...skills, }, { [dependence]: newSkillList })
}

const decHealthChar = (statChar) => {
  return statChar.map((char) => {
    return char.name === HEALTH.name ? Object.assign({ ...char }, { currentValue: char.currentValue - 1 }) : char
  })
}


const initialState = {
  baseCharacteristics: [
    {
      name: STRENGTH.name,
      baseValue: STRENGTH.baseValue,
      currentValue: STRENGTH.baseValue
    },
    {
      name: AGILITY.name,
      baseValue: AGILITY.baseValue,
      currentValue: AGILITY.baseValue
    },
    {
      name: INTELLIGENCE.name,
      baseValue: INTELLIGENCE.baseValue,
      currentValue: INTELLIGENCE.baseValue
    },
    {
      name: CHARISMA.name,
      baseValue: CHARISMA.baseValue,
      currentValue: CHARISMA.baseValue
    }
  ],
  statCharacteristics: [
    {
      name: HEALTH.name,
      baseValue: HEALTH.baseValue,
      currentValue: HEALTH.baseValue
    },
    {
      name: DODGE.name,
      baseValue: DODGE.baseValue,
      currentValue: DODGE.baseValue
    },
    {
      name: ENERGY.name,
      baseValue: ENERGY.baseValue,
      currentValue: ENERGY.baseValue
    }
  ],
  skills: INITIAL_SKILLS_STATE,
  paramsPoint: PARAMS_POINT,
  skillPoint: SKILL_POINT,
  userName: ``,
  menuOpenedStatus: false
}

export const data = createReducer(initialState, (builder) => {
  builder.addCase(incCharacteristics, (state, action) => {
    state.baseCharacteristics = incBaseChar(state.baseCharacteristics, action.payload)
    state.statCharacteristics = calcStatChar(state.baseCharacteristics, state.statCharacteristics)

  });
  builder.addCase(calcStatCharacteristics, (state) => {
    state.statCharacteristics = calcStatChar(state.baseCharacteristics, state.statCharacteristics)
  });

  builder.addCase(resetCharacteristics, (state) => {
    state.baseCharacteristics = resetChar(state.baseCharacteristics);
    state.statCharacteristics = calcStatChar(state.baseCharacteristics, state.statCharacteristics);
    state.paramsPoint = PARAMS_POINT;
    state.skillPoint = SKILL_POINT;
    state.skills = INITIAL_SKILLS_STATE;
  });

  builder.addCase(decParamsPoint, (state) => {
    state.paramsPoint = state.paramsPoint - 1;
  });

  builder.addCase(setUserName, (state, action) => {
    state.userName = action.payload;
  });

  builder.addCase(toggleMenuOpenedStatus, (state) => {
    state.menuOpenedStatus = !state.menuOpenedStatus;
  });

  builder.addCase(incSkillLevel, (state, action) => {
    state.skills = changeSkillLevel(state.skills, action.payload);
  });

  builder.addCase(decSkillPoint, (state) => {
    state.skillPoint = state.skillPoint - 1;
  });

  builder.addCase(resetSkills, (state) => {
    state.skillPoint = SKILL_POINT;
    state.skills = INITIAL_SKILLS_STATE;
  });

  builder.addCase(decHealth, (state) => {
    state.statCharacteristics = decHealthChar(state.statCharacteristics);
  });

  builder.addCase(replaceAllState, (state, action) => {
    state.baseCharacteristics = action.payload.baseCharacteristics;
    state.statCharacteristics = action.payload.statCharacteristics;
    state.skills = action.payload.skills;
    state.paramsPoint = action.payload.paramsPoint;
    state.skillPoint = action.payload.skillPoint;
    state.userName = action.payload.userName;
    state.menuOpenedStatus = true;
  });
})