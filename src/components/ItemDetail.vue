<template>
  <div class="item-detail py-1">
    <div class="label">
      {{ label }}
    </div>
    <div>
      <slot>
        <h4>{{ !!value ? value : "Unknown" }}</h4>
      </slot>
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