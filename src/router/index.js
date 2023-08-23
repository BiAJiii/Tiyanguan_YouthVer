import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeVue from '../views/Home.vue'
import TaskList from '../views/TaskList.vue'
import User from '../views/User.vue'
import MyTask from '../views/MyTask.vue'
import FeedBack from '../views/FeedBack.vue'
import QuestionFeedback from '../views/QuestionFeedback.vue'
import QuestionResult from '../views/QuestionResult.vue'
import FormResult from '../views/FormResult.vue'
import HonorRoll from '../views/HonorRoll.vue'
import ReviewsCenter from '../views/ReviewsCenter.vue'
import Login from '../views/MyLogin.vue'
import Main from '../views/Main.vue'
import ShareCenter from '../views/ShareCenter.vue'
import CreditsCenter from '../views/CreditsCenter.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: Main,
        name: 'Main',
        redirect:'/login',
        children: [
            { path: '/home', name: 'home', component: HomeVue }, 
            { path: '/tasklist', name: 'tasklist', component: TaskList }, 
            { path: '/user', name: 'user', component: User }, 
            { path: '/mytask', name: 'mytask', component: MyTask},
            { path:'/feedback', name:'feedback',component: FeedBack},
            { path:'/questionfeedback', name:'questionfeedback',component: QuestionFeedback},
            { path:'/questionresult', name:'questionresult',component: QuestionResult},
            { path:'/formresult', name:'formresult',component: FormResult},
            { path:'/honorroll', name:'honorroll',component: HonorRoll},
            { path:'/reviewscenter', name:'reviewscenter',component: ReviewsCenter},
            { path:'/sharescenter', name:'sharescenter',component: ShareCenter},
            { path:'/creditscenter', name:'creditscenter',component: CreditsCenter},
        ]
    },
    
    { path: '/login', name:'login', component: Login},
 

]


const router = new VueRouter({
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}
export default router