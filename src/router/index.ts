import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import UserCreate from '@/components/UserCreate.vue';
 



const routes: RouteRecordRaw[] = [
    
    {

        path:'/tasks',
       // alias: "/tasks",
        name: 'tasks',
        component: () => import('@/components/TaskList.vue'),
     
    },

    {

        path:'/tasks/new',
        name: 'tasks-new',
        component: () => import('@/components/TaskForm.vue'),
        
    },

    {
        
        path:'/Principal',
        alias: "/Principal",
        name: 'Pagina-Principal',
        component: () => import('@/components/PaginaPrincipal.vue'),
        meta: { requiresAuth: true },
        
    },

    {

        path:'/TaskListTecnico',
        name: 'Task-List-Tecnico',
        component: () => import('@/components/TaskListTecnico.vue'),
        
    },

    {

        path:'/TaskListSupervisor',
        name: 'Task-List-Supervisor',
        component: () => import('@/components/TaskListSupervisor.vue'),
        
    },


    {

        path:'/tasks/:id',
        name: 'task-details',
        component: () => import('@/components/TaskDetail.vue'),
        
    },

    {

        path:'/visit/:id',
        name: 'visit-details',
        component: () => import('@/components/VisitDetail.vue'),
        
    },

    {
        path:'/visitPlanificacion/:id',
        name: 'visit-planificacion',
        component: () => import('@/components/VisitPlanification.vue'),
        
    },

    {
        path:'/PlanningBoard',
        name: 'Planning-Board',
        component: () => import('@/components/PlanningBoard.vue'),
        
    },

    {
        path:'/ClientReporting',
        name: 'Client-Reporting',
        component: () => import('@/components/ClientReporting.vue'),
        
    },

    {
        path: '/UserCreate',
        name: 'user-create',
        component: () => import('@/components/UserCreate.vue'),
        
    },

    {
        path: '/',
        alias: "/Login",
        name: 'log-in',
        component: () => import('@/components/LoginUser.vue'),
        meta: { hideNavbar: true },
    },

    {

        path:'/user',
       // alias: "/tasks",
        name: 'users',
        component: () => import('@/components/UserManagement.vue'),

    }, 

    {

        path:'/users/:id',
        name: 'user-details',
        component: () => import('@/components/UserDetail.vue'),
        
    },
 

    {

        path:'/GoogleMap',
        name: 'Google-Map',
        component: () => import('@/components/GoogleMap.vue'),
        
    },

];

const router  = createRouter({
  
    history: createWebHistory(),
    routes,

});

export default router;