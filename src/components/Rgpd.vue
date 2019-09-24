<template>
  <b-modal no-close-on-backdrop no-close-on-esc hide-header hide-footer :id="id" title="BootstrapVue">
    <p>
      IEEE websites place cookies on your device to give you the best user experience.
      By using our websites, you agree to the placement of these cookies.
      To learn more, read our <a href="#" @click="seeMore">Privacy Policy</a>
    </p>

    <b-button class="mt-2" variant="outline-primary" block @click="hideModal">Toggle Me</b-button>
  </b-modal>
</template>

<script>
export default{
  name:'rgpd',
  props:{
    id:String,
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
