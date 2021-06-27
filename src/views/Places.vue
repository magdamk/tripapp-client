<template lang="pl">
    <div style="margin:20px;">
    <div v-show="$store.state.user">
       <button @click="addPlace()" class="waves-effect waves-light btn" style="float:right;">
          <i class="material-icons right">add_circle</i>Dodaj miejsce</button><div style="clear:both;"></div>
    </div>
    <h4>Wyszukaj miejsca</h4>
    <p>Wielkość liter ma znaczenie</p>
    <form @submit.prevent="onSubmit">
      <div class="row">
      <div class="input-field inline">
        <label for="name">Nazwa</label>
        <input type="text" id="name" class="input-field" v-model.trim="name" @keyup="onSubmit"/>
      </div>
      <div class="input-field inline">
         <label for="city">Miejscowość</label>
        <input type="text" id="city" class="input-field" v-model.trim="city" @keyup="onSubmit"/>
      </div>
      <div class="input-field inline">
         <label for="street">Ulica</label>
        <input type="text" id="street" class="input-field" v-model.trim="street" @keyup="onSubmit"/>
      </div>
      </div>
      <div class="row">
      <div class="input-field inline">
         <label for="description">Szukaj w opisach</label>
        <input type="text" id="description" class="input-field" v-model.trim="description" @keyup="onSubmit"/>
      </div>
      <div class="input-field inline">
         <label for="costToVisit">Maksymalna cena</label>
        <input type="number" id="costToVisit" class="input-field" v-model.number="costToVisit" @keyup="onSubmit" min="0"/>
      </div>
       <div class="input-field inline">
         <label for="average">Minimalna ocena</label>
        <input type="number" id="average" class="input-field" v-model.number="average" @keyup="onSubmit" min="0" max="5"/>
      </div>
      
         <div>
            <button class="btn waves-effect waves-light" type="submit">Szukaj<i class="material-icons right">search</i></button>
          </div>
      </div>
    </form>
    <p>Liczba miejsc: {{places.length}}</p>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Miejsce</th>
                    <th class=" hide-on-small-only">Akcja</th>
                    <th>Średnia ocen</th>
                  
                </tr>
            </thead>
            <tbody>
                <tr v-for="(place,index) in places" v-bind:key="place._id" @click="goToPlace(place._id)" >
                    <td><img v-bind:alt="'photo of '+ place.name" v-bind:src="place.photoMain" class="responsive-img" style="height:100px;"/></td>
                    <td>{{place.name}} </td>
                    <td class="hide-on-small-only">
                        <button @click="goToPlace(place._id)" class="waves-effect waves-light btn-small">Pokaż<i class="material-icons right">pageview</i></button>
                    </td>
                    <td>
                      <p>
                        <span v-if="place.average===5" class="good"><i class="material-icons">sentiment_very_satisfied</i></span>
                        <span v-else-if="place.average===4" class="good"><i class="material-icons">sentiment_satisfied</i></span>
                        <span v-else-if="place.average===2" class="bad"><i class="material-icons">sentiment_dissatisfied</i></span>
                        <span v-else-if="place.average===1" class="bad"><i class="material-icons">sentiment_very_dissatisfied</i></span>
                        <span v-else class="neutral"><i class="material-icons">sentiment_neutral</i></span>{{place.average}}
                      </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import placeService from "@/services/placeService.js";
export default {
  name: "Places",
  components: {},
  data() {
    return {
      places: [],
      name: "",
      city: "",
      street: "",
      description: "",
      costToVisit: "",
      average: "",
    //  hide: false,
    };
  },
  created() {
    this.getAllPlaces();
  },
  methods: {
    async getAllPlaces() {
      this.places = await placeService.getAllPlaces("");
    },
    goToPlace(id) {
      this.$router.push("/places/" + id);
    },
    addPlace(){
      this.$router.push("/addPlace/");
    },
    async onSubmit() {
      const query =
        "?name=" +
        this.name +
        "&city=" +
        this.city +
        "&street=" +
        this.street +
        "&description=" +
        this.description +
        "&costToVisit=" +
        this.costToVisit +
        "&average=" + 
        this.average;
      this.places = await placeService.getAllPlaces(query);
    },
  }
};
</script>
<style scoped>
.good {
  color: green;
}
.bad {
  color: red;
}
.neutral {
  color: rgb(255, 230, 0);
}
</style>
