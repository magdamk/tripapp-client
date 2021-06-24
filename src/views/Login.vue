<template lang="pl">
    <div>
        <h3>Strona dla administratorów</h3>
        <p>{{message}}</p>
        <div v-if="username" >
            <h4>Witaj {{username.split("@")[0]}}</h4>
            <form  @submit.prevent="onLogout" >
            <button class="btn waves-effect waves-light" type="submit" @submit="onLogout">Wyloguj<i class="material-icons right">send</i></button>
            </form>
        </div>
        <div v-else>
        <form @submit.prevent="onSubmit" style="margin:auto;width:50%;padding: 10px;" >
            <h5>Zaloguj się</h5>
          <div class="col s4">
            <div class="input-field-inline">
                <label for="email">Email</label>
                <input type="email" id="email" class="input-field" v-model.email="email">
            </div>
            <div class="input-field-inline">
                <label for="password">Hasło</label>
                <input type="password" id="password" v-model.password="password">
            </div>
            <div>
            <button class="btn waves-effect waves-light" type="submit" @submit="onSubmit">Zaloguj<i class="material-icons right">send</i></button>
            </div>
            </div>
        </form>
        </div>
    </div>
</template>
<script>

import adminService from "@/services/adminService.js";
export default {
    name: 'login',
    data(){
        return {
            user: '',
            message: ''
        }
    },
    computed: {
        username () {
        return this.$store.state.user
            }
    },
    methods: {
        async onSubmit(){
            if (!this.email || !this.password) {
                alert("Wypełnij poprawnie wszystkie pola formularza.");
            } 
            else{
            const params = {
                email: this.email,
                password: this.password
            }
            const result = await adminService.postLogin(params);
            //console.log(result)
            if (result.message==="Nieprawidłowe dane logowania") {
                this.message= result.message
                this.user = null
                this.email = null
                this.password = null
            } else {
                    this.user = result
                    this.$store.commit("authenticate", result);
                    this.message = ''
            }
        }
        },    
        async onLogout(){
            this.message = await adminService.onLogout();
            this.$store.commit("authenticate", null);
            this.user = null
            this.email = null
            this.password = null
        }
    }


};
</script>
<style></style>
