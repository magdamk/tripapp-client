import { createRouter, createWebHashHistory } from "vue-router";
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
            import ( /* webpackChunkName: "places" */ "@/views/Places.vue"),
    },
    {
        path: "/places/:placeId",
        name: "Place",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "place" */ "@/views/Place.vue"),
    },
    {
        path: "/places/edit/:placeId",
        name: "EditPlace",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "place" */ "@/views/EditPlace.vue"),
    },
    {
        path: "/login/",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ "@/views/Login.vue"),
    },
    {
        path: "/addPlace/",
        name: "AddPlace",
        component: () =>
            import ( /* webpackChunkName: "addplace" */ "@/views/AddPlace.vue")
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () =>
            import ( /* webpackChunkName: "notfound" */ "@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;