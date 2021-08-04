<template>
  <div>
    <div class="container">
      <router-link to="/domains">Back</router-link>
      <br />
      <div>
        <h2>{{ domain }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["domain"],
};
</script>
