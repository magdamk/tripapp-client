<template lang="pl">
<div id="top"  style="margin:20px;">
<button class="btn waves-effect waves-light" style="float:left;" @click="goBackToPlaces" >powrót<i class="material-icons left">arrow_back</i></button><p style="clear:both"></p>

<div v-if="$store.state.user">
  <div v-if="message">  
    <h5> {{message}}</h5>
    <br/><hr/>
  </div>
  <br/>

  <h4 >Podaj parametry miejsca</h4>
  <p>Wskazówka: w polu "miejscowość" podaj najbliższą miejscowość, 
    natomiast w polu adres warto dodać województwo i/lub powiat, zwiększa to dokładność geokodowania. </p>
    <p>Geocoding pochodzi z serwisu: <a href="http://www.mapquestapi.com/" target="blank">http://www.mapquestapi.com/</a></p>
  
  <form @submit.prevent="addPlaceToTheBase" >
    <div>
      <label for="name">Nazwa</label>
      <input type="text" id="name" class="input-field" v-model.trim="name" />
    </div>
    <div>
      <label for="photoMain">Zdjęcie główne</label>
      <input type="text" id="photoMain" class="input-field" v-model.trim="photoMain" />
      <img :src="photoMain"  style="height:50px; width:80px;border:2px solid black; padding: 2px">
    </div>
    <div >
      <label for="city">Miejscowość</label>
      <input type="text" id="city" class="input-field" v-model.trim="city"/>
    </div>
    <div>
      <label for="street">Adres (ulica lub wieś, numer, powiat, województwo</label>
      <input type="text" id="street" class="input-field" v-model.trim="street"/>
    </div>
    <div>
      <label for="description">Opis</label>
      <textarea rows="5" id="description" class="input-field" v-model.trim="description"></textarea>
    </div>
    <div>
      <label for="costToVisit">Cena</label>
      <input type="number" id="costToVisit" class="input-field inline" v-model.number="costToVisit" min="0"/>
    </div>
    <div >
      <label for="timeToVisit">Czas zwiedzania</label>
      <input type="number" id="timeToVisit" class="input-field inline" v-model.number="timeToVisit" min="0" step="10"/>
    </div>
    <button class="btn waves-effect waves-light" type="submit">Dodaj miejsce<i class="material-icons right">add</i></button>
  </form>
  <br/>
  <br/>
  </div>
  </div>
</template>
<script>
import geoService from "@/services/geoService.js";
import placeService from "@/services/placeService.js";
export default {
    name: 'AddPlace',
    data(){
        return {
            place: null,
            name: "",
            city: "",
            street: "",
            description: "",
            costToVisit: 0,
            timeToVisit: 0,
            photoMain: "",
            lon: null,
            lat: null,
            message: null
        }
    },
    methods:{
        async addPlaceToTheBase(){
            this.message = null;
            if (!this.name || !this.city || !this.street || !this.description || this.costToVisit<0 || this.timeToVisit<0 || !this.photoMain) {
            alert("Sprawdź poprawność danych");
        } 
        else
        {
            let address = this.city+" "+this.street+" "+this.name
            const coordinates = await geoService.getGeoposition(address)
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
            this.message = await placeService.createPlace(params)
            if (this.message.name) this.message = 'Miejsce zostało dodane do bazy' 
            else this.message = 'Wystąpił błąd'
            this.name = ''
            this.city = ''
            this.street = ''
            this.description = ''
            this.costToVisit = 0
            this.timeToVisit = 0
            this.photoMain = ''
            document.getElementById('top').scrollIntoView();
        }
        },
        goBackToPlaces() {
            this.$router.push("/Places/");
        }
    }
}
</script>
<style lang="css">
    
</style>