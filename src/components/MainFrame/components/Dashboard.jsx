import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/Inbox'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ListAltIcon from '@material-ui/icons/ListAlt'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import ScheduleIcon from '@material-ui/icons/Schedule'
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide'
import dashboardAction from '../../../mocks/dashboardAction.js'
import { Link } from 'react-router-dom'
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
    width: '100%',
    '& span': {
      fontSize: 18,
      fontWeight: '500',
      color: '#666',
    },
  },
}))
const Dashboard = () => {
  const classes = usedStyles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.user}>
          <img
            src='https://weandthecolor.com/wp-content/uploads/2019/03/1-Vans-illustrations-by-Leo-Natsume-696x684.jpg'
            alt='avatar'
          />
          <h3>Pham Toan</h3>
          <h2>position</h2>
        </div>
        <div className={classes.dashboard}>
          <List component='nav'>
            {dashboardAction.map((action, index) => (
              <ListItem key={index}>
                <Link to={action.link} className={classes.action}>
                  {/* <ListItemIcon>
                    <{action.icon.toString()}/>
                  </ListItemIcon> */}
                  <ListItemText primary={action.title} />
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
