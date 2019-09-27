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
    $.ajax({
      url: "info_collect.txt",
      success: (res)=>{
        console.log(res)
        this.info_collect = res
      },
      dataType: 'html'
    });
  },
  template:`
  <b-tabs small pills v-model="step">
  <b-tab>
  <b-col class="cell-outer-privacy">
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

var Downloadpdf={
  props:{
    id:String
  },
  data(){
    return{
      error:false,
      validated:false,
      mail:"",
    }
  },
  components:{
    UiButton,UiInput
  },
  methods:{
    trapNotify(trap, score,time){
      if(!time){
        let time=0
      }
      console.log(this.$http)
      $.ajax({
        url: "/api/v0.1/score",
        method:'PATCH',
        data:{privacy:score, time:time},
        context: document.body
      }).done(function() {
        $( this ).addClass( "done" );
      });
      console.log("A trap has been hacked")
    },
    validateMail(input){
      if(input === undefined){
        input = this.mail;
      }
      if(input.includes('@')){
        this.error=false;
        // this.$emit("mail_typed",input)
        this.validated=true;
      }else{
        this.error=true;
      }
    },
    setMail(mail){
      this.mail=mail
    },
    hideModal(){
      this.$emit("accept");
      this.$bvModal.hide(this.id)
    },
    finishChall(){
      this.$emit("finishChall")
    }
  },
  template:`
  <b-modal no-close-on-backdrop no-close-on-esc hide-header hide-footer :id="id" title="BootstrapVue">
  <template v-if="!validated">
    <p>Pour pouvoir lire cet article merci de vous inscrire à notre newsletter</p>
    <p v-if="error">Veuillez rentrer une adresse valide</p>
    <ui-input @update="setMail" length="6" @validate="validateMail"></ui-input>
    <br />
    <ui-button class="mt-2" variant="outline-primary" block @clicked="hideModal">Cancel</ui-button>
    <ui-button class="mt-2" variant="outline-primary" block @clicked="validateMail">Accept</ui-button>
  </template>
  <template v-else>
    <p>Accès à l'article, cliquez ici pour terminer le challenge</p>
    <ui-button class="mt-2" variant="outline-primary" block @clicked="finishChall">Terminer</ui-button>
  </template>
  </b-modal>
  `
}

var PaperPart={
  data(){
    return{
      article:null,
      dlModal:"dl_modal"
    }
  },
  components:{
    Downloadpdf
  },
  methods:{
    showArticle(){
      this.$bvModal.hide(this.dlModal)
    },
    finishChall(){
      this.$emit("finishChall")
    },
    downloadPDF(){
      console.log("DownloadPDF")
      this.$bvModal.show(this.dlModal)
    },
    fetchArticle(){
      $.ajax({
        url: "article.json",
        success: (res)=>{
          console.log(res)
          this.article = res
        },
        dataType:'json'
      });
    }
  },
  mounted(){
    console.log("mounted");
    this.fetchArticle();
    $.ajax({
      url:"/api/v0.1/score",
      method:"PATCH",
      data:{privacy:-100,time:0},
    })
  },
  template:`
  <b-col class="cell-outer">
    <b-row v-if="article">
      <b-col class="text-left">
        <p>
          <h3>
            {{article.name}}
          </h3>
          <br />
          Publisher: {{article.publisher}}
        </p>
      </b-col>
    </b-row>

    <b-row v-if="article">
      <b-col class="text-left">
        <b-badge variant="dark" class="">{{article.authors.length}} Author(s)</b-badge>
        <template v-for="author in article.authors">
          {{author}} ;
        </template>
      </b-col>
    </b-row>

    <b-row align-h="end">
      <b-col cols="auto">
        <b-badge variant="dark" class="clickable" @click="downloadPDF">PDF</b-badge> &nbsp
        <b-badge variant="dark">Citations</b-badge> &nbsp
        <b-badge variant="dark">References</b-badge> &nbsp
        <b-badge variant="dark">Mail</b-badge> &nbsp
      </b-col>
    </b-row>
    <b-row class="article_preview text-left" v-if="article">
      <b-col cols="3">
        <h5>
          Document Sections
        </h5>
        <p v-for="section in article.sections">
          {{section}}
        </p>
      </b-col>
      <b-col cols="9">
        <b-row>
          <b-col>
            <h5>
              Abstract
            </h5>
            <p>
              {{article.abstract}}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <p>
              <b>Published In : </b>{{article.published_in}}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <p>
              <b>Date of Conference : </b>{{article.date_conf}}
            </p>
            <p>
              <b>Date added to IFFF <it>Xplore</it> : </b>{{article.date_added_ifff}}
            </p>
          </b-col>
          <b-col cols="6">
            <p>
              <b>INSPECT Accession Number : </b>{{article.INSPEC_Accession_Number}}
            </p>
            <p>
              <b>DOI : </b>{{article.DOI}}
            </p>
            <p>
              <b>Publisher : </b>{{article.Publisher}}
            </p>
            <p>
              <b>Conference location : </b>{{article.Conference_Loc}}
            </p>
          </b-col>
        </b-row>

      </b-col>
    </b-row>

    <downloadpdf @finishChall="finishChall" :id="dlModal" @mail_typed="showArticle"></downloadpdf>
  </b-col>
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
    enterPrivacy(){
      this.step=1
      this.$emit("enterPrivacy")
    },
    displayPaper(){
      console.log("Display paper")
      this.privacy=false;
    },
    openPrivacyPage(){
      console.log("Ask for privacy")
      this.privacy=true;
      this.$emit("openPrivacy")
    },
    manageSettings(){
      console.log("Ask for managing settings")
      this.$emit("managePrivacy")
      this.step=2;
    },
    finishChall(){
      this.$emit("finishChall")
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
  <paper-part @finishChall="finishChall">
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
  <b-row align-h="center" align-v="center" class="side-frame selectable" @click="displayPaper">
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
  <a href="#" @click="enterPrivacy">> Manage your privacy</a>
  </b-row>
  </b-col>
  </b-row>
  </b-col>
  <rgpd @accept="accept" @seeMore="openPrivacyPage" :id="rgpdModalId"></rgpd>
  </div>
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
    finishChall(){
      this.trapNotify("", 0,this.deltaTime)
      document.location.href="/"
    },
    trapNotify(trap, score,time){
      if(!time){
        let time=0
      }
      $.ajax({
        url: "/api/v0.1/score",
        method:'PATCH',
        data:{privacy:score, time:time},
        context: document.body
      }).done(function() {
        $( this ).addClass( "done" );
      });
      console.log("A trap has been hacked")
    },
    next(){
      this.step+=1;
    },
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
  <science-portal @openPrivacy="trapNotify('interested in',20)"  @enterPrivacy="trapNotify('really interested in', 30)"
  @managePrivacy="trapNotify('privacy boss', 40)" @finishChall="finishChall" :active="portal"></science-portal>
  </b-col>
  </b-row>
  </b-tab>
  </b-tabs>
  `
})


// @openPrivacy="trapNotify('interested in',20)" @enterPrivacy="trapNotify('really interested in', 30)" @managePrivacy="trapNotify('privacy boss' 40)"
