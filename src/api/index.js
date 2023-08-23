import http from '../utils/request'

//获取用户信息
export const Login = (data) => {
    return http.post('/user/login', data)
}

//任务列表请求渲染
export const getData = (rank) => {
    return http.get('/task/' + rank)
}
//领取任务
export const takeTaskApi = (data) => {
    return http.post('/task/enroll/', data)
}

//我的任务列表请求渲染
export const orderTaskApi = (rank) => {
    return http.get('/order/user/' + rank)
}

//问卷任务渲染
export const getQuestionList = (id) => {
    return http.get('/survey/show/' + id)
}
//问卷结果回显请求
// export const getQuestionResult = (id) => {
//     return http.get('survey/result/' + id)
// }
//表单结果回显
export const getFormResult = (id) => {
    return http.get('/bug/show/' + id)
}

//问卷结果回显请求
export const getResult = (id) => {
    return http.get('/survey/result/' + id)
}
//荣誉榜数据请求
export const getRoll = () => {
    return http.get('/user/ranking')
}
//提交问卷数据
export const submitQuestionFeekback= (data) => {
    return http.post('/survey/submit', data)
}
//提交表单数据
export const submitFormFeekback= (data) => {
    return http.post('/bug/save', data)
}
//提交快速反馈
export const submitReview = (data) => {
    return http.post('/feedback/save', data)
}
//查看反馈中心
export const getReviewList = (id) => {
    return http.get('/feedback/list/' + id)
}
//反馈中心点赞
export const likeIt = (data) => {
    return http.post('feedback/likes', data)
}
//标签检索
export const searchTags = (data) => {
    return http.post('feedback/tags', data)
}
//请求用户信息
export const getUserInfo = (id) => {
    return http.get('/user/info/' + id)
}
//上传图片
export const uploadImgs = (params) => {
    return http.post('/file/upload', params)
}

export const getShareCenter = () =>  {
    return http.get('/shares/list')
}