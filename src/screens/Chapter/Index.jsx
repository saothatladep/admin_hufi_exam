import React from 'react'
import { useSelector } from 'react-redux'
import MainFrame from '../../components/MainFrame/Index'
import ContentChapter from './components/ContentChapter'

const Chapter = (props) => {
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
          <ContentChapter history={history} location={location} />
        </>
      )}
    </div>
  )
}

export default Chapter
