import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import User from '../../../assets/action/user.png'
import Subject from '../../../assets/action/book.png'
import Chapter from '../../../assets/action/chapter.png'
import Question from '../../../assets/action/question.png'
import Schedule from '../../../assets/action/schedule.png'
import Result from '../../../assets/action/result.png'

const usedStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    top: 74,
    backgroundColor: '#fff',
    minWidth: 255,
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: 70,
      borderRadius: 50,
    },
    '& h2': {
      margin: '0',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.334,
      letterSpacing: -0.05,
      color: 'rgb(107, 119, 140)',
    },
    '& h3': {
      margin: '4px 0 0 0',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.334,
      letterSpacing: -0.05,
      color: 'rgb(23, 43, 77)',
    },
    '&::after': {
      content: '""',
      width: '100%',
      height: 2,
      backgroundColor: '#f3f3f3',
      marginTop: 24,
    },
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& nav': {
      width: '100%',
    },
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    borderRadius: '10px',
    width: '100%',
    '& span': {
      fontSize: 24,
      fontWeight: '600',
      color: '#111',
      margin: '0 0 0 24px',
      textTransform: 'uppercase',
    },
    '& img': {
      width: 30,
      marginLeft: 18,
    },
    '&:hover': {
      backgroundColor: '#3f51b5',
      '& span': {
        color: '#fff',
      },
    },
  },
  click: {
    '& span': {
      color: '#fff',
    },
  },
}))
const Dashboard = (props) => {
  const classes = usedStyles()
  const { location } = props
  let path = location.pathname.slice(1)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.user}>
          <img src={userInfo.avatar} alt='avatar' />
          <h3>{userInfo.fullName}</h3>
          <h2>{userInfo.role === 1 ? 'Admin' : 'Teacher'}</h2>
        </div>
        <div className={classes.dashboard}>
          <List component='nav'>
            <ListItem>
              <Link
                to={'/user'}
                className={classes.action}
                style={path === 'user' ? { background: '#3f51b5' } : {}}
              >
                <img src={User} alt='User' />
                <ListItemText
                  primary='User'
                  className={path === 'user' ? classes.click : ''}
                />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/subject'}
                className={classes.action}
                style={path === 'subject' ? { background: '#3f51b5' } : {}}
              >
                <img src={Subject} alt='Subject' />
                <ListItemText
                  className={path === 'subject' ? classes.click : ''}
                  primary='Subject'
                />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/chapter'}
                className={classes.action}
                style={path === 'chapter' ? { background: '#3f51b5' } : {}}
              >
                <img src={Chapter} alt='Chapter' />
                <ListItemText
                  primary='Chapter'
                  className={path === 'chapter' ? classes.click : ''}
                />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/question'}
                className={classes.action}
                style={path === 'question' ? { background: '#3f51b5' } : {}}
              >
                <img src={Question} alt='Question' />
                <ListItemText
                  primary='Question'
                  className={path === 'question' ? classes.click : ''}
                />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/schedule'}
                className={classes.action}
                style={path === 'schedule' ? { background: '#3f51b5' } : {}}
              >
                <img src={Schedule} alt='Schedule' />
                <ListItemText
                  primary='Schedule'
                  className={path === 'schedule' ? classes.click : ''}
                />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/result'}
                className={classes.action}
                style={path === 'result' ? { background: '#3f51b5' } : {}}
              >
                <img src={Result} alt='Result' />
                <ListItemText
                  primary='Result'
                  className={path === 'result' ? classes.click : ''}
                />
              </Link>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
