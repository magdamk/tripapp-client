<template>
  <div class="home">
    <h1>Wycieczki jednodniowe</h1>
    <p>Opis aplikacji</p>
  </div>

  <footer class="page-footer">
    <router-link :to="{ name: 'Login' }">Administrator</router-link>
  </footer>
  <router-view />
</template>

<script>
// @ is an alias to /src
//import Places from "@/components/Places.vue";

export default {
  name: "Home",
  components: {},
};
</script>
<style>
.footer {
  text-align: right;
}
</style>
