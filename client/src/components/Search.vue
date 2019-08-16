<template>
  <section class="search">
    <h1>Search Player</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="steam-ID">Steam ID eg.76561198249008602</label>
        <input type="text" name="text" v-model="steamID" id="steam-ID" placeholder="Your Steam ID" />
      </div>

      <div class="form-group">
        <input type="submit" value="Submit" class="btn" />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      steamID: ""
    };
  },
  beforeCreate() {
    document.body.className = "body-bg-image";
  },
  methods: {
    onSubmit() {
      if (!this.steamID) {
        this.$toasted.show("Please enter a steam ID", {
          duration: 2000,
          icon: "exclamation-circle"
        });
      } else {
        this.$router.push(`/profile/steam/${this.steamID}`);
      }
    }
  }
};
</script>


<style>
</style>