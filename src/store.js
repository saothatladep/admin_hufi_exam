import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userCreateReducer,
  userDeleteReducer,
} from './reducers/userReducers'
import {
  subjectListReducer,
  subjectDetailsReducer,
  subjectUpdateReducer,
  subjectCreateReducer,
  subjectDeleteReducer,
} from './reducers/subjectReducers'
import {
  chapterListReducer,
  chapterCreateReducer,
  chapterDetailsReducer,
  chapterUpdateReducer,
  chapterDeleteReducer,
} from './reducers/chapterReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
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
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
