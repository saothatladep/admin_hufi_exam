import React from 'react'
import { useSelector } from 'react-redux'
import MainFrame from '../../components/MainFrame/Index'
import ContentSubject from './components/ContentSubject'

const Subject = (props) => {
  const { history } = props
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <MainFrame />
          <ContentSubject history={history} />
        </>
      )}
    </div>
  )
}

export default Subject
