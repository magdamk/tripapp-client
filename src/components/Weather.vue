<template lang="pl">
    <div>
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
                            <td>{{(weather.current.temp-273).toFixed(2)}}&deg;C</td>
                            <td>{{(weather.daily[0].temp.day-273).toFixed(2)}}&deg;C</td>
                            <td>{{(weather.daily[1].temp.day-273).toFixed(2)}}&deg;C</td>
                          </tr>
                          <tr>
                            <td>Opis: </td>
                            <td>{{weather.current.weather[0].description}}</td>
                            <td>{{weather.daily[0].weather[0].description}}</td>
                            <td>{{weather.daily[1].weather[0].description}}</td>
                          </tr>
                          <tr>
                            <td>Wiatr: </td>
                            <td>{{weather.current.wind_speed}} km/h</td>
                            <td>{{weather.daily[0].wind_speed}} km/h</td>
                            <td>{{weather.daily[1].wind_speed}} km/h</td>
                          </tr>
                          <tr>
                            <td>Ciśnienie: </td>
                            <td>{{weather.current.pressure}} hPa</td>
                            <td>{{weather.daily[0].pressure}} hPa</td>
                            <td>{{weather.daily[1].pressure}} hPa</td>
                          </tr>
                        </tbody>
                      </table>
                        <p style="font-size:10px">Pogoda pochodzi z serwisu <a href="https://openweathermap.org/">https://openweathermap.org/</a></p>
                 
    </div>
</template>
<script>
export default {
    name: 'Weather',
    props: {
        weather: {
            type: Object,
            required: true
        }
    }
}
</script>
<style lang="css">
    
</style>