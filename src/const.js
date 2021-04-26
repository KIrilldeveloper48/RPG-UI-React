import visionIcon from '../src/images/icons/skills/all-seeing-eye.svg'
import attackIcon from '../src/images/icons/skills/wizard-staff.svg'
import shieldIcon from '../src/images/icons/skills/arrows-shield.svg'
import knowledgeIcon from '../src/images/icons/skills/gift-of-knowledge.svg'
import healthIcon from '../src/images/icons/skills/health-potion.svg'
import minionsIcon from '../src/images/icons/skills/minions.svg'
import quiverIcon from '../src/images/icons/skills/quiver.svg'
import stealthIcon from '../src/images/icons/skills/sight-disabled.svg'
import smittenIcon from '../src/images/icons/skills/smitten.svg'
import terrorIcon from '../src/images/icons/skills/terror.svg'

export const PARAMS_POINT = 20;
export const SKILL_POINT = 10;

export const KEYS_CODE = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ESC: 27,
}

export const Parameters = {
  STRENGTH: {
    name: `Сила`,
    baseValue: 0
  },
  AGILITY: {
    name: `Ловкость`,
    baseValue: 0
  },
  INTELLIGENCE: {
    name: `Интеллект`,
    baseValue: 0
  },
  CHARISMA: {
    name: `Харизма`,
    baseValue: 0
  },
  HEALTH: {
    name: `Жизненная сила`,
    baseValue: 3
  },
  DODGE: {
    name: `Уклонение`,
    baseValue: 10
  },
  ENERGY: {
    name: `Энергичность`,
    baseValue: 0
  },
}


export const Skills = {
  VISION: {
    name: `Проницательность`,
    baseLevel: 0,
    image: visionIcon,
  },
  ATTACK: {
    name: `Атака`,
    baseLevel: 0,
    image: attackIcon,
  },
  VITALITY: {
    name: `Выживание`,
    baseLevel: 0,
    image: shieldIcon,
  },
  KNOWLEDGE: {
    name: `Обучаемость`,
    baseLevel: 0,
    image: knowledgeIcon,
  },
  MEDICINE: {
    name: `Медицина`,
    baseLevel: 0,
    image: healthIcon,
  },
  MANIPULATION: {
    name: `Манипулирование`,
    baseLevel: 0,
    image: minionsIcon,
  },
  SHOOTING: {
    name: `Стрельба из лука`,
    baseLevel: 0,
    image: quiverIcon,
  },
  STEALTH: {
    name: `Стелс`,
    baseLevel: 0,
    image: stealthIcon,
  },
  SMITTEN: {
    name: `Внешний вид`,
    baseLevel: 0,
    image: smittenIcon,
  },
  TERROR: {
    name: `Запугивание`,
    baseLevel: 0,
    image: terrorIcon,
  },
}

export const INITIAL_SKILLS_STATE = {
  [Parameters.STRENGTH.name]: [
    {
      name: Skills.ATTACK.name,
      level: Skills.ATTACK.baseLevel,
      image: Skills.ATTACK.image
    }
  ],
  [Parameters.AGILITY.name]: [
    {
      name: Skills.SHOOTING.name,
      level: Skills.SHOOTING.baseLevel,
      image: Skills.SHOOTING.image
    },
    {
      name: Skills.STEALTH.name,
      level: Skills.STEALTH.baseLevel,
      image: Skills.STEALTH.image
    },
  ],
  [Parameters.INTELLIGENCE.name]: [
    {
      name: Skills.MEDICINE.name,
      level: Skills.MEDICINE.baseLevel,
      image: Skills.MEDICINE.image
    },
    {
      name: Skills.KNOWLEDGE.name,
      level: Skills.KNOWLEDGE.baseLevel,
      image: Skills.KNOWLEDGE.image
    },
    {
      name: Skills.VITALITY.name,
      level: Skills.VITALITY.baseLevel,
      image: Skills.VITALITY.image
    },
  ],
  [Parameters.CHARISMA.name]: [
    {
      name: Skills.SMITTEN.name,
      level: Skills.SMITTEN.baseLevel,
      image: Skills.SMITTEN.image
    },
    {
      name: Skills.TERROR.name,
      level: Skills.TERROR.baseLevel,
      image: Skills.TERROR.image
    },
    {
      name: Skills.MANIPULATION.name,
      level: Skills.MANIPULATION.baseLevel,
      image: Skills.MANIPULATION.image
    },
    {
      name: Skills.VISION.name,
      level: Skills.VISION.baseLevel,
      image: Skills.VISION.image
    },
  ],
}

export const MAX_SKILL_LEVEL = 5;
export const LEVELS_NAME = [`Нетренированный`, `Новичок`, `Ученик`, `Адепт`, `Эксперт`, `Мастер`]
