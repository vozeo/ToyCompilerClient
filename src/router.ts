import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: () => import('./components/Home.vue')
        },
        {
            name: 'Lexer',
            path: '/lexer',
            component: () => import('./components/Lexer.vue')
        }
    ]
})