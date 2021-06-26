<template lang="pl">
  <div style="margin:20px">
  <button class="btn waves-effect waves-light" style="float:left;" @click="goBackToPlaces" >powrót<i class="material-icons left">arrow_back</i></button>
 
  <div v-if="place" >
    <div v-if="$store.state.user">
      <button v-if="!place.showEditForm" @click="editPlace2(place._id)" class="waves-effect waves-light btn" style="float:right;">
        <i class="material-icons right">edit</i>Edytuj</button>
    </div>
    <div style="clear:both"> </div>
     <div class="hide-on-med-and-up"><br/></div>
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
    <a href="#menu">
    <button @click ="revealMap()"  class="waves-effect waves-light btn" ><i class="material-icons left">place</i>Pokaż na mapie {{}}</button>
    <button @click ="revealWeather()"  class="waves-effect waves-light btn" ><i class="material-icons left">wb_sunny</i>Pogoda</button> 
    <button @click ="revealPhotos()" class="waves-effect waves-light btn" ><i class="material-icons left">photo_camera</i>Galeria ({{photos.length}})</button>         
    <button @click ="revealComments()"  class="waves-effect waves-light btn"><i class="material-icons left">rate_review</i>Opinie ({{comments.length}})</button></a>
    
    <div v-show="place.showPhotos">
      <Photos :photos="photos" v-bind:placeId="place._id" @photo-list-changed="photoListChanged"/>
    </div>
    
    <div v-show="place.showMap">
      <Map :latitude="place.latitude" :longitude="place.longitude"/>
    </div>
    
    <div v-if="place.showWeather">
      <Weather :weather="weather"/>
    </div>   
    
    <div v-show="place.showComments">
      <CommentForm :id="placeId" @comment-list-changed="commentListChange"/>
      <CommentList :comments="comments" :average="place.average" @comment-list-change="commentListChange" />
    </div>
    </div>
    <div v-else>Nie znaleziono miejsca o takim indeksie.</div>
  </div>
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
    async getWeatherForPlace(id){
     if (id) {this.weather = await geoService.getWeather(id)}
    },
    editPlace2(id){
      this.$router.push('/places/edit/'+id)
    },
    
    revealWeather() {
      this.place.showWeather = !this.place.showWeather
      this.place.showComments = false
      this.place.showPhotos = false
      this.place.showMap = false;
    },
     revealPhotos() {
      this.place.showPhotos = !this.place.showPhotos
      this.place.showWeather = false;
      this.place.showComments = false
      this.place.showMap = false;
    },
    revealMap() {
      this.place.showMap = !this.place.showMap
      this.place.showWeather = false;
      this.place.showComments = false;
      this.place.showPhotos = false;
    },
    revealComments() {
      this.place.showComments = !this.place.showComments
      this.place.showWeather = false;
      this.place.showMap = false;
      this.place.showPhotos = false;
    },
    goBackToPlaces() {
        this.$router.push("/Places/");
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
