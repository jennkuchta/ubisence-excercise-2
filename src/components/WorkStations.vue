<template>
  <v-container fluid class="px-5">
    <div v-if="!!failedToLoadEngines || !!failedToLoadWorkstations">
      Failed to fetch data<br />
      {{ failedToLoadEngines }} <br />
      {{ failedToLoadWorkstations }}
    </div>
    <v-progress-circular v-else-if="!dataReady" indeterminate />
    <v-row v-else>
      <v-col
        v-for="(workstationData, index) in workstationsData"
        :key="index"
        cols="12"
        sm="6"
        xl="3"
        class="pa-5"
      >
        <assembly-item-card :data="workstationData"> </assembly-item-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AssemblyItemCard from "./AssemblyItemCard";
import { WORKSTATIONS, ENGINES } from "../store/namespaces";
import { mapActions } from "vuex";

export default {
  components: {
    AssemblyItemCard,
  },
  data: () => ({
    loadingEngines: true,
    loadingWorkstations: true,
    failedToLoadWorkstations: false,
    failedToLoadEngines: false,
    engines: [],
    workstations: [],
  }),
  mounted() {
    console.warn(this.$store);
    this.getWorkStations()
      .then((workstations) => {
        this.workstations = workstations;
      })
      .catch((err) => {
        this.failedToLoadWorkstations = err;
      })
      .finally(() => {
        this.loadingWorkstations = false;
      });
    this.getEngines()
      .then((engines) => {
        console.warn("ENGINES", engines, this.getEngines, ENGINES);
        this.engines = engines;
      })
      .catch((err) => {
        this.failedToLoadEngines = err;
      })
      .finally(() => {
        this.loadingEngines = false;
      });
  },
  computed: {
    dataReady() {
      return (
        !this.loadingEngines &&
        !this.loadingWorkstations &&
        !this.failedToLoadWorkstations &&
        !this.failedToLoadEngines
      );
    },
    workstationsData() {
      if (!this.dataReady) return [];
      return this.workstations.map((workstation) => {
        if (!!workstation.currentProduct) {
          const currentProductData = this.engines.find(
            (engine) => engine.id === workstation.currentProduct.id
          );
          const currentProduct = Object.assign(
            {},
            workstation.currentProduct,
            currentProductData
          );
          return Object.assign(workstation, { currentProduct });
        }
        return workstation;
      });
    },
  },
  methods: {
    ...mapActions(WORKSTATIONS, ["getWorkStations"]),
    ...mapActions(ENGINES, ["getEngines"]),
  },
};
</script>