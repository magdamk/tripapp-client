import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/About.vue"),
    },
    {
        path: "/places",
        name: "Places",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/Places.vue"),
    },
    {
        path: "/places/:placeId",
        name: "Place",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/Place.vue"),
    },
    {
        path: "/login/",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/Login.vue"),
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;