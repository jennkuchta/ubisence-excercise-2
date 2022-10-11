<template>
  <div class="item-detail py-1">
    <div class="label">
      {{ label }}
    </div>
    <div>
      <h4>
        <slot>{{ !!value ? value : "Unknown" }}</slot>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Number],
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>

<style>
.item-detail .label {
  color: grey;
  font-size: small;
}
.item-detail {
  display: flex;
  flex-direction: column;
  text-align: justify;
}
</style>
