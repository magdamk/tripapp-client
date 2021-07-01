import axios from 'axios'
export class AdminService {
    async getLogin() {
        try {
            const user = await axios.get("https://tripapp-mm.herokuapp.com/api/admin/")
            return user.data;
        } catch (err) { return err.message }
    }
    async postLogin(params) {
        try {
            const user = await axios.post("https://tripapp-mm.herokuapp.com/api/admin/", params)
            return user.data.message;
        } catch (e) {
            return { message: "Nieprawidłowe dane logowania" }
        }
    }
    async onLogout() {
        try {
            const logout = await axios.get("https://tripapp-mm.herokuapp.com/api/logout/")
            return logout.data.message
        } catch (err) { return err.message }
    }
}
const adminService = new AdminService();
export default adminService;