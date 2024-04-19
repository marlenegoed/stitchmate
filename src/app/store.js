import {create} from 'zustand';

// TODO: Sort reminders 

let id = 1;
export const useStore = create((set) => ({

  count: 0,
  title: `my counter no.${id}`,
  numOfRows: null,
  reminders: [],
  nextReminders: [],
  clickSoundEnabled: true,

  // methods 
  countUp: function () {
    return set(state => ({...state, count: state.count + 1 % 1000}));
  },

  countDown: function () {
    return set(state => {
      if (state.count <= 0) return {...state, count: 0};
      return {...state, count: state.count - 1};
    });
  },

  resetCount: function () {
    return set(state => ({...state, count: 0}));
  },

  setTitle: function (title) {
    return set(state => {
      if (!title) {
        id++;
        return {...state, title: state.title};
      }
      return {...state, title};
    });
  },

  setCount: function (count) {
    return set(state => {
      return {...state, count};
    });
  },

  setNumOfRows: function (numOfRows) {
    return set(state => {
      return {...state, numOfRows};
    });
  },

  setReminder: function (reminder) {
    return set(state => {
      const newReminders = [...state.reminders, reminder];
      // newReminders.sort((a, b) => a - b)
      return {...state, reminders: newReminders};

    });
  },

  toggleSound: function () {
    return set(state => ({...state, clickSoundEnabled: !state.clickSoundEnabled}));
  },

}))

