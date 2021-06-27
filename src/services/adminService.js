import axios from 'axios'

export class AdminService {
    async getLogin() {
        try {
            const user = await axios.get("http://localhost:3000/api/admin/")
                //  console.log('get', user.data)
            return user.data;
        } catch (err) { return err.message }
    }
    async postLogin(params) {
        try {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            const user = await axios.post("http://localhost:3000/api/admin/", params)
                //console.log('post', user.data.message)
            return user.data.message;
        } catch (e) {
            console.log('Mam cię!')
            return { message: "Nieprawidłowe dane logowania" }
        }
    }
    async onLogout() {
        try {
            const logout = await axios.get("http://localhost:3000/api/logout/")
            return logout.data.message
        } catch (err) { return err.message }
    }
}

const adminService = new AdminService();

export default adminService;