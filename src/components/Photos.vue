<template lang="pl">
    <br/>
    <div v-if="$store.state.user">
    <form id="form2" @submit.prevent="addPhotoForPlace" style="margin-left:20px;margin-right:20px;">
            <h4>Dodaj url zdjęcia:</h4>
           
            <div class="input-field">
                <label for="url">url:   </label>
                <input type="text" id="url" class="input-field" v-model.trim="url">
            </div>
            <button @click="addPhotoForPlace(placeId)"  class="btn waves-effect waves-light blue" type="submit">Dodaj zdjęcie<i class="material-icons right">photo</i></button>
    <br/>
    <hr/>        
    </form>
    </div>
    <p v-show="!photos.length">Brak zdjęć</p>
    <div v-for="photo in photos" v-bind:key="photo._id">
        <div class="box">
        <img v-bind:src="photo.url" />
        <button v-if="$store.state.user" @click="deletePhoto(photo._id)" class="guzik btn">USUŃ<i class="material-icons right">delete</i></button>
        </div>
    </div>

    <br style="clear:both;"/>
    <br/>
</template>
<script>
import placeService from "@/services/placeService.js";
export default {
  name: "Photos",
  props: {
    placeId: {
      type: String,
      required: true
    },
    photos: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      url:''
    }
  },
  emits:['photo-list-changed'],
  methods:{
    async addPhotoForPlace(id){
      if (!this.url) {alert ('Podaj url zdjęcia')}
        else {
          const params = {
          url: this.url
          }
      try {    
      await placeService.addPhotoForPlace(id,params)
      } catch (err) {console.log(err.message)}
      this.$emit('photo-list-changed')
      this.url = null
        }
    },
    async deletePhoto(id) {
      if (id) {
        try {
        await placeService.deletePhoto(id)
        } catch (err) {return err.message}
        this.$emit('photo-list-changed')
      }
    }      
  
  }
}
</script>
<style>
.box {
  position: relative;
  width: auto;
  float: left;
  margin: 5px
}

/* Make the image responsive */
.box img {
  width: auto;
  height: 200px;
}

/* Style the button and place it in the middle of the container/image */
.box .guzik {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #555;
  color: white;
  
  border: none;
  cursor: pointer;
}

.box .guzik:hover {
  background-color: red;
}
</style>
