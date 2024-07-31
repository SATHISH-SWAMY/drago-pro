import { lazy } from 'react';


const Main = lazy(() => import('../pages/Main'));
const Emails = lazy(() => import('../components/Emails'));
const ViewEmails = lazy(() => import('../components/ViewEmail'));
const signin = lazy(() => import('../signin/Signin'))
const register = lazy(() => import('../signin/Register'))



const routes ={
    main:{
        path: '/',
        element: Main
    },
    signin:{
        path: '/signin',
        element: signin
    },
    register:{
        path: '/register',
        element: register
    },
    emails:{
        path:'/emails',
        element: Emails
    },
    view: {
        path: '/view',
        element:ViewEmails
    },
    invalid:{
        path:'/*',
        element: Emails
    },
   
}


export  {routes};