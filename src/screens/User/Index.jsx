import React from 'react'
import { useSelector } from 'react-redux'
import MainFrame from '../../components/MainFrame/Index'
import ContentUser from './components/ContentUser'

const User = (props) => {
  const { history, location } = props
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <MainFrame location={location} />
          <ContentUser history={history} location={location} />
        </>
      )}
    </div>
  )
}

export default User
