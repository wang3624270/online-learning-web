import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/homepage';
import Helloworld from '@/components/helloworld';
import MenuManage from '@/components/manage/menu';
import GroupManage from '@/components/manage/group';
import PersonManage from '@/components/manage/person';
import CourseManage from '@/components/course/courseManage';
import ResourceManage from '@/components/course/resourceManage';
import TermManage from '@/components/course/term';
import TeachTackManage from '@/components/course/teachTackManage';
import CourseStudy from '@/components/course/courseStudy';
import CourseDetail from '@/components/course/courseStudy/courseDetail.vue';
import VideoStudy from '@/components/player/videoPlayer';
import LectureManage from '@/components/lecture/lectureManage';
import EntryManage from '@/components/lecture/entryManage';
import AttendanceManage from '@/components/lecture/attendanceManage';
import LecturePreview from '@/components/lecture/lecturePreview';
import EntriedLecture from '@/components/lecture/entried';
import DiscussPreview from '@/components/lecture/discussPreview';
import FinishLecture from '@/components/lecture/finish';
import CoursePreview from '@/components/course/coursePreview';
import Lecture from '@/components/course/lecturePreview';
import MeetingPreview from '@/components/course/meetingPreview';
import ExamManage from '@/components/exam/examManage';
import PracticeManage from '@/components/exam/practiceManage';
import QuestionManage from '@/components/exam/questionManage';
import QuestionExam from '@/components/exam/examManage/question';
import QuestionPractice from '@/components/exam/practiceManage/question';
import UnfinishedExam from '@/components/exam/unfinishedExam';
import FinishedExam from '@/components/exam/finishedExam';
import TeachTackMaintain from '@/components/course/teachTackMaintain';

Vue.use(Router);
//懒加载
const Framepage = resolve => require(['@/components/framepage'], resolve);
const Studypage = resolve => require(['@/components/player'], resolve);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: Homepage
        },
        {
            path: '/index',
            component: Framepage,
            children: [
                {
                    path: '',
                    name: 'helloworld',
                    component: Helloworld
                },
                {
                    path: '/index/manage/menu',
                    name: 'menuManage',
                    component: MenuManage
                },
                {
                    path: '/index/manage/group',
                    name: 'groupManage',
                    component: GroupManage
                },
                {
                    path: '/index/manage/person',
                    name: 'personManage',
                    component: PersonManage
                },
                {
                    path: '/index/course/courseManage',
                    name: 'courseManage',
                    component: CourseManage
                },
                {
                    path: '/index/course/resourceManage',
                    name: 'resourceManage',
                    component: ResourceManage
                },
                {
                    path: '/index/course/term',
                    name: 'termManage',
                    component: TermManage
                },
                {
                    path: '/index/course/teachTackManage',
                    name: 'teachTackManage',
                    component: TeachTackManage
                },
                {
                    path: '/index/course/courseStudy',
                    name: 'courseStudy',
                    component: CourseStudy
                },
                {
                    path: '/index/course/courseDetail',
                    name: 'courseDetail',
                    component: CourseDetail
                },
                {
                    path: '/index/lecture/manage',
                    name: 'lectureManage',
                    component: LectureManage
                },
                {
                    path: '/index/lecture/entry',
                    name: 'entryManage',
                    component: EntryManage
                },
                {
                    path: '/index/lecture/attendance',
                    name: 'attendanceManage',
                    component: AttendanceManage
                },
                {
                    path: '/index/lecture/lecturePreview',
                    name: 'lecturePreview',
                    component: LecturePreview
                },
                {
                    path: '/index/lecture/entried',
                    name: 'entriedLecture',
                    component: EntriedLecture
                },
                {
                    path: '/index/lecture/discussPreview',
                    name: 'discussPreview',
                    component: DiscussPreview
                },
                {
                    path: '/index/lecture/finish',
                    name: 'finishLecture',
                    component: FinishLecture
                },
                {
                    path: '/index/course/coursePreview',
                    name: 'coursePreview',
                    component: CoursePreview
                },
                {
                    path: '/index/course/lecturePreview',
                    name: 'lecture',
                    component: Lecture
                },
                {
                    path: '/index/course/meetingPreview',
                    name: 'meetingPreview',
                    component: MeetingPreview
                },
                {
                    path: '/index/exam/examManage',
                    name: 'examManage',
                    component: ExamManage
                },
                {
                    path: '/index/exam/practiceManage',
                    name: 'practiceManage',
                    component: PracticeManage
                },
                {
                    path: '/index/exam/questionManage',
                    name: 'questionManage',
                    component: QuestionManage
                },
                {
                    path: '/index/exam/questionExam',
                    name: 'questionExam',
                    component: QuestionExam
                },
                {
                    path: '/index/exam/questionPractice',
                    name: 'questionPractice',
                    component: QuestionPractice
                },
                {
                    path: '/index/exam/unfinishedExam',
                    name: 'unfinishedExam',
                    component: UnfinishedExam
                },
                {
                    path: '/index/exam/finishedExam',
                    name: 'finishedExam',
                    component: FinishedExam
                },
                {
                    path: '/index/course/teachTackMaintain',
                    name: 'teachTackMaintain',
                    component: TeachTackMaintain
                }
            ]
        },
        {
            path: '/study',
            name: 'studypage',
            component: Studypage,
            children: [
                {
                    path: '/study/videoStudy',
                    name: 'videoStudy',
                    component: VideoStudy
                },
            ]
        },
        {
            path:'*',
            redirect:'/index'
        }
    ]
})
