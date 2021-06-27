<template lang="pl">
<div style="margin:20px;">
 <button class="btn waves-effect waves-light" style="float:left;" @click="goBackToPlace(placeId)" >powrót<i class="material-icons left">arrow_back</i></button><p style="clear:both"></p>
    <div v-if="$store.state.user">
       <div v-if="message">  
       <br/>
       <h5 :style="{ background:color}"> {{message}}</h5>
        <br/><hr/>
        </div>
        <div v-if="show">
        <br/>
         <h4 >Edytuj wybrane pozycje</h4>
         <p>Wskazówka: w polu "miejscowość" podaj najbliższą miejscowość, 
            natomiast w polu adres warto dodać województwo i/lub powiat, zwiększa to dokładność geokodowania. </p>
        
        <form @submit.prevent="updatePlace" >
      
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
      <div class="row">
      <div>
         <label for="costToVisit">Cena</label>
        <input type="number" id="costToVisit" class="input-field inline" v-model.number="costToVisit" min="0"/>
      </div>
       <div >
         <label for="timeToVisit">Czas zwiedzania</label>
        <input type="number" id="timeToVisit" class="input-field inline" v-model.number="timeToVisit" min="0" step="10"/>
      </div>
      </div>
         <div>
            <button class="btn waves-effect waves-light" type="submit">Zapisz zmiany<i class="material-icons right">edit</i></button>
            
          </div>
     
    </form>
    </div>
    <br/>
    </div>
    </div>
</template>
<script>
import geoService from "@/services/geoService.js";
import placeService from "@/services/placeService.js";
export default {
    name: 'EditPlace',
    props: {
        placeId: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            place: null,
            name: null,
            city: null,
            street: null,
            description: null,
            costToVisit: null,
            timeToVisit: null,
            photoMain: null,
            lon: null,
            lat: null,
            message: '',
            color: 'yellow',
            show: true
        }
    },
    created(){
        this.getPlaceById(this.placeId)
    },
    methods:{
        async getPlaceById(id) {
            if (id) {
            this.place = await placeService.getPlaceById(id);
            this.name = this.place.name
            this.city = this.place.city
            this.street = this.place.street
            this.description = this.place.description
            this.costToVisit = this.place.costToVisit
            this.timeToVisit = this.place.timeToVisit
            this.photoMain = this.place.photoMain
            }
        },
        async updatePlace(){
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
                this.message = await placeService.updatePlaceById(this.placeId,params)
                if (this.message.name) 
                    {this.message = 'Zmiany zostały zapisane' 
                    this.color = 'lightgreen';
                    this.show = false
                    }
                else {
                    this.message = 'Wystąpił błąd'
                    this.color = 'red'}
                
            }
        },
        goBackToPlace(id) {
            this.$router.push('/places/'+id);
        }
    }
}
</script>
<style lang="css">
    
</style>