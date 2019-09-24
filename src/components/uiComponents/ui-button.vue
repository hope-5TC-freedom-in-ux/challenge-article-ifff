<template>
  <b-button pill class="button" @click="trigger">
    <slot>
    </slot>
  </b-button>
</template>

<script>
export default {
  name: 'ui-button',
  methods:{
    trigger(){
      this.$emit("clicked")
    }
  }
}
</script>

<style>

.button:focus,.button:active {
   box-shadow: none !important;
}

.button:active{
  background-color:var(--darker-color) !important;
}

.button{
  color:var(--light-color) !important;
  border-color:var(--light-color) !important;
  background-color: transparent !important;
  transition: all ease-in 200ms;
}

.button:hover{
  color:var(--dark-color) !important;
  border-color:var(--light-color) !important;
  background-color: var(--light-color) !important;
}
</style>
