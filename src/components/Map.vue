<template lang="pl">
<br/>
     <GoogleMap
  api-key="AIzaSyBQ2KLXauaMH-3Py0Yf3_L-XlRxN0WfIDM"
  style="width: 400px; height: 400px; margin-left:auto;margin-right:auto;"
  :center="center"
  :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
  <br/>     
   
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'
export default {
  name: "Map",
  components: { GoogleMap, Marker },
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
        type: Number,
        required: true
    }
    },
    computed:{
        center() {
        return { lat: this.latitude, lng: this.longitude }
    }
  }
}

</script>
<style>

</style>
