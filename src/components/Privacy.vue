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
        <!-- <span class="section-title">
          Quelles données collectons nous ?
        </span>
        <br/>
        {{ info_collect }} -->
      </b-col>
    </b-tab>
    <b-tab>
      <b-col class="privacy-2">
        <span class="section-title">
          IEEE Privacy Portal
        </span>
        <br />
        ▸The IEEE Privacy Portal is the central location for privacy settings and will allow members and customers to manage communication preferences and view the Policies and Terms & Conditions that have been consented to.
        <br/>
        ▸IEEE Members, Society Affiliates and Standards Association Members access the Privacy Portal or My Account on www.ieee.org
        <br  />
        ▸Users without an IEEE Web Account can access the Privacy Portal and enter their email address to view selected preferences and policies.
      </b-col>
    </b-tab>
  </b-tabs>

</template>

<script>

import info_collect from 'raw-loader!../assets/info_collect.txt'
export default{
  name:'privacy',
  props:{
    step:{
      type:Number,
      default:0
    } 
  },
  data(){
    return{
      info_collect:"",
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
  text-align: justify;
}
.section-title{
  background-color: var(--light-color);
  color:var(--dark-color);
  font-size:130%;
}
.cell-outer{
  color:var(--dark-color);
  text-align: justify;
  width:100%;
}
</style>
