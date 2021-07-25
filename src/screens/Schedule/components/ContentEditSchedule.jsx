import DateFnsUtils from '@date-io/date-fns';
import { Avatar, Button, IconButton, InputAdornment, InputBase, InputLabel, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { fade, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import RemoveIcon from '@material-ui/icons/Remove';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import { Pagination } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listExam } from '../../../actions/examActions';
import { listScheduleDetails, updateSchedule } from '../../../actions/scheduleActions';
import { listUser } from '../../../actions/userActions';
import search from '../../../assets/search.png';
import User from '../../../assets/user.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import { SCHEDULE_DETAILS_RESET, SCHEDULE_UPDATE_RESET } from '../../../constants/scheduleConstants';
const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '74px 0 0 265px',
    backgroundColor: '#fff',
    width: 1254,
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
  studentSource: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  name: {
    width: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonAdd: {
    margin: '0 0 24px 0',
  },
  chooseOption: {
    margin: '24px 0',
  },
  time: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  question: {},
}));
const ContentEditSchedule = (props) => {
  const { history, match } = props;
  const classes = usedStyles();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [studentsAdd, setStudentsAdd] = useState([]);
  const [schedule, setSchedule] = useState({
    id: '',
    name: '',
    timeStart: new Date(),
    timeEnd: new Date(),
    time: '',
    exam: '',
    attendants: [],
    status: true,
    user: '',
  });

  const l = useSelector((state) => state.languageChange);

  const [changeTime, setChangeTime] = useState(true);

  const scheduleId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users: UsersList } = userList;

  const examList = useSelector((state) => state.examList);
  const { loading: loadingExams, error: errorExams, exams: examsList } = examList;

  const scheduleUpdate = useSelector((state) => state.scheduleUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = scheduleUpdate;

  const scheduleDetails = useSelector((state) => state.scheduleDetails);
  const { loading: loadingDetails, error: errorDetails, schedule: schedulesDetails } = scheduleDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.role === 2) {
      history.push('/subject');
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listExam('', ''));
    } else {
      history.push('/');
    }
    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch]);

  useEffect(() => {
    dispatch(listUser(3, keyword, page));
  }, [dispatch, keyword, page]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SCHEDULE_UPDATE_RESET });
      dispatch({ type: SCHEDULE_DETAILS_RESET });
      history.push('/schedule');
    }

    if (!loadingDetails) {
      setSchedule({
        timeStart: schedulesDetails.data.timeStart,
        timeEnd: schedulesDetails.data.timeEnd,
        time: schedulesDetails.data.time,
        exam: schedulesDetails.data.exam._id,
        name: schedulesDetails.data.name,
        attendants: schedulesDetails.data.attendants,
        status: schedulesDetails.data.status,
      });
      setStudentsAdd(schedulesDetails.data.attendants);
    }

    window.scrollTo(0, 0);
  }, [dispatch, history, schedulesDetails.data, successUpdate]);

  useEffect(() => {
    console.log(schedule.timeEnd);
    console.log(schedule.timeStart);
    if (schedule.timeEnd >= schedule.timeStart) {
      const diff = schedule.timeEnd - schedule.timeStart;
      setSchedule({ ...schedule, time: Math.floor(diff / 60000) });
    } else {
      setSchedule({ ...schedule, time: 0 });
    }
  }, [changeTime]);

  const updateScheduleHandler = (e) => {
    e.preventDefault();
    const data = [];
    studentsAdd.map((question) => data.push(question._id));
    dispatch(updateSchedule({ ...schedule, id: scheduleId, attendants: data, user: userInfo._id }));
  };

  const handleClickAdd = (student) => {
    const data = [...studentsAdd];
    const studentExists = (id) => {
      return data.some((el) => {
        return el._id === id;
      });
    };
    if (studentExists(student._id)) {
      alert('Student has been added');
    } else {
      data.push(student);
      setStudentsAdd(data);
    }
  };

  const handleClickRemove = (student) => {
    const data = [...studentsAdd];
    setStudentsAdd(data.filter((item) => item._id !== student._id));
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(listScheduleDetails(scheduleId));
  }, [scheduleId]);

  return (
    <>
      {loadingExams ? (
        <Loading />
      ) : errorExams ? (
        <Messages severity={'error'} message={errorExams} />
      ) : (
        <form onSubmit={updateScheduleHandler} className={classes.root}>
          <div className={classes.name}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="schedule"
              label={l.scheduleName}
              name="schedule"
              autoComplete="schedule"
              value={schedule.name}
              required
              multiline
              onChange={(e) => setSchedule({ ...schedule, name: e.target.value })}
              style={{ width: 550 }}
            />
            <FormControl component="fieldset">
              <FormControlLabel
                control={
                  <Switch
                    checked={schedule.status}
                    onChange={(e) => setSchedule({ ...schedule, status: e.target.checked })}
                    name="status"
                    color="primary"
                  />
                }
                label={l.status}
              />
            </FormControl>
          </div>
          <div className={classes.chooseOption}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-exams-native-simple">{l.examName}</InputLabel>

              <Select
                native
                value={schedule.exam}
                onChange={(e) => {
                  setSchedule({ ...schedule, exam: e.target.value });
                }}
                label="Exams"
                inputProps={{
                  name: 'Exams',
                  id: 'outlined-Exams-native-simple',
                }}
              >
                {examsList.exams.length > 0 &&
                  examsList.exams.map((exam) => (
                    <option key={exam._id} value={exam._id}>
                      {exam.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </div>

          <form className={classes.time}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label={l.timeStart}
                inputVariant="outlined"
                value={schedule.timeStart}
                disablePast
                ampm={false}
                style={{ width: 225 }}
                format="dd/MM/yyyy - HH:mm"
                onChange={(e) => {
                  setSchedule({ ...schedule, timeStart: e });
                  const toggle = changeTime;
                  setChangeTime(!toggle);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <AlarmIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <DateTimePicker
                label={l.timeEnd}
                inputVariant="outlined"
                value={schedule.timeEnd}
                disablePast
                ampm={false}
                style={{ width: 225 }}
                format="dd/MM/yyyy - HH:mm"
                onChange={(e) => {
                  setSchedule({ ...schedule, timeEnd: e });
                  const toggle = changeTime;
                  setChangeTime(!toggle);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <AlarmIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              disabled
              value={schedule.time}
              style={{ width: 100 }}
              id="outlined-basic"
              label={l.time}
              variant="outlined"
            />
          </form>

          <div className={classes.question}>
            <div className={classes.studentSource}>
              <form className={classes.search}>
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
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </form>
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
                            <Avatar style={{ margin: '0 auto' }} src={user.avatar ? user.avatar : User} alt="avatar" />
                          </td>
                          <td>{user.code}</td>
                          <td>{user.fullName}</td>
                          <td>{user.gender ? l.male : l.female}</td>
                          <td>{moment(user.birthday).format('DD/MM/YYYY')}</td>
                          <td>
                            <Link onClick={() => handleClickAdd(user)}>
                              <Button>
                                <AddIcon />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <Pagination
                className={classes.pagination}
                color="primary"
                count={UsersList.pages}
                page={page}
                size="large"
                onChange={pageHandler}
              />
            </div>

            <div className={classes.questionAdd}>
              <div>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th>{l.no}</th>
                      <th>{l.avatar}</th>
                      <th>{l.code}</th>
                      <th>{l.fullName}</th>
                      <th>{l.gender}</th>
                      <th>{l.birthday}</th>
                      <th></th>
                    </tr>
                  </thead>
                  {studentsAdd.map((user, index) => {
                    return (
                      <tbody>
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>
                            <Avatar style={{ margin: '0 auto' }} src={user.avatar ? user.avatar : User} alt="avatar" />
                          </td>
                          <td>{user.code}</td>
                          <td>{user.fullName}</td>
                          <td>{user.gender ? l.male : l.female}</td>
                          <td>{moment(user.birthday).format('DD/MM/YYYY')}</td>{' '}
                          <td>
                            <Link onClick={() => handleClickRemove(user)}>
                              <Button>
                                <RemoveIcon />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>

          <Button className={classes.buttonAdd} type="submit" color="primary" variant="contained">
            <UpdateOutlinedIcon />
            {l.update}
          </Button>
        </form>
      )}
    </>
  );
};

export default ContentEditSchedule;
