<template>
  <nav class="list-nav">

    <ul class="nav-list left">
      <li class="nav-item"
          :class="{'active':!$route.query.type}">
        <router-link :to="{name:$route.name,params:{en_name:$route.params.en_name}}">全部</router-link>
      </li>
      <li class="nav-item"
          v-for="item in articleType"
          :key="item"
          :class="{'active':$route.query.type==item}">
        <router-link :to="{name:$route.name,params:{en_name:$route.params.en_name},query:{type:item}}">
          {{articleTypeText[item]}}
        </router-link>
      </li>
    </ul>

    <ul class="nav-list right">
      <li class="nav-item"
          v-for="(item,key) in navList"
          :key="key"
          @click="_navTap(item.name)"
          :class="{'active':current_nav===item.name}">
        <a href="javascript:;">{{item.text}}</a>
      </li>
    </ul>

  </nav>
</template>

<script>

import { Popover } from "@components";
import { mapState } from 'vuex'
import {
  articleType,
  articleTypeText
} from '@utils/constant'
export default {
  name: "NavSort",
  data () {
    return {
      faceVisible: false,
      articleType,
      articleTypeText,
      navList: [
        {
          name: "newest",
          text: "最新"
        },
        {
          name: "hottest",
          text: "全部热门"
        },
        {
          name: "monthlyHottest",
          text: "本月最热"
        }
      ],
      current_nav: "newest"
    };
  },
  methods: {
    dafauleNav () {
      this.current_nav = "newest";
    },
    _navTap (val) {
      this.$emit("navTap", val);
      this.current_nav = val;
    }
  },
  computed: {
    ...mapState(['articleColumn'])
  },
  components: {
    Popover
  }
};
</script>

<style scoped lang="scss">
.list-nav {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  .nav-list {
    align-items: center;
    line-height: 1;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    .active {
      a {
        color: #ea6f5a;
      }
    }
  }
  .left,
  .right {
    .nav-item {
      padding: 0 12px;
      font-size: 14px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
@media (max-width: 575px) {
  .list-nav .left .nav-item,
  .list-nav .right .nav-item {
    padding: 0px 5px;
    font-size: 12px;
  }
  .list-nav .right {
    display: none;
  }
}
</style>
