import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userCreateReducer,
  userDeleteReducer,
  userImportReducer,
} from './reducers/userReducers';
import {
  subjectListReducer,
  subjectDetailsReducer,
  subjectUpdateReducer,
  subjectCreateReducer,
  subjectDeleteReducer,
} from './reducers/subjectReducers';
import {
  chapterListReducer,
  chapterCreateReducer,
  chapterDetailsReducer,
  chapterUpdateReducer,
  chapterDeleteReducer,
} from './reducers/chapterReducers';
import {
  questionListReducer,
  questionCreateReducer,
  questionDetailsReducer,
  questionUpdateReducer,
  questionDeleteReducer,
} from './reducers/questionReducers';
import {
  examListReducer,
  examCreateReducer,
  examDetailsReducer,
  examUpdateReducer,
  examDeleteReducer,
} from './reducers/examReducers';

import {
  scheduleListReducer,
  scheduleCreateReducer,
  scheduleDetailsReducer,
  scheduleUpdateReducer,
  scheduleDeleteReducer,
} from './reducers/scheduleReducers';
import { changeLanguageReducer } from './reducers/languageReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  userImport: userImportReducer,
  subjectList: subjectListReducer,
  subjectDetails: subjectDetailsReducer,
  subjectUpdate: subjectUpdateReducer,
  subjectCreate: subjectCreateReducer,
  subjectDelete: subjectDeleteReducer,
  chapterList: chapterListReducer,
  chapterCreate: chapterCreateReducer,
  chapterDetails: chapterDetailsReducer,
  chapterUpdate: chapterUpdateReducer,
  chapterDelete: chapterDeleteReducer,
  questionList: questionListReducer,
  questionCreate: questionCreateReducer,
  questionDetails: questionDetailsReducer,
  questionUpdate: questionUpdateReducer,
  questionDelete: questionDeleteReducer,
  examList: examListReducer,
  examCreate: examCreateReducer,
  examDetails: examDetailsReducer,
  examUpdate: examUpdateReducer,
  examDelete: examDeleteReducer,
  scheduleList: scheduleListReducer,
  scheduleCreate: scheduleCreateReducer,
  scheduleDetails: scheduleDetailsReducer,
  scheduleUpdate: scheduleUpdateReducer,
  scheduleDelete: scheduleDeleteReducer,
  languageChange: changeLanguageReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
