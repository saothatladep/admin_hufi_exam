import { ENGLISH, VIETNAMESE } from '../constants/languageConstants';

const vietnamese = {
  vietnamese: 'Tiếng Việt',
  english: 'Tiếng Anh',
  search: 'Nhập tìm kiếm của bạn ...',
  roles: 'Vị trí',
  user: 'Người dùng',
  subject: 'Môn học',
  chapter: 'Chương',
  question: 'Câu hỏi',
  exam: 'Đề thi',
  schedule: 'Lịch thi',
  result: 'kết quả',
  admin: 'Quản trị viên',
  teacher: 'Giáo viên',
  student: 'Học sinh',
  newUser: 'Thêm người dùng mới',
  importFile: 'Nhập file',
  avatar: 'Ảnh đại diện',
  code: 'Mã ID',
  fullName: 'Họ tên',
  gender: 'Giới tính',
  birthday: 'Ngày sinh',
  phone: 'SĐT',
  importAvatar: 'Nhập ảnh đại diện',
  update: 'cập nhật',
  cancel: 'Huỷ',
  male: 'Nam',
  female: 'Nữ',
  password: 'Mật khẩu',
  add: 'Thêm',
  newSubject: 'Thêm môn học mới',
  createdBy: 'Được tạo bởi',
  createdDate: 'Ngày tạo',
  subjectName: 'Tên môn học',
  chapterName: 'Tên chương',
  newChapter: 'Thêm chương mới',
  newQuestion: 'Thêm câu hỏi mới',
  level: 'Cấp độ',
  allLevel: 'Tất cả cấp độ',
  easy: 'Dễ',
  normal: 'Trung bình',
  hard: 'Khó',
  questionName: 'Tên câu hỏi',
  answer: 'Đáp án',
  newExam: 'Thêm đề thi mới',
  examName: 'Tên đề thi',
  status: 'Trạng thái',
  active: 'Hoạt động',
  nonActive: 'Không hoạt động',
  no: 'STT',
  scheduleName: 'Tên lịch thi',
  newSchedule: 'Thêm lịch thi mới',
  time: 'Thời gian',
  timeStart: 'thời gian bắt đầu',
  timeEnd: 'thời gian kết thúc',
  exportChapter: 'Xuất danh sách chương',
};

export const changeLanguageReducer = (state = {}, action) => {
  switch (action.type) {
    case VIETNAMESE:
      return vietnamese;
    case ENGLISH:
      return {
        vietnamese: 'Vietnamese',
        english: 'English',
        search: 'Enter your search ...',
        roles: 'Roles',
        user: 'User',
        subject: 'Subject',
        chapter: 'Chapter',
        question: 'Question',
        exam: 'Exam',
        schedule: 'Schedule',
        result: 'Result',
        admin: 'Admin',
        teacher: 'Teacher',
        student: 'Student',
        newUser: 'New user',
        importFile: 'Import file',
        avatar: 'Avatar',
        code: 'ID',
        fullName: 'Full name',
        gender: 'Gender',
        birthday: 'Birthday',
        phone: 'Phone',
        importAvatar: 'Import avatar',
        update: 'Update',
        cancel: 'Cancel',
        male: 'Male',
        female: 'Female',
        password: 'Password',
        add: 'Add',
        newSubject: 'New subject',
        createdBy: 'Created by',
        createdDate: 'Created date',
        subjectName: 'Subject name',
        chapterName: 'chapter name',
        newChapter: 'New chapter',
        newQuestion: 'Thêm câu hỏi mới',
        level: 'Level',
        allLevel: 'All level',
        easy: 'Easy',
        normal: 'Normal',
        hard: 'Hard',
        questionName: 'Question name',
        answer: 'Answer',
        newExam: 'Thêm đề thi mới',
        examName: 'Exam name',
        status: 'Status',
        active: 'Active',
        nonActive: 'Nonactive',
        no: 'No',
        scheduleName: 'Schedule name',
        newSchedule: 'New schedule',
        time: 'Time',
        timeStart: 'Time start',
        timeEnd: 'Time end',
        exportChapter: 'Export list chapters',
      };
    default:
      return vietnamese;
  }
};
