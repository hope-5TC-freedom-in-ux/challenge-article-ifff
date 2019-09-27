var UiInput = {
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
      if(this.text.length >= this.length){
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
    sendChange(input){
      this.$emit("update", input)
    },
    trigger(){
      this.$emit("clicked")
    }
  },
  data(){
    return{
      text:"",
    }
  },
  template:`
  <b-col>
  <b-form-input @keyup.enter="validate" @update="sendChange" class="myInput" v-model="text" placeholder="Saisir ici"/>
  </b-col>
  `
}

var UiButton = {
  methods:{
    trigger(){
      this.$emit("clicked")
    }
  },
  template:`
  <b-button pill class="button" @click="trigger">
  <slot>
  </slot>
  </b-button>
  `
}

var SciencePortal={
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
    manageSettings(){
      console.log("Ask for managing settings")
      this.step=2;
    },
    accept(){
      console.log("Accept")
    }
  },
  data(){
    return{
      fake_list:[
        "Pricing Policy",
        "Browser Policy",
        "Export Restrictions",
        "Payment and Order Methods",
        "Returns Policy",
        "Shipping Information",
        "Tax Informaiton",
        "Terms & Conditions",
        "Nondiscrimination Policy",
        "Privacy Policy",
        "Principles of Business Conduct and Conflict of Interest",
        "IFFF Data Access and Use Policy "
      ],
      privacy:false,
      step:0,
      rgpdModalId:"rgpd_modal"
    }
  },
  watch:{
    active(){
      if(this.active){
        this.$bvModal.show(this.rgpdModalId)
      }
    }
  },
  template:`
  <div>
  <b-col class="outer">
  <b-row align-h="center" class="title banner">
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
  <privacy :step="step" @manageSettings="manageSettings">
  </privacy>
  </b-col>
  <b-col cols="2">
  <b-row align-h="center" align-v="center" class="side-frame">
  Accept and go back to the paper
  </b-row>

  <b-row align-h="center" align-v="center" class="side-frame secondary">
  <b>Business Policies & Information </b>
  <ul class="list-unstyled mt-2">
  <li v-for="link in fake_list">
  <a href="#">
  > {{link}}
  </a>
  </li>
  </ul>
  </b-row>

  <b-row align-h="center" align-v="center" class="side-frame secondary">
  <b>IFFF Privacy Portal</b>
  <a href="#" @click="step=1">> Manage your privacy</a>
  </b-row>
  </b-col>
  </b-row>
  </b-col>
  <rgpd @accept="accept" @seeMore="openPrivacyPage" :id="rgpdModalId"></rgpd>
  </div>
  `
}

var PaperPart={
  template:`
  <b-col class="cell-outer">
  JE SUIS UN PAPER
  </b-col>
  `
}

var Rgpd={
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
  template:`
  <b-modal no-close-on-backdrop no-close-on-esc hide-header hide-footer :id="id" title="BootstrapVue">
  <p>
  IFFF websites place cookies on your device to give you the best user experience.
  By using our websites, you agree to the placement of these cookies.
  To learn more, read our <a href="#" @click="seeMore">Privacy Policy</a>
  </p>

  <ui-button class="mt-2" variant="outline-primary" block @clicked="hideModal">Accept</ui-button>
  </b-modal>
  `
}

var Privacy={
  template:`
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
  `
}

var app = new Vue({
  el: '#app',
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
  computed:{
    portal(){
      if(this.step==1){
        return true
      }else{
        return false
      }
    }
  },
  watch:{
    step(newVal){
      console.log("Changing step")
      if(newVal==1){
        console.log("Start");
      }
    }
  },
  components: {
    UiButton,SciencePortal
  },
  template:`
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
  <science-portal :active="portal"></science-portal>
  </b-col>
  </b-row>
  </b-tab>
  </b-tabs>
  `
})
