<template>
  <div id="app">
    <b-tabs small pills v-model="step">
      <b-tab>
        <b-row id="home" class="step" align-h="center" align-v="center">
          <p>
            Tout d’abord, essayez de retrouver
            <span style="font-style:italic">"Prescriptive Analytics for MEC Orchestration"
              <span style="font-size:50%">
                <a href="#" @click="next">[1]</a>
              </span>
            </span>
            <br/>
            Allez à l’essentiel, votre temps est compté.
          </p>
        </b-row>
      </b-tab>

      <b-tab>
        <b-row class="step" align-h="center" align-v="center">
          <b-col>
            <science-portal></science-portal>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import UiButton from "./components/uiComponents/ui-button.vue"
import SciencePortal from "./components/SciencePortal.vue"
import Rgpd from "./components/Rgpd.vue"
export default {
  name: 'app',
  data(){
    return{
      step:0,
    }
  },
  methods:{
    next(){
      this.step+=1;
    }
  },
  components: {
    UiButton,Rgpd,SciencePortal
  }
}
</script>

<style>
body{
  background-color: var(--dark-color) !important;
}

#app {
  color:var(--light-color) !important;
  font-family: 'Roboto','AvenirLight', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: 300 !important;
  /* color: #2c3e50; */
  padding:1rem;
}

#home{
  font-size:2rem;
}

a{
  color:var(--red-color) !important;
  font-weight:500 !important;
}

.quote{
  font-style:italic;
}

.step{
  height:70vh;
}

.step-higher{
  height:80vh;
}
</style>
