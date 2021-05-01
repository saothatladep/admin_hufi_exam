import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../actions/userActions'
import logo from '../../../assets/logo1.png'
import { useDispatch, useSelector } from 'react-redux'

const usedStyles = makeStyles((theme) => ({
  root: {
    height: 76,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  nav: {
    backgroundColor: '#001935',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 48px',
    '& img': {
      width: 70,
      padding: '8px 0',
    },
    '& svg': {
      color: '#fff',
      fontSize: 32,
    },
  },
  action: {
    width: 125,
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
const Navbar = () => {
  const classes = usedStyles()

  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(logout())
  }
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.nav}>
          <Link to={'/subject'}>
            <img src={logo} alt='logo' />
          </Link>
          <div className={classes.action}>
            <Link to={''}>
              <AccountCircle />
            </Link>
            <Link to={''}>
              <NotificationsIcon />
            </Link>
            <Link to={'/'} onClick={logOutHandler}>
              <ExitToAppIcon />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
