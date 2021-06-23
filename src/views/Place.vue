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
         <label for="city">Miejscowość</label>
        <input type="text" id="city" class="input-field" v-model.trim="city"/>
      </div>
      <div>
         <label for="street">Ulica</label>
        <input type="text" id="street" class="input-field" v-model.trim="street"/>
      </div>
      </div>
     <div>
         <p> Współrzędne: {{}}</p>
      </div>
      <div>
         <label for="description">Opis</label>
        <input type="text" id="description" class="input-field" v-model.trim="description"/>
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
    
    
        <img v-bind:alt="'photo of '+ place.name" v-bind:src="place.photoMain" style="height:200px;"/>
        <h2>{{place.name}}</h2>
            <p><strong>Opis: </strong>{{place.description}}</p>
            <p><strong>Miejscowość: </strong>{{place.city}}</p>
             <p><strong>Ulica: </strong>{{place.street}}</p>
            <p><strong>Współrzędne: </strong>{{geoposition}}</p>
            <p v-if="place.costToVisit"><strong>Koszt: </strong>{{place.costToVisit}} zł</p>
            <p v-else>Za darmo!</p>
            <p ><strong>Czas zwiedzania: </strong>{{place.timeToVisit}} minut</p>
            <p>Średnia ocen: {{average}}</p>
            <button @click ="revealPhotos()" class="waves-effect waves-light btn" ><i class="material-icons left">photo_camera</i>Galeria ({{photos.length}})</button>
            <button @click ="revealMap()"  class="waves-effect waves-light btn" ><i class="material-icons left">place</i>Pokaż na mapie {{}}</button>
            <button @click ="revealWeather()"  class="waves-effect waves-light btn" ><i class="material-icons left">wb_sunny</i>Pogoda</button>           
            <button @click ="revealComments()"  class="waves-effect waves-light btn"><i class="material-icons left">rate_review</i>Opinie ({{comments.length}})</button>
            
                    <div v-if="place.showWeather">
                      <table class="responsive-table" >
                        <thead >
                          <tr>
                            <td></td>
                            <td><h5>Teraz</h5></td>
                            <td><h5>Jutro</h5></td>
                            <td><h5>Pojutrze</h5></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Temperatura:</td>
                            <td>{{(weather.data.current.temp-273).toFixed(2)}}&deg;C</td>
                            <td>{{(weather.data.daily[0].temp.day-273).toFixed(2)}}&deg;C</td>
                            <td>{{(weather.data.daily[1].temp.day-273).toFixed(2)}}&deg;C</td>
                          </tr>
                          <tr>
                            <td>Opis: </td>
                            <td>{{weather.data.current.weather[0].description}}</td>
                            <td>{{weather.data.daily[0].weather[0].description}}</td>
                            <td>{{weather.data.daily[1].weather[0].description}}</td>
                          </tr>
                          <tr>
                            <td>Wiatr: </td>
                            <td>{{weather.data.current.wind_speed}} km/h</td>
                            <td>{{weather.data.daily[0].wind_speed}} km/h</td>
                            <td>{{weather.data.daily[1].wind_speed}} km/h</td>
                          </tr>
                          <tr>
                            <td>Ciśnienie: </td>
                            <td>{{weather.data.current.pressure}} hPa</td>
                            <td>{{weather.data.daily[0].pressure}} hPa</td>
                            <td>{{weather.data.daily[1].pressure}} hPa</td>
                          </tr>
                        </tbody>
                      </table>
                        <p style="font-size:10px">Pogoda pochodzi z serwisu <a href="https://openweathermap.org/">https://openweathermap.org/</a></p>
                    </div>   
            
            <div v-show="place.showPhotos">
              <Photos :photos="photos" v-bind:placeId="place._id" @photo-list-changed="photoListChanged"/>
            </div>
           
            <div v-show="place.showMap">
              <Map :latitude="place.latitude" :longitude="place.longitude"/>
            </div>
        
        <div v-show="place.showComments">
            <CommentForm :id="placeId" @comment-list-changed="commentListChange"/>
            <CommentList :comments="comments" @comment-list-change="commentListChange" @update-average="updateAverage"/>
        </div>
    </div>
    <div v-else>Nie znaleziono miejsca o takim indeksie.</div>
</template>
<script>
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import Photos from "@/components/Photos.vue";
import Map from "@/components/Map.vue";
import placeService from "@/services/placeService.js";
import axios from 'axios'
export default {
  name: "Place",
  props: {
    placeId: {
      type: String,
      required: true
    },
  },
  components: { CommentList, CommentForm, Photos, Map },
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
      photoMain: ""
    };
  },
  created() {
    this.getPlaceById(this.placeId);
    this.getCommentsForPlace(this.placeId);
    this.getPhotosForPlace(this.placeId)
  },
  methods: {
    updateAverage(a){
     // console.log(a);
      this.average=a;
      return this.average
    },
    commentListChange(){
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
      this.photos = await placeService.getPhotosForPlace(id);
    },
    editPlace(){
      console.log(this.place.showEditForm)
      this.place.showEditForm = !this.place.showEditForm;
      this.name = this.place.name
      this.city = this.place.city
      this.street = this.place.street
      this.description = this.place.description
      this.costToVisit = this.place.costToVisit
      this.timeToVisit = this.place.timeToVisit
      this.photoMain = this.place.photoMain
    },
    async updatePlace(id) {
       if (!this.name || !this.city || !this.street || !this.description || this.costToVisit<0 || this.timeToVisit<0 || !this.photoMain) {
        alert("Sprawdź poprawność danych");
      } 
      else
       {
        const params = {
            name: this.name,
            city: this.city,
            street: this.street,
            description: this.description,
            costToVisit: this.costToVisit,
            timeToVisit: this.timeToVisit,
            photoMain: this.photoMain
        }
        await placeService.updatePlaceById(id,params)
        this.showEditForm = false
        this.getPlaceById(id);
        this.$forceUpdate()
       }
    },
    async revealWeather() {
      this.place.showWeather = !this.place.showWeather;
      this.place.showComments = false
      this.place.showPhotos = false
      this.place.showMap = false;
      let url = "http://api.openweathermap.org/data/2.5/onecall?lat=" + this.place.latitude+"&lon="+this.place.longitude+ "&appid=ce133af21bc2f8dd391c25474fae2b43&lang=pl";
      this.weather = await axios(url)
    },
     revealPhotos() {
      this.place.showPhotos = !this.place.showPhotos;
      this.place.showWeather = false;
      this.place.showComments = false
      this.place.showMap = false;
    },
    revealMap() {
      this.place.showMap = !this.place.showMap;
      this.place.showWeather = false;
      this.place.showComments = false;
      this.place.showPhotos = false;
    },
    revealComments() {
      this.place.showComments = !this.place.showComments;
      this.place.showWeather = false;
      this.place.showMap = false;
      this.place.showPhotos = false;
    }
  },
  computed: {
    geoposition() {
      return this.place.longitude + ", " + this.place.latitude;
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
