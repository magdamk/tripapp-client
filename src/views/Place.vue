<template lang="pl">
  <br/>
    <div v-if="place">
    <div v-if="$store.state.user">
        <button v-if="!place.showEditForm" @click="editPlace()" class="waves-effect waves-light btn" style="float:right;margin-right:20px">
            <i class="material-icons left">edit</i>Edytuj</button><div style="clear:both"></div>
       <div v-if="place.showEditForm">
        <h4>Edytuj wybrane pozycje</h4>
        
        <form @submit.prevent="updatePlace(place._id)" style="margin-left:20px;margin-right:20px;">
      
      <div>
        <label for="name">Nazwa</label>
        <input type="text" id="name" class="input-field" v-model.trim="name" />
      </div>
      <div>
        <label for="photoMain">Zdjęcie główne</label>
        <input type="text" id="photoMain" class="input-field" v-model.trim="photoMain" />
        <img :src="photoMain"  style="height:50px;">
      </div>
      <div class="row">
      <div >
         <label for="city">Miejscowość, województwo</label>
        <input type="text" id="city" class="input-field" v-model.trim="city"/>
      </div>
      <div>
         <label for="street">Ulica</label>
        <input type="text" id="street" class="input-field" v-model.trim="street"/>
      </div>
      </div>
         
      <div>
         <label for="description">Opis</label>
        <textarea rows="5" id="description" class="input-field" v-model.trim="description"></textarea>
      </div>
      <div class="row">
      <div>
         <label for="costToVisit">Cena</label>
        <input type="number" id="costToVisit" class="input-field" v-model.number="costToVisit" min="0"/>
      </div>
       <div >
         <label for="timeToVisit">Czas zwiedzania</label>
        <input type="number" id="timeToVisit" class="input-field" v-model.number="timeToVisit" min="0" step="10"/>
      </div>
      </div>
         <div>
            <button class="btn waves-effect waves-light" type="submit">Zapisz zmiany<i class="material-icons right">edit</i></button>
             <button class="btn waves-effect waves-light" @click="place.showEditForm=!place.showEditForm" >Anuluj<i class="material-icons right">cancel</i></button>
          </div>
     
    </form>
        </div>
        <br/>
    </div>    
    
    
        <img v-bind:alt="'photo of '+ place.name" v-bind:src="place.photoMain" style="height:180px;"/>
        <h3>{{place.name}}</h3>
            <p><strong>Opis: </strong>{{place.description}}</p>
            <p><strong>Adres: </strong> ul. {{place.street}} {{place.city}}</p>
            <p><strong>Współrzędne: </strong>{{geoposition}}</p>
            <p v-if="place.costToVisit"><strong>Koszt: </strong>{{place.costToVisit}} zł</p>
            <p v-else>Za darmo!</p>
            <p ><strong>Czas zwiedzania: </strong>{{place.timeToVisit}} minut</p>
            <p v-if="place.average>0">Średnia ocen: {{place.average}}</p>
            <p v-else>Brak opinii</p>
            
            <div id="menu"></div>
            <a href="#menu"><button @click ="revealPhotos()" class="waves-effect waves-light btn" ><i class="material-icons left">photo_camera</i>Galeria ({{photos.length}})</button>
            <button @click ="revealMap()"  class="waves-effect waves-light btn" ><i class="material-icons left">place</i>Pokaż na mapie {{}}</button>
            <button @click ="revealWeather()"  class="waves-effect waves-light btn" ><i class="material-icons left">wb_sunny</i>Pogoda</button>           
            <button @click ="revealComments()"  class="waves-effect waves-light btn"><i class="material-icons left">rate_review</i>Opinie ({{comments.length}})</button></a>
            
            <div v-if="place.showWeather">
              <Weather :weather="weather"/>
            </div>   
            
            <div v-show="place.showPhotos">
              <Photos :photos="photos" v-bind:placeId="place._id" @photo-list-changed="photoListChanged"/>
            </div>
           
            <div v-show="place.showMap">
              <Map :latitude="place.latitude" :longitude="place.longitude"/>
            </div>
        
        <div v-show="place.showComments">
            <CommentForm :id="placeId" @comment-list-changed="commentListChange"/>
            <CommentList :comments="comments" :average="place.average" @comment-list-change="commentListChange" />
        </div>
    </div>
    <div v-else>Nie znaleziono miejsca o takim indeksie.</div>
    <br/>
</template>
<script>
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import Photos from "@/components/Photos.vue";
import Map from "@/components/Map.vue";
import Weather from "@/components/Weather.vue"
import placeService from "@/services/placeService.js";
import geoService from "@/services/geoService.js";
export default {
  name: "Place",
  props: {
    placeId: {
      type: String,
      required: true
    },
  },
  components: { CommentList, CommentForm, Photos, Map, Weather },
  data() {
    return {
      place: null,
      showWeather: false,
      showComments: false,
      showPhotos: false,
      showMap: false,
      comments: null,
      weather:null,
      average:null,
      photos:null,
      showEditForm:false,
      name: "",
      city: "",
      street: "",
      description: "",
      costToVisit: 0,
      timeToVisit: 0,
      photoMain: "",
      lon: null,
      lat: null
    };
  },
  created() {
    this.getPlaceById(this.placeId);
    this.getCommentsForPlace(this.placeId);
    this.getPhotosForPlace(this.placeId);
    this.getWeatherForPlace(this.placeId)
    
  },
  methods: {
    
    commentListChange(){
      this.getPlaceById(this.placeId);
      this.getCommentsForPlace(this.placeId);
       this.$forceUpdate()
    },
    photoListChanged(){
      this.getPhotosForPlace(this.placeId)
      this.$forceUpdate()
    },
    async getPlaceById(id) {
      if (id) {
        this.place = await placeService.getPlaceById(id);
      }
    },
    async getCommentsForPlace(id){
      if(id){
        this.comments = await placeService.getCommentsForPlace(id)
      }
    },
     async getPhotosForPlace(id){
      if (id) {
      this.photos = await placeService.getPhotosForPlace(id);
      }
    },
    editPlace(){
      this.place.showEditForm = !this.place.showEditForm;
      this.name = this.place.name
      this.city = this.place.city
      this.street = this.place.street
      this.description = this.place.description
      this.costToVisit = this.place.costToVisit
      this.timeToVisit = this.place.timeToVisit
      this.photoMain = this.place.photoMain
     
    },
    async getGeoposition() {
      let address = this.street.replaceAll(' ','+')+'+'+this.city.replaceAll(' ','+')+'&countrycodes=pl'
      const result = await geoService.getGeoposition(address)
      console.log(result)
     return {lat: result[0],
            lon: result[1]}
    },
    async updatePlace(id) {
       if (!this.name || !this.city || !this.street || !this.description || this.costToVisit<0 || this.timeToVisit<0 || !this.photoMain) {
        alert("Sprawdź poprawność danych");
      } 
      else
       {
        let address = this.city+" "+this.street+" "+this.name
        console.log(address)
        const coordinates = await geoService.getGeoposition(address)
        console.log('mam',coordinates);
        const params = {
            name: this.name,
            city: this.city,
            street: this.street,
            description: this.description,
            costToVisit: this.costToVisit,
            timeToVisit: this.timeToVisit,
            photoMain: this.photoMain,
            latitude: coordinates.lat,
            longitude: coordinates.lng

        }
        await placeService.updatePlaceById(id,params)
        this.showEditForm = false
        this.getPlaceById(id);
        this.$forceUpdate()
       }
    },
    async getWeatherForPlace(id){
     if (id) {this.weather = await geoService.getWeather(id);console.log(this.weather)}
    },
    revealWeather() {
      this.place.showWeather = true
      this.place.showComments = false
      this.place.showPhotos = false
      this.place.showMap = false;
     
    },
     revealPhotos() {
      this.place.showPhotos = true
      this.place.showWeather = false;
      this.place.showComments = false
      this.place.showMap = false;
    },
    revealMap() {
      this.place.showMap = true
      this.place.showWeather = false;
      this.place.showComments = false;
      this.place.showPhotos = false;
    },
    revealComments() {
      this.place.showComments = true
      this.place.showWeather = false;
      this.place.showMap = false;
      this.place.showPhotos = false;
    }
  },
  computed: {
    geoposition() {
      return this.place.latitude + ", " + this.place.longitude;
    },
  },
};
</script>
<style scoped>
.weather {
  border: 1px dotted blue;
  border-radius: 15%;
  background-color: lightblue;
  width: 100px;
  text-align: center;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
