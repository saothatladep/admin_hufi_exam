import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserPassword } from '../../actions/userActions';
import MainFrame from '../../components/MainFrame/Index';
import Messages from '../../components/Messages';
import Meta from '../../components/Meta';
import { USER_UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '74px 0 0 265px',
    backgroundColor: '#fff',
    width: 1270,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h1': {
      textTransform: 'uppercase',
    },
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& input': {
      color: '#ff5200',
      fontWeight: 600,
      width: 500,
    },
  },
  password: {
    padding: '8px 12px',
    margin: '12px 0 18px 0',
    fontSize: 14,
    color: '#fff',
  },
  divide: {
    width: 530,
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatarFile: {
    padding: '24px 0 16px 0',
    textTransform: 'uppercase',
    '& input': {
      display: 'none',
    },
    '& label': {
      padding: 12,
      backgroundColor: '#ff8a0c',
      borderRadius: 3,
      cursor: 'pointer',
      color: '#fff',
      fontSize: 14,
      '&:hover': {
        backgroundColor: '#d67002',
      },
    },
  },
}));
const Information = (props) => {
  const classes = usedStyles();
  const dispatch = useDispatch();
  const { location, history } = props;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading, error, success } = userUpdatePassword;

  const l = useSelector((state) => state.languageChange);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [changePassword, setChangePassword] = useState({
    _id: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      if (success) {
        setOpenUpdate(false);
        dispatch({ type: USER_UPDATE_PASSWORD_RESET });
        setMessage('');
        setChangePassword({
          _id: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        dispatch(logout());
      } else if (error) {
        setMessage('Change password failed');
      }
    }
    window.scrollTo(0, 0);
    // window.location.reload(false);
  }, [dispatch, history, userInfo, success, error]);

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserPassword({ _id: userInfo._id, newPassword: changePassword.newPassword }));
    }
  };

  const handleCloseAdd = () => {
    setOpenUpdate(false);
    setMessage('');
  };
  const openChangePassword = () => {
    setOpenUpdate(true);
  };
  return (
    <div>
      {!userInfo ? (
        ''
      ) : (
        <>
          <Meta title={`TonTon | ${l.personalInfo}`} />
          <MainFrame location={location} />
          <div className={classes.root}>
            <h1>{l.personalInfo}</h1>
            <div className={classes.info}>
              <Avatar style={{ width: 75, height: 75, marginTop: 4 }} alt="avatar" src={userInfo.avatar} />
              <div className={classes.divide}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={moment(userInfo.birthday).format('DD/MM/YYYY')}
                  id="birthday"
                  label={l.birthday}
                  name="birthday"
                  disabled
                  required
                  style={{ width: 250 }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={userInfo.gender ? l.male : l.female}
                  id="gender"
                  label={l.gender}
                  name="gender"
                  disabled
                  required
                  style={{ width: 250 }}
                />
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userInfo.code}
                id="code"
                label={l.code}
                name="code"
                disabled
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userInfo.fullName}
                id="name"
                label={l.fullName}
                name="name"
                disabled
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userInfo.email}
                id="email"
                label="Email"
                name="email"
                type="email"
                disabled
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userInfo.phone}
                id="phone"
                label={l.phone}
                name="phone"
                disabled
                required
              />
              <Button color="primary" variant="contained" onClick={openChangePassword} className={classes.password}>
                {l.changePassword}
              </Button>
            </div>
          </div>
          <Dialog
            open={openUpdate}
            onClose={handleCloseAdd}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="form-dialog-title-add"
            // style={{ maxWidth: 546 }}
          >
            {message && <Messages severity={'warning'} message={message} />}
            <DialogTitle id="form-dialog-title-add">{l.changePassword}</DialogTitle>
            <DialogContent style={{ maxWidth: 548 }}>
              <form onSubmit={updatePasswordHandler}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="password"
                  id="password"
                  label={l.newPassword}
                  name="password"
                  required
                  onChange={(e) => {
                    setChangePassword({ ...changePassword, newPassword: e.target.value });
                    setMessage('');
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="password"
                  id="confirmPassword"
                  label={l.confirmPassword}
                  name="confirmPassword"
                  required
                  style={{ width: 500 }}
                  onChange={(e) => {
                    setChangePassword({ ...changePassword, confirmPassword: e.target.value });
                    setMessage('');
                  }}
                />
                <DialogActions className={classes.dialog}>
                  <Button type="submit" color="primary" variant="contained">
                    {l.update}
                  </Button>
                  <Button onClick={handleCloseAdd} color="secondary" variant="contained">
                    {l.cancel}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Information;
