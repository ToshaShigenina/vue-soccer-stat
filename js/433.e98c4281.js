"use strict";(self["webpackChunkvue_soccer_stat"]=self["webpackChunkvue_soccer_stat"]||[]).push([[433],{1077:function(t,e,i){i.r(e),i.d(e,{default:function(){return l}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"league-calendar"}},[i("base-matches-content",{attrs:{links:t.links},on:{"change-period":t.changePeriod}})],1)},a=[],o=i(6643),n={components:{BaseMatchesContent:o.Z},props:{id:{type:[String,Number],require:!0},parentPage:{type:Number,default:1}},data(){return{links:[{name:"Лиги",path:"/leagues",page:1}],period:{dateFrom:"",dateTo:""}}},computed:{title(){return`SoccerStat - ${this.$route.meta.title} - ${this.name}`},name(){return this.$store.getters.getCompetitionName}},watch:{name(t,e){t&&t!==e&&this.links.push({name:t})}},methods:{changeTitle(){document.title=this.title},changePeriod(t){this.period=t,this.loadCompetitions()},loadCompetitions(){const t={id:this.id};this.period&&this.period.dateFrom&&this.period.dateTo?t.query=this.period:delete t.query,this.$store.dispatch("loadCompetitionsMatches",t)},loadCompetition(){this.$store.dispatch("loadCompetition",{id:this.id})}},created(){this.changeTitle(),this.$store.state.loadingError=!1,this.loadCompetition(),this.loadCompetitions(),this.parentPage>1&&(this.links[0].page=this.parentPage)}},r=n,d=i(3736),h=(0,d.Z)(r,s,a,!1,null,null,null),l=h.exports}}]);
//# sourceMappingURL=433.e98c4281.js.map