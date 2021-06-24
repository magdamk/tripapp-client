import axios from "axios";
import placeService from "@/services/placeService.js";
export class GeoService {
    async getGeoposition(address) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //  const apiKey = "AIzaSyBQ2KLXauaMH-3Py0Yf3_L-XlRxN0WfIDM"
        //const url = "https://maps.googleapis.com/maps/api/geocode/json?address="

        console.log('jestem', address)
            //const url = 'http://api.positionstack.com/v1/forward?access_key=' + '6372f969ddb26abe863c91f5e869b6f1' + '&query=' + address + '&region=Polska&output=json'
            // const url = "http://nominatim.openstreetmap.org/search?q=" + address + "&format=geojson"
        const url = "http://www.mapquestapi.com/geocoding/v1/address?key=" + "irYY0VXhVRyhGNbijDkS8JhedXNzUfMk" + "&location=" + address + "&countrycodes=PL"
            //const url = "https://eu1.unwiredlabs.com/v2/search.php?token=" + "pk.ecbd885d96a873bcaf784217f1e27049" + "&q=" + address+"&accept-language"
        const geoposition = await axios.get(url)
            // console.log(geoposition.data.data[0])
            //console.log('get', geoposition.data.results[0].locations[0].displayLatLng)
            //.results[0].locations.displayLatLng)
            //return geoposition.data.features[0].geometry.coordinates
        return geoposition.data.results[0].locations[0].displayLatLng
    }

    async getWeather(id) {
        const place = await placeService.getPlaceById(id);
        const url = "http://api.openweathermap.org/data/2.5/onecall?lat=" + place.latitude + "&lon=" + place.longitude + "&appid=ce133af21bc2f8dd391c25474fae2b43&lang=pl";
        const weather = await axios(url)
        return weather.data
    }
}



const geoService = new GeoService();

export default geoService;