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
  userUpdatePasswordReducer,
} from './reducers/userReducers';
import {
  subjectListReducer,
  subjectListAllReducer,
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
  chapterListAllReducer,
} from './reducers/chapterReducers';
import {
  questionListReducer,
  questionCreateReducer,
  questionDetailsReducer,
  questionUpdateReducer,
  questionDeleteReducer,
  questionImportReducer,
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
  scheduleListAllReducer,
  scheduleCreateReducer,
  scheduleDetailsReducer,
  scheduleUpdateReducer,
  scheduleDeleteReducer,
} from './reducers/scheduleReducers';
import { changeLanguageReducer } from './reducers/languageReducer';
import { resultListReducer, resultListAllReducer } from './reducers/resultReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  userImport: userImportReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  subjectList: subjectListReducer,
  subjectListAll: subjectListAllReducer,
  subjectDetails: subjectDetailsReducer,
  subjectUpdate: subjectUpdateReducer,
  subjectCreate: subjectCreateReducer,
  subjectDelete: subjectDeleteReducer,
  chapterList: chapterListReducer,
  chapterListAll: chapterListAllReducer,
  chapterCreate: chapterCreateReducer,
  chapterDetails: chapterDetailsReducer,
  chapterUpdate: chapterUpdateReducer,
  chapterDelete: chapterDeleteReducer,
  questionList: questionListReducer,
  questionCreate: questionCreateReducer,
  questionDetails: questionDetailsReducer,
  questionUpdate: questionUpdateReducer,
  questionDelete: questionDeleteReducer,
  questionImport: questionImportReducer,
  examList: examListReducer,
  examCreate: examCreateReducer,
  examDetails: examDetailsReducer,
  examUpdate: examUpdateReducer,
  examDelete: examDeleteReducer,
  scheduleList: scheduleListReducer,
  scheduleListAll: scheduleListAllReducer,
  scheduleCreate: scheduleCreateReducer,
  scheduleDetails: scheduleDetailsReducer,
  scheduleUpdate: scheduleUpdateReducer,
  scheduleDelete: scheduleDeleteReducer,
  languageChange: changeLanguageReducer,
  resultList: resultListReducer,
  resultListAll: resultListAllReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
