import { Avatar, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import { Pagination } from '@material-ui/lab';
import 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import {
  createUser,
  deleteUser,
  importUser,
  listUser,
  listUserDetails,
  updateUser,
} from '../../../actions/userActions';
import axiosClient from '../../../api/axiosClient.js';
import search from '../../../assets/search.png';
import User from '../../../assets/user.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import { USER_CREATE_RESET, USER_DETAILS_RESET, USER_UPDATE_RESET } from '../../../constants/userConstants';
const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '55px 0 0 265px',
    backgroundColor: '#fff',
    width: 1270,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    position: 'relative',
    backgroundColor: fade('#666', 0.3),
    '&:hover': {
      boxShadow: '0 1px 6px rgb(32 33 36 / 40%)',
      borderColor: 'rgba(223,225,229,0)',
    },
    marginRight: theme.spacing(2),
    margin: '24px',
    width: '500px',
    height: '40px',
    '& img': {
      width: 25,
    },
    borderRadius: 50,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: 25,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1.4, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: 440,
    height: '100%',
    fontSize: 16,
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
  },
  formControl: {
    height: 40,
    margin: '0 0 16px 0',
    '& select': {
      height: 20,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      color: '#666',
      minWidth: 100,
    },
    '& label': {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 12,
    },
  },
  table: {
    width: 1200,
    border: '1px solid #3f51b5',
    margin: 24,
    '& thead': {
      fontSize: 16,
      fontWeight: '600',
      backgroundColor: '#3f51b5',
      color: '#fff',
      '& th': {
        fontWeight: 600,
        padding: '16px 27px',
        borderSpacing: '0px',
      },
    },
    '& tbody': {
      '& td': {
        padding: '17px 10px !important',
        textAlign: 'center',
        borderTop: '1px solid #3f51b5',
        borderLeft: '1px solid #3f51b5',
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        '& img': {
          width: 40,
          borderRadius: 50,
        },
        '& svg': {
          fontSize: 30,
          fontWeight: '600',
        },
        '& a': {
          textDecoration: 'none',
          '& button': {
            padding: '4px 4px',
            backgroundColor: '#3f51b5',
            fontSize: 12,
            color: '#fff',
            border: '1px solid #3f51b5',
            marginLeft: 4,
            '& svg': {
              fontSize: 24,
            },
            '&:hover': {
              backgroundColor: '#fff',
              color: '#3f51b5',
            },
          },
        },
      },
    },
  },
  pagination: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    padding: '16px 24px 0 24px',
    '& h2': {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3f51b5',
    },
  },
  files: {
    '& input': {
      display: 'none',
    },
    '& label': {
      padding: 10,
      backgroundColor: '#3f51b5',
      borderRadius: 3,
      cursor: 'pointer',
      color: '#fff',
      fontSize: '0.9375rem',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#1e3092',
      },
    },
  },
  avatarFile: {
    position: 'relative',
    top: -65,
    left: 0,
    '& input': {
      display: 'none',
    },
    '& label': {
      padding: 11.6,
      backgroundColor: '#ff8a0c',
      borderRadius: 3,
      cursor: 'pointer',
      color: '#fff',
      fontSize: 16,
      '&:hover': {
        backgroundColor: '#d67002',
      },
    },
  },
  avatarFileUpdate: {
    position: 'relative',
    top: -65,
    left: 30,
    '& input': {
      display: 'none',
    },
    '& label': {
      padding: 11.6,
      backgroundColor: '#ff8a0c',
      borderRadius: 3,
      cursor: 'pointer',
      color: '#fff',
      fontSize: 16,
      '&:hover': {
        backgroundColor: '#d67002',
      },
    },
  },
  birthday: {
    margin: '0 0 12px 12px',
    '& input': {
      height: 27,
    },
    '& label': {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
}));
const ContentUser = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = usedStyles();
  const [keyword, setKeyWord] = useState('');
  const [role, setRole] = useState(1);
  const [userAdd, setUserAdd] = useState({
    role: role,
    gender: true,
    fullName: '',
    email: '',
    phone: '',
    code: '',
    birthday: '',
    password: '',
    avatar: User,
  });
  const [userUpdateInfo, setUserUpdateInfo] = useState({
    _id: '',
    role: '',
    gender: '',
    fullName: '',
    email: '',
    phone: '',
    code: '',
    birthday: '',
    avatar: '',
  });
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const l = useSelector((state) => state.languageChange);

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users: UsersList } = userList;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user: usersDetails } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const userCreate = useSelector((state) => state.userCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = userCreate;

  const userImport = useSelector((state) => state.userImport);
  const { loading: loadingImport, error: errorImport, success: successImport } = userImport;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo.role === 2) {
      history.push('/subject');
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listUser(role, keyword, page));
    } else {
      history.push('/');
    }
    if (!loadingDetails) {
      setUserUpdateInfo({
        _id: usersDetails.data._id,
        role: usersDetails.data.role,
        gender: usersDetails.data.gender,
        fullName: usersDetails.data.fullName,
        email: usersDetails.data.email,
        phone: usersDetails.data.phone,
        code: usersDetails.data.code,
        birthday: usersDetails.data.birthday,
        avatar: usersDetails.data.avatar,
      });
      console.log(userUpdateInfo);
      if (successUpdate) {
        dispatch({
          type: USER_UPDATE_RESET,
        });
      }
    }
    window.scrollTo(0, 0);
  }, [
    userInfo,
    history,
    dispatch,
    role,
    userDetails,
    successCreate,
    page,
    successDelete,
    successUpdate,
    keyword,
    successImport,
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(`image`, file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axiosClient.post('/api/upload', formData, config);

      setUserAdd({ ...userAdd, avatar: data });
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFileUpdateHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append(`image`, file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axiosClient.post('/api/upload', formData, config);

      setUserUpdateInfo({ ...userUpdateInfo, avatar: data });
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(listUser(role, keyword, page));
    } else if (keyword.length === 0) {
      window.location.reload();
    }
  };

  const handleClickOpenUpdate = (id) => {
    dispatch(listUserDetails(id));
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    dispatch({ type: USER_DETAILS_RESET });
    setOpenUpdate(false);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    dispatch({ type: USER_CREATE_RESET });
    setOpenAdd(false);
  };
  const addHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(userAdd));
    dispatch({ type: USER_CREATE_RESET });
    setOpenAdd(false);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userUpdateInfo));
    dispatch({ type: USER_UPDATE_RESET });
    setOpenUpdate(false);
  };

  const uploadFileImportHandler = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = async (event) => {
      const bufferArray = event.target.result;
      const workbook = await XLSX.read(bufferArray, { type: 'binary', cellDates: true, dateNF: 'yyyy/mm/dd' });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      console.log(data);
      dispatch(importUser(data));
    };
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  return (
    <div className={classes.root}>
      <>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Messages severity={'error'} message={errorUpdate} />}
        {loadingCreate && <Loading />}
        {errorCreate && <Messages severity={'error'} message={errorCreate} />}
        {loadingDelete && <Loading />}
        {errorDelete && <Messages severity={'error'} message={errorDelete} />}
        {loadingImport && <Loading />}
        {errorImport && <Messages severity={'error'} message={errorImport} />}
        <div>
          <form className={classes.search} onSubmit={submitHandler}>
            <div className={classes.searchIcon}>
              <img src={search} alt="search"></img>
            </div>
            <InputBase
              placeholder={l.search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              autoFocus
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </form>
        </div>
        <div className={classes.action}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-roles-native-simple">{l.roles}</InputLabel>

            <Select
              native
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setUserAdd({ ...userAdd, role: e.target.value });
              }}
              label="Roles"
              inputProps={{
                name: 'Roles',
                id: 'outlined-roles-native-simple',
              }}
            >
              <option value={1}>{l.admin}</option>
              <option value={2}>{l.teacher}</option>
              <option value={3}>{l.student}</option>
            </Select>
          </FormControl>
          <Button
            style={{ padding: '8px 12px' }}
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => handleClickOpenAdd()}
          >
            <AddCircleIcon /> {l.newUser}
          </Button>
          <form className={classes.files} id="uploadForm">
            <input type="file" id="excelFile" onChange={(e) => uploadFileImportHandler(e)} />
            <label for="excelFile">
              <InsertDriveFileIcon />
              {l.importFile}
            </label>
          </form>
        </div>
        {loadingUsers ? (
          <Loading />
        ) : errorUsers ? (
          <Messages severity={'error'} message={errorUsers} />
        ) : (
          <div>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>{l.avatar}</th>
                  <th>{l.code}</th>
                  <th>{l.fullName}</th>
                  <th>{l.gender}</th>
                  <th>{l.birthday}</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {UsersList.users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {/* {user.avatar} */}
                      <Avatar style={{ margin: '0 auto' }} src={user.avatar ? `${user.avatar}` : User} alt="avatar" />
                    </td>
                    <td>{user.code}</td>
                    <td>{user.fullName}</td>
                    <td>{user.gender ? l.male : l.female}</td>
                    <td>{moment(user.birthday).format('DD/MM/YYYY')}</td>
                    <td>
                      <Link onClick={() => handleClickOpenUpdate(user._id)}>
                        <Button>
                          <EditIcon />
                        </Button>
                      </Link>
                      <Link onClick={() => deleteHandler(user._id)}>
                        <Button>
                          <DeleteIcon />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {UsersList && (
          <Pagination
            className={classes.pagination}
            color="primary"
            count={UsersList.pages}
            page={UsersList.page}
            size="large"
            onChange={pageHandler}
          />
        )}
      </>

      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title-add"
      >
        <DialogTitle id="form-dialog-title-add">{l.user}</DialogTitle>
        <DialogContent style={{ maxWidth: 548 }}>
          <form onSubmit={addHandler}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-roles-native-simple">{l.roles}</InputLabel>
              <Select
                native
                value={userAdd.role}
                onChange={(e) => setUserAdd({ ...userAdd, role: e.target.value })}
                label="Roles"
                inputProps={{
                  name: 'Roles',
                  id: 'outlined-roles-native-simple',
                }}
              >
                <option value={1}>{l.admin}</option>
                <option value={2}>{l.teacher}</option>
                <option value={3}>{l.student}</option>
              </Select>
            </FormControl>
            <FormControl style={{ marginLeft: 12 }} variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-roles-native-simple">{l.gender}</InputLabel>
              <Select
                native
                value={userAdd.gender}
                onChange={(e) => setUserAdd({ ...userAdd, gender: e.target.value })}
                label="Gender"
                inputProps={{
                  name: 'Gender',
                  id: 'outlined-genders-native-simple',
                }}
              >
                <option value={true}>{l.male}</option>
                <option value={false}>{l.female}</option>
              </Select>
            </FormControl>
            <TextField
              id="date"
              label={l.birthday}
              type="date"
              required
              autoFocus
              className={classes.birthday}
              onChange={(e) => setUserAdd({ ...userAdd, birthday: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="code"
              label={l.code}
              name="code"
              autoComplete="code"
              required
              style={{ width: 500 }}
              onChange={(e) => setUserAdd({ ...userAdd, code: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label={l.fullName}
              name="name"
              autoComplete="name"
              required
              style={{ width: 500 }}
              onChange={(e) => setUserAdd({ ...userAdd, fullName: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              style={{ width: 500 }}
              onChange={(e) => setUserAdd({ ...userAdd, email: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="phone"
              label={l.phone}
              name="phone"
              type="number"
              autoComplete="phone"
              required
              style={{ width: 500 }}
              onChange={(e) => setUserAdd({ ...userAdd, phone: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label={l.password}
              name="password"
              type="password"
              autoComplete="password"
              required
              style={{ width: 500 }}
              onChange={(e) => setUserAdd({ ...userAdd, password: e.target.value })}
            />
            <Avatar style={{ width: 75, height: 75, marginTop: 4 }} alt="avatar" src={userAdd.avatar} />
            <DialogActions>
              <form className={classes.avatarFile} id="uploadForm1" onChange={uploadFileHandler}>
                <input type="file" id="imgFile" />
                <label for="imgFile">
                  <PhotoCameraOutlinedIcon style={{ margin: '0 0 -7px 0', paddingRight: 4 }} />
                  {l.importAvatar}
                </label>
              </form>
              <Button type="submit" color="primary" variant="contained">
                <AddCircleOutlineIcon />
                {l.add}
              </Button>
              <Button onClick={handleCloseAdd} color="secondary" variant="contained">
                <CancelOutlinedIcon />
                {l.cancel}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title-update"
      >
        <DialogTitle id="form-dialog-title-update">{l.user}</DialogTitle>
        <DialogContent style={{ maxWidth: 548 }}>
          {loadingDetails ? (
            <Loading />
          ) : errorDetails ? (
            <Messages severity={'error'} message={errorDetails} />
          ) : (
            <form onSubmit={updateHandler}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-roles-native-simple">{l.roles}</InputLabel>
                <Select
                  native
                  value={userUpdateInfo.role}
                  onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, role: e.target.value })}
                  label="Roles"
                  inputProps={{
                    name: 'Roles',
                    id: 'outlined-roles-native-simple',
                  }}
                >
                  <option value={1}>{l.admin}</option>
                  <option value={2}>{l.teacher}</option>
                  <option value={3}>{l.student}</option>
                </Select>
              </FormControl>
              <FormControl style={{ marginLeft: 12 }} variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-roles-native-simple">Gender</InputLabel>
                <Select
                  native
                  value={userUpdateInfo.gender}
                  onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, gender: e.target.value })}
                  label="Gender"
                  inputProps={{
                    name: 'Gender',
                    id: 'outlined-genders-native-simple',
                  }}
                >
                  <option value={true}>{l.male}</option>
                  <option value={false}>{l.female}</option>
                </Select>
              </FormControl>
              <TextField
                id="date"
                label={l.birthday}
                type="date"
                value={userUpdateInfo.birthday}
                required
                className={classes.birthday}
                onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, birthday: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userUpdateInfo.code}
                id="code"
                label={l.code}
                name="code"
                autoComplete="code"
                required
                style={{ width: 500 }}
                onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, code: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userUpdateInfo.fullName}
                id="name"
                label={l.fullName}
                name="name"
                autoComplete="name"
                required
                style={{ width: 500 }}
                onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, fullName: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userUpdateInfo.email}
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={{ width: 500 }}
                onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, email: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={userUpdateInfo.phone}
                id="phone"
                label={l.phone}
                name="phone"
                type="number"
                autoComplete="phone"
                required
                style={{ width: 500 }}
                onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, phone: e.target.value })}
              />
              <Avatar style={{ width: 75, height: 75, marginTop: 4 }} alt="avatar" src={userUpdateInfo.avatar} />
              <DialogActions>
                <form className={classes.avatarFileUpdate} id="uploadForm2" onChange={uploadFileUpdateHandler}>
                  <input type="file" id="imgFile" />
                  <label for="imgFile">
                    <PhotoCameraOutlinedIcon style={{ margin: '0 0 -7px 0', paddingRight: 4 }} />
                    {l.importAvatar}
                  </label>
                </form>
                <Button type="submit" color="primary" variant="contained">
                  <UpdateOutlinedIcon />
                  {l.update}
                </Button>
                <Button onClick={handleCloseUpdate} color="secondary" variant="contained">
                  <CancelOutlinedIcon />
                  {l.cancel}
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentUser;
