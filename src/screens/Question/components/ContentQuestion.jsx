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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listChapter } from '../../../actions/chapterActions';
import { createQuestion } from '../../../actions/questionActions';
import { listSubjects } from '../../../actions/subjectActions';
import { createUser, deleteUser, listUser, listUserDetails, updateUser } from '../../../actions/userActions';
import search from '../../../assets/search.png';
import User from '../../../assets/user.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import { QUESTION_CREATE_RESET } from '../../../constants/questionConstants';
import { USER_CREATE_RESET, USER_DETAILS_RESET, USER_UPDATE_RESET } from '../../../constants/userConstants';
const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '80px 0 0 265px',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
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
      padding: 11.6,
      backgroundColor: '#3f51b5',
      borderRadius: 3,
      cursor: 'pointer',
      color: '#fff',
      fontSize: 16,
      '&:hover': {
        backgroundColor: '#1e3092',
      },
    },
  },
}));
const ContentQuestion = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = usedStyles();
  const [keyword, setKeyWord] = useState('');
  const [subject, setSubject] = useState('6097a37b4b832e1eec635692');
  const [chapter, setChapter] = useState('');
  const [chapterChange, setChapterChange] = useState('');
  const [subjectChange, setSubjectChange] = useState('');
  const [level, setLevel] = useState(0);
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [question, setQuestion] = useState({
    title: '',
    answers: [],
    level: 1,
    result: 1,
    chapter: '',
    user: '',
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

  const subjectList = useSelector((state) => state.subjectList);
  const { loading: loadingSubjects, error: errorSubjects, subjects: subjectsList } = subjectList;

  const chapterList = useSelector((state) => state.chapterList);
  const { loading: loadingChapters, error: errorChapters, chapters: chaptersList } = chapterList;

  const questionList = useSelector((state) => state.questionList);
  const { loading: loadingQuestions, error: errorQuestions, questions: QuestionsList } = questionList;

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading: loadingDetails, error: errorDetails, question: questionsDetails } = questionDetails;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = questionUpdate;

  const questionCreate = useSelector((state) => state.questionCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = questionCreate;

  const questionDelete = useSelector((state) => state.questionDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = questionDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUser(level, keyword, page));
      dispatch(listSubjects())
    } else {
      history.push('/');
    }
    if (!loadingDetails) {
    //   setUserUpdateInfo({
    //   });
      if (successUpdate) {
        dispatch({
          type: USER_UPDATE_RESET,
        });
      }
    }
    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch,subject, chapter, level, questionDetails, successCreate, page, successDelete, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(listUser(level, keyword, page));
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
    dispatch({ type: QUESTION_CREATE_RESET });
    setOpenAdd(false);
  };
  const addHandler = (e) => {
    e.preventDefault();
    dispatch(createQuestion({...question, chapter: chapterChange, user: userInfo._id, answers: [a,b,c,d]}))
    dispatch({ type: QUESTION_CREATE_RESET });
    setOpenAdd(false);
  };
  useEffect(()=> {
    console.log(question)
  },[addHandler])

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userUpdateInfo));
    dispatch({ type: USER_UPDATE_RESET });
    setOpenUpdate(false);
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  const uploadFileHandler = async (e) => {
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
        <div>
          <form className={classes.search} onSubmit={submitHandler}>
            <div className={classes.searchIcon}>
              <img src={search} alt="search"></img>
            </div>
            <InputBase
              placeholder="Enter Your Search..."
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
            <InputLabel htmlFor="outlined-subjects-native-simple">Subjects</InputLabel>
            {loadingSubjects ? (
              <Loading />
            ) : errorSubjects ? (
              <Messages severity={'error'} message={errorSubjects} />
            ) : (
              <Select
                native
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  dispatch(listChapter(e.target.value))
                  setSubjectChange(e.target.value);
                }}
                label="Subjects"
                inputProps={{
                  name: 'Subjects',
                  id: 'outlined-subjects-native-simple',
                }}
              >
                {subjectsList.subjects.length > 0 &&
                  subjectsList.subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </Select>
            )}
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-chapters-native-simple">Chapters</InputLabel>
            {loadingChapters ? (
              <Loading />
            ) : errorChapters ? (
              <Messages severity={'error'} message={errorChapters} />
            ) : (
              <Select
                native
                value={chapter}
                onChange={(e) => {
                  setChapter(e.target.value);
                  setChapterChange(e.target.value);
                }}
                label="Chapters"
                inputProps={{
                  name: 'Chapters',
                  id: 'outlined-chapters-native-simple',
                }}
              >
                {chaptersList.chapters.length > 0 &&
                  chaptersList.chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.name}
                    </option>
                  ))}
              </Select>
            )}
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-levels-native-simple">Level</InputLabel>
            <Select
              native
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setQuestion({ ...question, role: e.target.value });
              }}
              label="Levels"
              inputProps={{
                name: 'Levels',
                id: 'outlined-levels-native-simple',
              }}
            >
              <option value={0}>All level</option>
              <option value={1}>Easy</option>
              <option value={2}>Normal</option>
              <option value={3}>Hard</option>
            </Select>
          </FormControl>
          <Button size="large" variant="contained" color="secondary" onClick={() => handleClickOpenAdd()}>
            New question
          </Button>
          <form className={classes.files} id="uploadForm" onChange={uploadFileHandler}>
            <input type="file" id="excelFile" />
            <label for="excelFile">IMPORT FILE</label>
          </form>
        </div>
        {loadingQuestions ? (
          <Loading />
        ) : errorQuestions ? (
          <Messages severity={'error'} message={errorQuestions} />
        ) : (
          <div>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>CREATED BY</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {QuestionsList.questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question.title}</td>
                    <td>{question.result}</td>
                    <td>
                      <Link onClick={() => handleClickOpenUpdate(question._id)}>
                        <Button>
                          <EditIcon />
                        </Button>
                      </Link>
                      <Link onClick={() => deleteHandler(question._id)}>
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

        <Pagination
          className={classes.pagination}
          color="primary"
          count={QuestionsList.pages}
          page={QuestionsList.page}
          size="large"
          onChange={pageHandler}
        ></Pagination>
      </>

      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title-add"
      >
        <DialogTitle id="form-dialog-title-add">QUESTION</DialogTitle>
        <DialogContent>
          <form onSubmit={addHandler}>
          <FormControl variant="outlined" className={classes.formControl} style = {{marginRight: 12}}>
            <InputLabel htmlFor="outlined-subjects-native-simple">Subjects</InputLabel>
            {loadingSubjects ? (
              <Loading />
            ) : errorSubjects ? (
              <Messages severity={'error'} message={errorSubjects} />
            ) : (
              <Select
                native
                value={subjectChange}
                onChange={(e) => {
                  dispatch(listChapter(e.target.value))
                  setSubjectChange(e.target.value);
                }}
                label="Subjects"
                inputProps={{
                  name: 'Subjects',
                  id: 'outlined-subjects-native-simple',
                }}
              >
                {subjectsList.subjects.length > 0 &&
                  subjectsList.subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </Select>
            )}
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} style = {{marginRight: 12}}>
            <InputLabel htmlFor="outlined-chapters-native-simple">Chapters</InputLabel>
            {loadingChapters ? (
              <Loading />
            ) : errorChapters ? (
              <Messages severity={'error'} message={errorChapters} />
            ) : (
              <Select
                native
                value={chapterChange}
                onChange={(e) => {
                  setChapterChange(e.target.value);
                }}
                label="Chapters"
                inputProps={{
                  name: 'Chapters',
                  id: 'outlined-chapters-native-simple',
                }}
              >
                {chaptersList.chapters.length > 0 &&
                  chaptersList.chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.name}
                    </option>
                  ))}
              </Select>
            )}
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} style = {{marginRight: 12}}>
            <InputLabel htmlFor="outlined-levels-native-simple">Level</InputLabel>
            <Select
              native
              value={question.level}
              onChange={(e) => {
                setQuestion({ ...question, level: e.target.value });
              }}
              label="Levels"
              inputProps={{
                name: 'Levels',
                id: 'outlined-levels-native-simple',
              }}
            >
              <option value={1}>Easy</option>
              <option value={2}>Normal</option>
              <option value={3}>Hard</option>
            </Select>
          </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              required
              multiline
              style={{ width: 550 }}
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="a"
              label="A"
              name="a"
              autoComplete="a"
              required
              multiline
              style={{ width: 550 }}
              onChange={(e) => setA(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="b"
              label="B"
              name="b"
              required
              multiline
              style={{ width: 550 }}
              onChange={(e) => setB(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="c"
              label="C"
              name="c"
              required
              multiline
              style={{ width: 550 }}
              onChange={(e) => setC(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="d"
              label="D"
              name="d"
              required
              multiline
              style={{ width: 550 }}
              onChange={(e) => setD(e.target.value)}
            />
            <FormControl variant="outlined" className={classes.formControl} style = {{marginTop: 16}}>
            <InputLabel htmlFor="outlined-Answer-native-simple">Answer</InputLabel>
            <Select
              native
              value={question.result}
              onChange={(e) => {
                setQuestion({ ...question, result: e.target.value });
              }}
              label="Answer"
              inputProps={{
                name: 'Answer',
                id: 'outlined-Answer-native-simple',
              }}
            >
              <option value={1}>A</option>
              <option value={2}>B</option>
              <option value={3}>C</option>
              <option value={3}>D</option>
            </Select>
          </FormControl>
            <DialogActions>
              <Button type="submit" color="primary" variant="contained">
                Add
              </Button>
              <Button onClick={handleCloseAdd} color="secondary" variant="contained">
                Cancel
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
        <DialogTitle id="form-dialog-title-update">USER</DialogTitle>
        <DialogContent>
          {loadingDetails ? (
            <Loading />
          ) : errorDetails ? (
            <Messages severity={'error'} message={errorDetails} />
          ) : (
            <form onSubmit={updateHandler}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-roles-native-simple">Roles</InputLabel>
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
                  <option value={1}>Admin</option>
                  <option value={2}>Teacher</option>
                  <option value={3}>Student</option>
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
                  <option value={true}>Male</option>
                  <option value={false}>Female</option>
                </Select>
              </FormControl>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue={userUpdateInfo.birthday}
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
                label="Code"
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
                label="Full name"
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
                label="Phone"
                name="phone"
                type="number"
                autoComplete="phone"
                required
                style={{ width: 500 }}
                onChange={(e) => setUserUpdateInfo({ ...userUpdateInfo, phone: e.target.value })}
              />
              <Avatar style={{ width: 75, height: 75, marginTop: 4 }} alt="avatar" src={userUpdateInfo.avatar} />
              <DialogActions style={{ margin: '0 16px 16px 0' }}>
                <Button type="submit" color="primary" variant="contained">
                  Update
                </Button>
                <Button onClick={handleCloseUpdate} color="secondary" variant="contained">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentQuestion;
