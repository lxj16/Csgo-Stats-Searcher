<template>
  <section>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>

    <div v-if="error">
      <h1>{{error}}</h1>
      <router-link to="/">Go Back to search page</router-link>
    </div>

    <div v-if="profileData" class="container">
      <h1 class="userTag">
        <img :src="profileData.platformInfo.avatarUrl" alt class="platform-avatar" />
        {{profileData.platformInfo.platformUserId}}
      </h1>

      <div class="grid">
        <div>
          <ul>
            <li>
              <h4>Kills</h4>
              <p>{{profileData.segments[0].stats.kills.value}}</p>
              <h4>Deaths</h4>
              <p>{{profileData.segments[0].stats.deaths.value}}</p>
              <h4>Headshots</h4>
              <p>{{profileData.segments[0].stats.headshots.value}}</p>
              <h4>Total damage</h4>
              <p>{{profileData.segments[0].stats.damage.value}}</p>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h4>Shots hit</h4>
              <p>{{profileData.segments[0].stats.shotsHit.value}}</p>
              <h4>Shots fired</h4>
              <p>{{profileData.segments[0].stats.shotsFired.value}}</p>
              <h4>Aiming snipers killed</h4>
              <p>{{profileData.segments[0].stats.snipersKilled.value}}</p>
              <h4>Dominations</h4>
              <p>{{profileData.segments[0].stats.dominations.value}}</p>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h4>Wins</h4>
              <p>{{profileData.segments[0].stats.wins.value}}</p>
              <h4>Ties</h4>
              <p>{{profileData.segments[0].stats.ties.value}}</p>
              <h4>Losses</h4>
              <p>{{profileData.segments[0].stats.losses.value}}</p>
              <h4>Mvps</h4>
              <p>{{profileData.segments[0].stats.mvp.value}}</p>
            </li>
          </ul>
        </div>
      </div>
      <router-link to="/">Go Back</router-link>
    </div>
  </section>
</template>


<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      loading: false,
      error: null,
      profileData: null
    };
  },

  beforeCreate() {
    document.body.className = "body-bg-no-image";
  },

  async created() {
    this.loading = true;
    try {
      const res = await axios.get(
        `/api/v2/profile/steam/${this.$route.params.steamID}`
      );

      this.profileData = res.data.data;
      console.log(this.profileData);
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
  }
};
</script>

<style scoped>
.container {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 700px;
  margin: 1rem auto;
  padding: 2rem 1.5rem;
  border-radius: 20px;
}
h1.gamertag {
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.5rem;
  text-align: center;
  border-radius: 20px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
}
a {
  display: inline-block;
  margin-top: 2rem;
  border: #fff 2px solid;
  padding: 0.5rem 0.8rem;
}
a:hover {
  border: #ccc 2px solid;
  color: #ccc;
}
.platform-avatar {
  width: 40px;
  margin-right: 0.7rem;
}
img {
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
li {
  background: rgba(23, 49, 100, 0.247);
  padding: 1rem;
  margin-bottom: 0.7rem;
  border-radius: 10px;
}
li p {
  font-size: 2rem;
}
li:first-child p {
  font-size: 1.5rem;
}
li span {
  font-size: 1rem;
  color: #ccc;
}
@media (max-width: 500px) {
  h1 {
    font-size: 1.5rem;
    display: block;
    text-align: center;
  }
  .platform-avatar {
    display: none;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  li p {
    font-size: 1.5rem;
  }
}
</style>