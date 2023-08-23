export default {
    state: {
        //我的任务查看表单回显的id，id
        formId:window.sessionStorage.getItem('formId'),
        //查看对应任务的统计表
        checkId: window.sessionStorage.getItem('checkId'),
        //前往对应任务的反馈页面的id,taskid
        todoId: window.sessionStorage.getItem('todoId'),
        //提交问卷反馈时的id,orderid
        quesFeedbackId: window.sessionStorage.getItem('quesFeedbackId'),
        //userid
        userId:window.sessionStorage.getItem('userId'),
        //已领任务id
        gottenId:[],
        //tabbar的actvie
        // active: 0
        credits:window.sessionStorage.getItem('credits') === null?0:window.sessionStorage.getItem('credits'),
        userName:window.sessionStorage.getItem('userName'),
        timeStamp: window.localStorage.getItem('stamp') 

        
    },
    mutations:{
        formId_submit(state, val){
            state.formId= val
            sessionStorage.setItem('formId',val)
        },
        //添加时间戳
        timeStamp_add(state,val){
            // let a = val
            // let b = a.toString()
            // let c =JSON.parse(b)
            // console.log(c)
            // console.log(val)
            // console.log(state.timeStamp)
            state.timeStamp = {...state.timeStamp, ...val}
            // console.log(JSON.stringify(state.timeStamp))
            localStorage.setItem('stamp',JSON.stringify(state.timeStamp))
        },

        checkId_submit(state,val) {
            state.checkId = val
            sessionStorage.setItem('checkId',val)
        },
        todoId_submit(state,val) {
            state.todoId = val
            sessionStorage.setItem('todoId',val)
            
        },
        quesFeedbackId_submit(state, val) {
            state.quesFeedbackId = val
            sessionStorage.setItem('queFeedbackId',val)
        },
        userId_submit(state, val){
            state.userId = val
            sessionStorage.setItem('userId',val)
        },
        gottenId_take(state, val){
            state.gottenId.push(val)
        },
        // active_submit(state, val){
        //     state.active = val
        // }
        userName_submit(state, val) {
            state.userName = val
            sessionStorage.setItem('userName',val)
        },
        userCredits_submit(state, val) {
            state.credits = val
            sessionStorage.setItem('userCredits',val)
        }
    }
}