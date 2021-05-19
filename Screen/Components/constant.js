/**
 * @format
 * @flow strict-local
 */
export const MODE_DATE = 'date';
export const MODE_TIME = 'time';
export const MODE_DATETIME = 'datetime';

export const DISPLAY_DEFAULT = 'default';
export const DISPLAY_SPINNER = 'spinner';
export const DISPLAY_CLOCK = 'clock';
export const DISPLAY_CALENDAR = 'calendar';
export const MIN_MS = 60000;

// TODO vonovak potentially replace the above string consts with this object
export const ANDROID_DISPLAY = Object.freeze({
  default: 'default',
  spinner: 'spinner',
  clock: 'clock',
  calendar: 'calendar',
});

export const ANDROID_MODE = Object.freeze({
  date: 'date',
  time: 'time',
});

export const IOS_MODE = Object.freeze({
  date: 'date',
  time: 'time',
  datetime: 'datetime',
  countdown: 'countdown',
});

export const IOS_DISPLAY = Object.freeze({
  default: 'default',
  spinner: 'spinner',
  compact: 'compact',
  inline: 'inline',
});

export const DAY_OF_WEEK = Object.freeze({
  Minggu: 0,
  Senin: 1,
  Selasa: 2,
  Rabu: 3,
  Kamis: 4,
  Jumat: 5,
  Sabtu: 6,
});

export const DATE_SET_ACTION = 'dateSetAction';
export const TIME_SET_ACTION = 'timeSetAction';
export const DISMISS_ACTION = 'dismissedAction';

export const NEUTRAL_BUTTON_LABEL = 'neutralButtonLabel';
export const NEUTRAL_BUTTON_ACTION = 'neutralButtonAction';