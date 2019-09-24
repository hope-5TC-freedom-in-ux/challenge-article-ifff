<template>
  <b-col class="outer">
    <b-row class="title banner">
      <b-col cols="auto" class="website_title">
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

    <b-row align-h="center">
      <b-col cols="7">
        <paper-part>
        </paper-part>
      </b-col>
      <b-col cols="3">
        PUBS
      </b-col>
    </b-row>
  </b-col>
</template>

<script>

import PaperPart from "./PaperPart.vue"

export default{
  name:"science-portal",
  components:{
    PaperPart
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
}
.subtitle{
  font-style: italic;
  font-size:50%;
}
.outer{
  border:1px solid var(--light-color);
  height:95vh;
}
</style>
