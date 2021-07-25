import { Button, FormControl, InputLabel, Select } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import ReactExport from 'react-data-export';
import axios from 'axios';
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import search from '../../../assets/search.png';
import moment from 'moment';
import { listAllSchedule } from '../../../actions/scheduleActions';
import { listAllResult, listResult } from '../../../actions/resultActions';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '74px 0 0 265px',
    backgroundColor: '#fff',
    width: 1271,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
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
  export: {
    margin: '24px',
    padding: '12px',
    borderRadius: 3,
    color: '#fff',
    background: '#3f51b5',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: '#293a96',
    },
  },
  pagination: {
    marginBottom: 24,
  },
}));
const ContentResult = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = usedStyles();
  const [page, setPage] = useState(1);
  const [schedule, setSchedule] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const scheduleListAll = useSelector((state) => state.scheduleListAll);
  const { loading: loadingSchedulesAll, error: errorSchedulesAll, schedules: schedulesListAll } = scheduleListAll;

  const l = useSelector((state) => state.languageChange);

  useEffect(() => {
    if (userInfo) {
      dispatch(listAllSchedule());
    } else {
      history.push('/');
    }
    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch]);

  useEffect(() => {
    if (schedulesListAll && schedulesListAll.length > 0) {
      setSchedule(schedulesListAll[0]._id);
    }
  }, [schedulesListAll]);

  useEffect(() => {
    if (schedule) {
      dispatch(listResult(schedule, page));
      dispatch(listAllResult(schedule));
    }
  }, [dispatch, schedule, page]);

  const pageHandler = (e, page) => {
    setPage(page);
  };

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  return (
    <div className={classes.root}>
      <>
        <div className={classes.action}>
          <ExcelFile
            element={
              <button className={classes.export}>
                <InsertDriveFileIcon />
                {l.exportResult}
              </button>
            }
          >
            {/* <ExcelSheet data={chaptersListAll} name="chapter-list">
              <ExcelColumn label="ID chapter" value="_id" />
              <ExcelColumn label="Chapter name" value="name" />
            </ExcelSheet> */}
          </ExcelFile>
        </div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-subjects-native-simple">{l.schedule}</InputLabel>
          {loadingSchedulesAll ? (
            <Loading />
          ) : errorSchedulesAll ? (
            <Messages severity={'error'} message={errorSchedulesAll} />
          ) : (
            <Select
              native
              value={schedule}
              className={classes.subject}
              onChange={(e) => {
                setSchedule(e.target.value);
              }}
              label="Schedules"
              inputProps={{
                name: 'Schedules',
                id: 'outlined-schedules-native-simple',
              }}
            >
              {schedulesListAll &&
                schedulesListAll.length > 0 &&
                schedulesListAll.map((schedule) => (
                  <option key={schedule._id} value={schedule._id}>
                    {schedule.name}
                  </option>
                ))}
            </Select>
          )}
        </FormControl>
        <div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>TEST NAME</th>
                <th>CREATED BY</th>
                <th>CREATED DATE</th>
              </tr>
            </thead>

            <tbody>
              <tr key={''}>
                <td>{''}</td>
                <td>{''}</td>
                <td>{''}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
          className={classes.pagination}
          color="primary"
          // count={UsersList.pages}
          // page={UsersList.page}
          size="large"
          onChange={pageHandler}
        />
      </>
    </div>
  );
};

export default ContentResult;
