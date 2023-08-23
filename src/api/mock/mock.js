import Mock from 'mockjs'
import list from './taskbasicilist.json'
import orederlist from './taskorderlist.json'
import questionlist from './questionlist.json'
import enroll from './enroll.json'
import questionresult from './questionresult.json'
import formresult from './formresult.json'
import roll from './roll.json'
import reviewslist from './reviewslist'
import login from './login.json'
import sharecenter from './sharecenter.json'
//任务中心
Mock.mock('/api/task/list' ,list)
//领取任务
Mock.mock('/api/task/enroll/', 'post' , enroll)
//我的任务
Mock.mock('/api/order/user/11' ,orederlist)
//问卷渲染
Mock.mock('/api/survey/show/128',questionlist)
//问卷结果回显
Mock.mock('/api/survey/result/135',questionresult)
//表单结果回显
Mock.mock('/api/bug/show/11',formresult)
//荣誉榜
Mock.mock('/api/user/ranking',roll)
//反馈中心
Mock.mock('/api/feedback/list/11',reviewslist)
//登录
Mock.mock('/api/user/login',login)

Mock.mock('/api/bug/save', 'post' ,login)
//分享中心
Mock.mock('/api/shares/list', sharecenter)

