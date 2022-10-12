<template>
  <v-app class="b-app" id="app">
    <app-toolbar />
    <div class="app-content">
      <work-stations />
    </div>
  </v-app>
</template>

<script>
import AppToolbar from "./components/AppToolbar";
import WorkStations from "./components/WorkStations";

export default {
  name: "App",
  components: {
    AppToolbar,
    WorkStations,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(229 229 229);
  min-height: 100vmin;
}
.app-content {
  min-height: 100vmin;
}
</style>
