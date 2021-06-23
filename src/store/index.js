import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        user: undefined
    },
    mutations: {
        authenticate(state, user) {
            state.user = user
        }
    },
    actions: {
        getUser: (state) => { return state.user; },

        async authenticate(context) {
            if (context.state.user === undefined) {
                const res = await axios.get('/api/admin/')
                const user = res.data
                if (user.error === true) {
                    context.commit("authenticate", null);
                } else {
                    context.commit("authenticate", user);
                }
            }
        }
    }
});

export default store