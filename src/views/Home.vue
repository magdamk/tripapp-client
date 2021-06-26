<template>
  <div class="home">
    <h1>tripapp</h1>
    <h3>Wycieczki jednodniowe</h3>
    <p>Baza różnowrodnych atrakcyjnych miejsc na terenie Polski możliwych do zwiedzenia podczas jednodniowej wycieczki.</p>
    <p>Zoptymalizowana także dla małych urządzeń.</p>
  </div>
  <router-link style="float:right" :to="{ name: 'Login' }">Administrator</router-link>
  <footer class="page-footer">
  </footer>
  <router-view />
</template>

<script>
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
