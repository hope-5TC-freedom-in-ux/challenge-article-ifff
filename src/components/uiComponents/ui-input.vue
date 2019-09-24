<template>
  <b-col>
    <b-form-input @keyup.enter="validate" class="myInput" v-model="text" placeholder="Saisir ici"/>
  </b-col>
</template>

<script>
export default {
  name: 'ui-input',
  props:{
    length:{
      type:Number,
      default:0
    },
    errorMessage:{
      type:String,
      default:"La longueur du texte ne correspond pas "
    }
  },
  methods:{
    validate(){
      if(this.text.length > 0){
        this.$emit("validate",this.text)
      }else{
        this.$bvToast.toast(this.errorMessage , {
          title: 'Attention',
          autoHideDelay: 2000,
          solid:true,
          appendToast: false
        })
      }
    },
    trigger(){
      this.$emit("clicked")
    }
  },
  data(){
    return{
      text:"",
    }
  }
}
</script>

<style>

.form-control{
  font-size:1.5rem!important;
  border-radius: 200px !important;
  color:var(--light-color) !important;
  background-color:var(--dark-color) !important;
  font-weight:300 !important;
  transition:all ease-in 300ms;
}
.form-control:focus,.form-control:active {
  outline:none;
  border-color:var(--light-color) !important;
  box-shadow: none !important;
  /* background-color: var(--light-color) !important; */
  /* color:var(--dark-color) !important; */
  transition:all ease-in 300ms;
}

.form-control:hover{
  border-color:var(--light-color) !important;
  transition:all ease-in 300ms;
}


</style>
