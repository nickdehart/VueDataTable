<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      timeoutSet: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>