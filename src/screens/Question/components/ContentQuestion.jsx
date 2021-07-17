import { Button } from '@material-ui/core';
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
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listChapter } from '../../../actions/chapterActions';
import _ from 'lodash';
import {
  createQuestion,
  deleteQuestion,
  importQuestion,
  listQuestion,
  listQuestionDetails,
  updateQuestion,
} from '../../../actions/questionActions';
import { listAllSubjects, listSubjects } from '../../../actions/subjectActions';
import search from '../../../assets/search.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import {
  QUESTION_CREATE_RESET,
  QUESTION_DETAILS_RESET,
  QUESTION_UPDATE_RESET,
} from '../../../constants/questionConstants';
import * as XLSX from 'xlsx';
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  subject: {
    maxWidth: 320,
    textOverflow: 'ellipsis',
  },
  chapter: {
    maxWidth: 320,
    textOverflow: 'ellipsis',
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
            margin: '4px 4px',
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
      fontSize: '0.9375rem',
      textTransform: 'uppercase',
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
  const [subject, setSubject] = useState();
  const [oldSubject, setOldSubject] = useState('');
  const [chapter, setChapter] = useState();
  const [chapterChange, setChapterChange] = useState('');
  const [subjectChange, setSubjectChange] = useState('');
  const [level, setLevel] = useState(0);
  const [a, setA] = useState({});
  const [b, setB] = useState({});
  const [c, setC] = useState({});
  const [d, setD] = useState({});
  const [question, setQuestion] = useState({
    id: '',
    title: '',
    answers: [],
    level: 1,
    result: 1,
    chapter: '',
    user: '',
  });
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(1);

  const l = useSelector((state) => state.languageChange);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subjectListAll = useSelector((state) => state.subjectListAll);
  const { loading: loadingSubjects, error: errorSubjects, subjects: subjectsList } = subjectListAll;

  const chapterList = useSelector((state) => state.chapterList);
  const { loading: loadingChapters, error: errorChapters, chapters: chaptersList } = chapterList;

  const questionList = useSelector((state) => state.questionList);
  const { loading: loadingQuestions, error: errorQuestions, questions: questionsList } = questionList;

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading: loadingDetails, error: errorDetails, question: questionsDetails } = questionDetails;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = questionUpdate;

  const questionCreate = useSelector((state) => state.questionCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = questionCreate;

  const questionDelete = useSelector((state) => state.questionDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = questionDelete;

  const questionImport = useSelector((state) => state.questionImport);
  const { loading: loadingImport, error: errorImport, success: successImport } = questionImport;

  useEffect(() => {
    if (userInfo) {
      dispatch(listAllSubjects());
    } else {
      history.push('/');
    }
    if (!loadingDetails) {
      setQuestion({
        id: questionsDetails.data._id,
        title: questionsDetails.data.title,
        level: questionsDetails.data.level,
        result: questionsDetails.data.result,
      });
      setChapterChange(questionsDetails.data.chapter);
      setA(questionsDetails.data.answers[0]);
      setB(questionsDetails.data.answers[1]);
      setC(questionsDetails.data.answers[2]);
      setD(questionsDetails.data.answers[3]);
      if (successUpdate) {
        dispatch({ type: QUESTION_UPDATE_RESET });
        dispatch(listQuestion(chapter, level, keyword, page));
      }
    }
    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch, questionsDetails, successUpdate]);

  useEffect(() => {
    if (subjectsList && !subject) {
      setSubject(_.get(subjectsList[0], '_id'));
    }
  }, [subjectsList]);

  useEffect(() => {
    if (chaptersList && chaptersList.chapters && !chapter) {
      setChapter(chaptersList.chapters[0]._id);
    } else if (chaptersList && chaptersList.chapters) {
      setChapter(chaptersList.chapters[0]._id);
    }
  }, [chaptersList, subject]);

  useEffect(() => {
    if (chapter) {
      dispatch(listQuestion(chapter, level, keyword, page));
    }
  }, [chapter, dispatch, page, level, keyword]);

  useEffect(() => {
    if (userInfo) {
      if (subject) {
        dispatch(listChapter(subject));
      }
    } else {
      history.push('/');
    }
    if (successCreate && chapter) {
      dispatch(listQuestion(chapter, level, keyword, page));
    }
    if (successDelete && chapter) {
      dispatch(listQuestion(chapter, level, keyword, page));
    }

    if (successImport && chapter) {
      dispatch(listQuestion(chapter, level, keyword, page));
    }

    window.scrollTo(0, 0);
  }, [userInfo, dispatch, subject, successDelete, successCreate, successUpdate, successImport]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(listQuestion(chapter, level, keyword, page));
    } else if (keyword.length === 0) {
      dispatch(listQuestion(chapter, level, keyword, page));
    }
  };

  const handleClickOpenUpdate = (id) => {
    dispatch(listQuestionDetails(id));
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    dispatch({ type: QUESTION_DETAILS_RESET });
    setOpenUpdate(false);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteQuestion(id));
    }
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
    setChapterChange(chapter);
  };
  const handleCloseAdd = () => {
    dispatch({ type: QUESTION_CREATE_RESET });
    setOpenAdd(false);
  };
  const addHandler = (e) => {
    e.preventDefault();
    dispatch(createQuestion({ ...question, chapter: chapterChange, user: userInfo._id, answers: [a, b, c, d] }));
    dispatch({ type: QUESTION_CREATE_RESET });
    // setSubject('');
    // setChapter('');
    setOpenAdd(false);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateQuestion({ ...question, chapter: chapterChange, user: userInfo._id, answers: [a, b, c, d] }));
    setOpenUpdate(false);
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  const uploadFileImportHandler = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = async (event) => {
      const bufferArray = event.target.result;
      const workbook = await XLSX.read(bufferArray, { type: 'binary' });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      console.log(data);
      const questions = [];
      data.map((item) => {
        questions.push({
          title: item.question,
          answers: [{ answer: item.a }, { answer: item.b }, { answer: item.c }, { answer: item.d }],
          level: item.level,
          result: item.result,
          chapter: item.chapter,
          user: userInfo._id,
        });
      });
      console.log(questions);
      dispatch(importQuestion(questions));
    };
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
            <InputLabel htmlFor="outlined-subjects-native-simple">{l.subject}</InputLabel>
            {loadingSubjects ? (
              <Loading />
            ) : errorSubjects ? (
              <Messages severity={'error'} message={errorSubjects} />
            ) : (
              <Select
                native
                value={subject}
                className={classes.subject}
                onChange={(e) => {
                  setOldSubject(subject);
                  setSubject(e.target.value);
                  setSubjectChange(e.target.value);
                }}
                label="Subjects"
                inputProps={{
                  name: 'Subjects',
                  id: 'outlined-subjects-native-simple',
                }}
              >
                {subjectsList && subjectsList.length > 0 &&
                  subjectsList.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </Select>
            )}
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-chapters-native-simple">{l.chapter}</InputLabel>
            {loadingChapters ? (
              <Loading />
            ) : errorChapters ? (
              <Messages severity={'error'} message={errorChapters} />
            ) : (
              <>
                <Select
                  native
                  value={chapter}
                  className={classes.chapter}
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
              </>
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
              <option value={0}>{l.allLevel}</option>
              <option value={1}>{l.easy}</option>
              <option value={2}>{l.normal}</option>
              <option value={3}>{l.hard}</option>
            </Select>
          </FormControl>
          <Button size="large" variant="contained" color="secondary" onClick={() => handleClickOpenAdd()}>
            {l.newQuestion}
          </Button>
          <form className={classes.files} id="uploadForm">
            <input type="file" id="excelFile" onChange={(e) => uploadFileImportHandler(e)} />
            <label for="excelFile">{l.importFile}</label>
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
                  <th>{l.questionName}</th>
                  <th>{l.createdBy}</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {questionsList.questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question.title}</td>
                    <td>{question.user.fullName}</td>
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
          count={questionsList.pages}
          page={page}
          size="large"
          onChange={pageHandler}
        />
      </>

      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title-add"
      >
        <DialogTitle id="form-dialog-title-add">{l.question}</DialogTitle>
        <DialogContent>
          <form onSubmit={addHandler}>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: 36 }}>
              <InputLabel htmlFor="outlined-subjects-native-simple">{l.subject}</InputLabel>
              {loadingSubjects ? (
                <Loading />
              ) : errorSubjects ? (
                <Messages severity={'error'} message={errorSubjects} />
              ) : (
                <Select
                  native
                  value={subjectChange}
                  onChange={(e) => {
                    dispatch(listChapter(e.target.value));
                    setSubjectChange(e.target.value);
                  }}
                  label="Subjects"
                  inputProps={{
                    name: 'Subjects',
                    id: 'outlined-subjects-native-simple',
                  }}
                >
                  {subjectsList && subjectsList.length > 0 &&
                    subjectsList.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: 36 }}>
              <InputLabel htmlFor="outlined-chapters-native-simple">{l.chapter}</InputLabel>
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
            <FormControl variant="outlined" className={classes.formControl} style={{ marginRight: 12 }}>
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
                <option value={1}>{l.easy}</option>
                <option value={2}>{l.normal}</option>
                <option value={3}>{l.hard}</option>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="title"
              label={l.questionName}
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
              onChange={(e) => setA({ answer: e.target.value })}
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
              onChange={(e) => setB({ answer: e.target.value })}
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
              onChange={(e) => setC({ answer: e.target.value })}
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
              onChange={(e) => setD({ answer: e.target.value })}
            />
            <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: 16 }}>
              <InputLabel htmlFor="outlined-Answer-native-simple">{l.answer}</InputLabel>
              <Select
                native
                value={question.result}
                onChange={(e) => {
                  setQuestion({ ...question, result: e.target.value });
                }}
                label={l.answer}
                inputProps={{
                  name: 'Answer',
                  id: 'outlined-Answer-native-simple',
                }}
              >
                <option value={1}>A</option>
                <option value={2}>B</option>
                <option value={3}>C</option>
                <option value={4}>D</option>
              </Select>
            </FormControl>
            <DialogActions>
              <Button type="submit" color="primary" variant="contained">
                {l.add}
              </Button>
              <Button onClick={handleCloseAdd} color="secondary" variant="contained">
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
        <DialogTitle id="form-dialog-title-update">QUESTION</DialogTitle>
        <DialogContent>
          <form onSubmit={updateHandler}>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: 36 }}>
              <InputLabel htmlFor="outlined-subjects-native-simple">{l.subject}</InputLabel>
              {loadingSubjects ? (
                <Loading />
              ) : errorSubjects ? (
                <Messages severity={'error'} message={errorSubjects} />
              ) : (
                <Select
                  native
                  value={subjectChange}
                  onChange={(e) => {
                    dispatch(listChapter(e.target.value));
                    setSubjectChange(e.target.value);
                  }}
                  label="Subjects"
                  inputProps={{
                    name: 'Subjects',
                    id: 'outlined-subjects-native-simple',
                  }}
                >
                  {subjectsList && subjectsList.length > 0 &&
                    subjectsList.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: 36 }}>
              <InputLabel htmlFor="outlined-chapters-native-simple">{l.chapter}</InputLabel>
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
            <FormControl variant="outlined" className={classes.formControl} style={{ marginRight: 12 }}>
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
                <option value={1}>{l.easy}</option>
                <option value={2}>{l.normal}</option>
                <option value={3}>{l.hard}</option>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="title"
              label={l.questionName}
              name="title"
              autoComplete="title"
              required
              multiline
              style={{ width: 550 }}
              onChange={(e) => setQuestion({ ...question, title: e.target.value })}
              value={question.title}
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
              onChange={(e) => setA({ answer: e.target.value })}
              value={a.answer}
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
              onChange={(e) => setB({ answer: e.target.value })}
              value={b.answer}
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
              onChange={(e) => setC({ answer: e.target.value })}
              value={c.answer}
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
              onChange={(e) => setD({ answer: e.target.value })}
              value={d.answer}
            />
            <FormControl variant="outlined" className={classes.formControl} style={{ marginTop: 16 }}>
              <InputLabel htmlFor="outlined-Answer-native-simple">{l.answer}</InputLabel>
              <Select
                native
                value={question.result}
                onChange={(e) => {
                  setQuestion({ ...question, result: e.target.value });
                }}
                label={l.answer}
                inputProps={{
                  name: 'Answer',
                  id: 'outlined-Answer-native-simple',
                }}
              >
                <option value={1}>A</option>
                <option value={2}>B</option>
                <option value={3}>C</option>
                <option value={4}>D</option>
              </Select>
            </FormControl>
            <DialogActions>
              <Button type="submit" color="primary" variant="contained">
                {l.update}
              </Button>
              <Button onClick={handleCloseUpdate} color="secondary" variant="contained">
                {l.cancel}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentQuestion;
