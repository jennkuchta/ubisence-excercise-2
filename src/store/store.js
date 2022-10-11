import Vuex from "vuex";
import Vue from "vue";
import { WORKSTATIONS, ENGINES } from "./namespaces";
import workStationsModule from "./modules/work-stations";
import enginesModule from "./modules/engines";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    [WORKSTATIONS]: workStationsModule,
    [ENGINES]: enginesModule
  }
});
