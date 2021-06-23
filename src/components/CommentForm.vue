
<template lang="pl">
    <div>
        <form id="form2" @submit.prevent="onSubmit">
            <h3>Zostaw opinię:</h3>
            <div class="row">
            <div class="input-field inline">
                <label for="title">Tytuł:   </label>
                <input type="text" id="title" class="input-field" v-model.trim="title">
            </div>
            <div class="input-field inline">
                <label for="nick">Autor: </label>
                <input type="text" id="nick" v-model.trim="nick">
            </div>
            <div class="input-field inline">
             <label for="rate">Ocena: </label>
                <input type="number" id="rate" v-model.number="rate" min="1" max="5">
            </div>
            <div class="input-field inline">
              <label for="dateOfVisit">Data wizyty: </label>
              <input type="date" id="dateOfVisit" v-model.date ="dateOfVisit" v-bind="{max : setNow()}">
            </div>
            </div>
            <div class="input-field">
                <label for="content">Opinia: </label>
                <textarea id="content" type="text" v-model.trim="content" max="140"></textarea>
            </div>
            <div class="row">
            
            <div>
            <button class="btn waves-effect waves-light" type="submit">Wyślij<i class="material-icons right">send</i></button>
            </div>
            </div>
        </form>
    </div>
</template>
<script>
import placeService from "@/services/placeService.js";
export default {
  name: "CommentForm",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  emits:['comment-list-changed'],
  data() {
    return {
     
      title: null,
      nick: null,
      content: null,
      rate: null,
      dateOfVisit: null
    };
  },
  methods: {
    setNow(){
      return new Date().toISOString().split("T")[0];

    },
   async  onSubmit() {
      if (!this.title || !this.nick || !this.content || !this.rate || !this.dateOfVisit) {
        alert("Wypełnij poprawnie wszystkie pola formularza.");
      } 
      else
       {
        const params = {
            title: this.title,
            nick: this.nick,
            content: this.content,
            rate: this.rate,
            dateOfVisit: this.dateOfVisit
        }
        await placeService.createCommentforPlace(this.id,params)
        this.$emit('comment-list-changed')
        this.title = null
        this.nick = null
        this.content = null
        this.rate = null
        this.dateOfVisit = null
       }
    }
  }
}
</script>
<style scoped>
#form {
  text-align: left;
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
}
label,
input,
select {
  margin: 2px;
}
</style>
