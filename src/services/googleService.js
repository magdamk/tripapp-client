import axios from "axios";
export class GoogleService {
    async getGeoposition(address) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //  const apiKey = "AIzaSyBQ2KLXauaMH-3Py0Yf3_L-XlRxN0WfIDM"
        //const url = "https://maps.googleapis.com/maps/api/geocode/json?address="

        console.log('jestem', address)
            // const url = 'http://api.positionstack.com/v1/forward?access_key=' + '6372f969ddb26abe863c91f5e869b6f1' + '&query=' + address + '&region=Polska&output=json'
        const url = "http://nominatim.openstreetmap.org/search?q=" + address + "&format=geojson"
        const geoposition = await axios.get(url)
            // console.log(geoposition.data.data[0])
        console.log('get', geoposition.data.features[0].geometry.coordinates)
        return geoposition.data.features[0].geometry.coordinates
    }

}

const googleService = new GoogleService();

export default googleService;