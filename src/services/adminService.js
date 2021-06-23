import axios from 'axios'
//import places from "../data/places.json";
export class AdminService {
    async getLogin() {
        const user = await axios.get("/api/admin/")
            //  console.log('get', user.data)
        return user.data;
    }
    async postLogin(params) {
        try {
            const user = await axios.post("/api/admin/", params)
                //console.log('post', user.data.message)
            return user.data.message;
        } catch (e) {
            return { message: "Nieprawidłowe dane logowania" }
        }
    }
    async onLogout() {
        const logout = await axios.get("/api/logout/")
        return logout.data.message
    }
}

const adminService = new AdminService();

export default adminService;