import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./components/Home.vue')
        },
        {
            path: '/lexer',
            component: () => import('./components/Lexer.vue')
        }
    ]
})