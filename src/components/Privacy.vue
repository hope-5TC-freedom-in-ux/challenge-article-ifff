<template>
  <b-tabs small pills v-model="step">
    <b-tab>
      <b-col class="cell-outer">
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1>Quelles données collectons nous ?</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ info_collect }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-tab>
    <b-tab>
      <b-col class="privacy-2">
        <p>
          <span class="section-title">
            IFFF Privacy Portal
          </span>
        </p>
        <br />
        <p>
          ▸The IFFF Privacy Portal is the central location for privacy settings and will allow members
          and customers to manage communication preferences and view the Policies and Terms & Conditions
          that have been consented to.
        </p>
        <br/>
        <p>
          ▸IFFF Members, Society Affiliates and Standards Association Members access the <a href="#">Privacy Portal</a>
          or <a href="#">My Account</a> on <a href="#">www.IFFF.org</a>
        </p>
        <br  />
        <p>
          ▸Users without an IFFF Web Account can access the <a href="#" @click="portalJump">Privacy Portal</a>
          and enter their email address to view selected preferences and policies.
        </p>
      </b-col>
    </b-tab>

    <b-tab>
      <b-col class="privacy-2">
        <p>
          <span class="section-title">
            Communication Preferences Help
          </span>
        </p>
        <p>
          To access your preferences, please enter your email address and submit.
        </p>
        Email Address
        <ui-input></ui-input>
      </b-col>
    </b-tab>
  </b-tabs>

</template>

<script>
import UiInput from "./uiComponents/ui-input.vue"
import info_collect from 'raw-loader!../assets/info_collect.txt'
export default{
  name:'privacy',
  props:{
    step:{
      type:Number,
      default:0
    }
  },
  components:{
    UiInput
  },
  data(){
    return{
      info_collect:"",
    }
  },
  methods:{
    portalJump(){
      this.$emit("manageSettings");
    }
  },
  mounted(){
    console.log(info_collect)
    this.info_collect = info_collect
  }
}
</script>

<style scoped>
.privacy-2{
  text-align:justify;
}
.section-title{
  background-color: var(--light-color);
  color:var(--dark-color);
  font-size:130%;
}
.cell-outer{
  line-height: 200%;
  color:var(--dark-color);
  text-align: justify;
  width:100%;
}
</style>
