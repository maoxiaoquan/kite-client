<template>
  <div class="top-tabs clearfix">
    <router-link class="top-tabs-link"
                 :to="{name:'home'}">推荐</router-link>
    <router-link class="top-tabs-link"
                 v-for="item in articleType"
                 :key="item"
                 :to="{name:'home',query:{type:item}}">{{articleTypeText[item]}}</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  articleType,
  articleTypeText
} from '@utils/constant'
export default {
  name: 'NavHeader',
  data () {
    return {
      articleType,
      articleTypeText
    }
  },
  computed: {
    ...mapState(['articleColumn', 'personalInfo'])
  }
}
</script>

<style scoped lang="scss">
.top-tabs {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #f7f7f7;
  height: 60px;
  .top-tabs-link {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 15px;
    cursor: pointer;
    margin: 0 18px;
    &.exact-active {
      color: #ea6f5a;
    }
  }
}
@media (max-width: 575px) {
  .top-tabs {
    height: 50px;
  }
}
</style>
