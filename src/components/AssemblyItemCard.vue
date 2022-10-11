<template>
  <v-card class="assembly-item-card">
    <v-card-title class="assembly-item-name d-flex justify-center">
      {{ data.name }}
    </v-card-title>
    <v-container
      style="min-height: 230px"
      class="d-flex justify-center align-center"
    >
      <v-row v-if="data.currentProduct" no-gutters>
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <v-img
            contain
            max-width="200"
            :src="data.currentProduct.image"
            lazy-src="https://via.placeholder.com/151"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column justify-space-between"
        >
          <v-container>
            <v-row>
              <v-col
                v-for="itemDetail in itemDetails"
                :key="itemDetail.label"
                cols="6"
              >
                <item-detail
                  :label="itemDetail.label"
                  :value="itemDetail.value"
                />
              </v-col>
            </v-row>
          </v-container>
          <item-detail label="Time Elapsed" class="px-2">
            <div v-if="hasValidTimepassed">
              <v-progress-linear
                :color="percentTimePassedColor"
                :value="percentTimePassed"
                height="6"
                rounded
              />
              <div v-if="!!percentTimePassedErrorMessage" class="error-text">
                {{ percentTimePassedErrorMessage }}
              </div>
            </div>
            <div v-else>Unknown</div>
          </item-detail>
        </v-col>
      </v-row>
      <h3 v-else class="d-flex justify-center align-center">No product</h3>
    </v-container>
  </v-card>
</template>

<script>
import ItemDetail from "./ItemDetail";

export default {
  components: {
    ItemDetail,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    timeInterval: null,
    currentTime: 0,
  }),
  mounted() {
    this.currentTime = Date.now();
    this.timeInterval = setInterval(() => {
      this.currentTime += 1000;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  computed: {
    percentTimePassedColor() {
      if (this.percentTimePassed < 75) {
        return "green";
      }
      if (this.percentTimePassed < 100) {
        return "orange";
      }
      return "red";
    },
    hasValidTimepassed() {
      if (!this.data || isNaN(this.data.cycleTimeHrs)) return false;
      if (
        !this.data ||
        !this.data.currentProduct ||
        isNaN(this.data.currentProduct.entryTime)
      )
        return false;
      return true;
    },
    percentTimePassed() {
      return (this.elapsedTime / this.cycleTime) * 100;
    },
    percentTimePassedErrorMessage() {
      if (this.percentTimePassed > 100) {
        return `This item has exceeded its cycle time by ${this.getExceedingTimeString(
          this.elapsedTime
        )}!`;
      }
      return "";
    },
    cycleTime() {
      if (!this.hasValidTimepassed) return 0;
      return this.data.cycleTimeHrs * 3600000;
    },
    elapsedTime() {
      if (!this.hasValidTimepassed) return this.currentTime;
      return this.currentTime - this.data.currentProduct.entryTime;
    },
    itemDetails() {
      if (!this.data.currentProduct) return [];
      return [
        {
          label: "Serial Number",
          value: this.data.currentProduct.serialNumber,
        },
        { label: "Model", value: this.data.currentProduct.model },
        {
          label: "Entry Time",
          value: this.generateTimestring(this.data.currentProduct.entryTime),
        },
        { label: "Cycle Time", value: `${this.data.cycleTimeHrs} hrs` },
      ];
    },
  },
  methods: {
    getExceedingTimeString(milliseconds) {
      const seconds = Math.floor(milliseconds / 1000);
      if (seconds < 60) {
        return `${seconds} seconds`;
      }
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
        return `${minutes} minutes`;
      }
      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours} hours`;
      }
      return `${Math.floor(hours / 24)} days`;
    },
    generateTimestring(milliseconds) {
      const date = new Date(milliseconds);
      const minutes = date.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      });
      return date.getHours() > 12
        ? `${date.getHours() - 12}:${minutes} PM`
        : `${date.getHours()}:${minutes} AM`;
    },
  },
};
</script>

<style>
.theme--light.assembly-item-card .assembly-item-name {
  background-color: rgb(31 41 55);
  color: white;
}
.assembly-item-card.v-sheet.v-card {
  border-radius: 12px;
}
.assembly-item-card .error-text {
  color: red;
  font-size: small;
}
</style>
