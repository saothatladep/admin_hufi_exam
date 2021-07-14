import { Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Subject from '../../../assets/action/book.png';
import Chapter from '../../../assets/action/chapter.png';
import Question from '../../../assets/action/question.png';
import Result from '../../../assets/action/result.png';
import Schedule from '../../../assets/action/schedule.png';
import User from '../../../assets/action/user.png';
import Exam from '../../../assets/action/exam.png';

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
      margin: '4px 0 0 22px',
      textTransform: 'uppercase',
      fontSize: 22,
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
  avatar: {
    width: 100,
    height: 100,
    '& img': {
      width: 100,
    },
  },
}));
const Dashboard = (props) => {
  const classes = usedStyles();
  const { location } = props;
  let path = location.pathname.slice(1);

  const userLogin = useSelector((state) => state.userLogin);
  const l = useSelector((state) => state.languageChange);
  const { userInfo } = userLogin;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.user}>
          <Avatar className={classes.avatar} src={userInfo.avatar} alt="avatar" />
          <h3>{userInfo.fullName}</h3>
          <h2>{userInfo.role === 1 ? l.admin : l.teacher}</h2>
        </div>
        <div className={classes.dashboard}>
          <List component="nav">
            <ListItem>
              <Link to={'/user'} className={classes.action} style={path === 'user' ? { background: '#3f51b5' } : {}}>
                <img src={User} alt="User" />
                <ListItemText primary={l.user} className={path === 'user' ? classes.click : ''} />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/subject'}
                className={classes.action}
                style={path === 'subject' ? { background: '#3f51b5' } : {}}
              >
                <img src={Subject} alt="Subject" />
                <ListItemText className={path === 'subject' ? classes.click : ''} primary={l.subject} />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/chapter'}
                className={classes.action}
                style={path === 'chapter' ? { background: '#3f51b5' } : {}}
              >
                <img src={Chapter} alt="Chapter" />
                <ListItemText primary={l.chapter} className={path === 'chapter' ? classes.click : ''} />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/question'}
                className={classes.action}
                style={path === 'question' ? { background: '#3f51b5' } : {}}
              >
                <img src={Question} alt="Question" />
                <ListItemText primary={l.question} className={path === 'question' ? classes.click : ''} />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/exam'}
                className={classes.action}
                style={path.slice(0, 4) === 'exam' ? { background: '#3f51b5' } : {}}
              >
                <img src={Exam} alt="Exam" />
                <ListItemText primary={l.exam} className={path.slice(0, 4) === 'exam' ? classes.click : ''} />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/schedule'}
                className={classes.action}
                style={path.slice(0, 8) === 'schedule' ? { background: '#3f51b5' } : {}}
              >
                <img src={Schedule} alt="Schedule" />
                <ListItemText primary={l.schedule} className={path.slice(0, 8) === 'schedule' ? classes.click : ''} />
              </Link>
            </ListItem>

            <ListItem>
              <Link
                to={'/result'}
                className={classes.action}
                style={path === 'result' ? { background: '#3f51b5' } : {}}
              >
                <img src={Result} alt="Result" />
                <ListItemText primary={l.result} className={path === 'result' ? classes.click : ''} />
              </Link>
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
