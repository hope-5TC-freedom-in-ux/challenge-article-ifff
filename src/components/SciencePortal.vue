<template>
  <div>
    <b-col class="outer">
      <b-row align-h="center"class="title banner">
        <b-col cols="10" class="website_title">
          <p>
            <b>IFFF</b> Xplore<sup>®</sup>
            <span class="subtitle">-Bibliothèque digitale</span>
          </p>
        </b-col>
      </b-row>

      <b-row class="banner" align-h="center">
        <b-col cols="10">
          <b-row align-h="left">
            <b-col cols="auto">
              <b-dropdown id="dropdown-1" text="Browse">
                <b-dropdown-item>First Action</b-dropdown-item>
                <b-dropdown-item>Second Action</b-dropdown-item>
              </b-dropdown>
              <b-dropdown id="dropdown-1" text="My Settings">
                <b-dropdown-item>First Action</b-dropdown-item>
                <b-dropdown-item>Second Action</b-dropdown-item>
                <b-dropdown-item>Third Action</b-dropdown-item>
              </b-dropdown>
              <b-dropdown id="dropdown-1" text="Get Help">
                <b-dropdown-item>First Action</b-dropdown-item>
                <b-dropdown-item>Second Action</b-dropdown-item>
                <b-dropdown-item>Third Action</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item active>Active action</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="banner" align-h="center">
        <b-col cols="10">
          <b-input-group size="sm" prepend="Browse" append="Q">
            <b-form-input placeholder="useless"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row align-h="center" v-if="!privacy">
        <b-col cols="8">
          <paper-part >
          </paper-part>
        </b-col>
        <b-col cols="2">
          <b-row align-h="center" align-v="center" class="side-frame">
            PUB
          </b-row>
          <b-row align-h="center" align-v="center" class="side-frame">
            PUB
          </b-row>
        </b-col>
      </b-row>
      <b-row align-h="center" v-else>
        <b-col cols="8">
          <privacy>
          </privacy>
        </b-col>
        <b-col cols="2">
          <b-row align-h="center" v-if="privacy" align-v="center" class="side-frame">
            PRIVACY SETTINGS
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <rgpd @accept="accept" @seeMore="openPrivacyPage" :id="rgpdModalId"></rgpd>
  </div>

</template>

<script>
import PaperPart from "./PaperPart.vue"
import Rgpd from "./Rgpd.vue"
import Privacy from "./Privacy.vue"

export default{
  name:"science-portal",
  props:{
    active:Boolean
  },
  components:{
    PaperPart,Rgpd, Privacy
  },
  methods:{
    openPrivacyPage(){
      console.log("Ask for privacy")
      this.privacy=true;
    },
    accept(){
      console.log("Accept")
    }
  },
  data(){
    return{
      privacy:false,
      rgpdModalId:"rgpd_modal"
    }
  },
  watch:{
    active(){
      if(this.active){
        this.$bvModal.show(this.rgpdModalId)
      }
    }
  }
}
</script>

<style scoped>

.title.banner{
  background-color: var(--light-color);
  color:var(--dark-color);
}
.banner{
  margin-bottom:2rem;
}
.website_title{
  font-size: 200%;
  text-align: left;
}
.subtitle{
  font-style: italic;
  font-size:50%;
}

.side-frame{
  height:100px;
  background-color: var(--light-color);
  color:var(--dark-color);
  font-weight: 400;
  margin-bottom:0.5rem;
}

.outer{
  border:1px solid var(--light-color);
  min-height:95vh;
}
</style>
