<template>
  <b-modal no-close-on-backdrop no-close-on-esc hide-header hide-footer :id="id" title="BootstrapVue">
    <p>
      IFFF websites place cookies on your device to give you the best user experience.
      By using our websites, you agree to the placement of these cookies.
      To learn more, read our <a href="#" @click="seeMore">Privacy Policy</a>
    </p>

    <ui-button class="mt-2" variant="outline-primary" block @clicked="hideModal">Accept</ui-button>
  </b-modal>
</template>

<script>

import UiButton from "./uiComponents/ui-button.vue"

export default{
  name:'rgpd',
  props:{
    id:String
  },
  components:{
    UiButton
  },
  methods:{
    seeMore(){
      this.$emit("seeMore");
      this.$bvModal.hide(this.id)
    },
    hideModal(){
      this.$emit("accept");
      this.$bvModal.hide(this.id)
    }
  },
}
</script>

<style scoped>
</style>
