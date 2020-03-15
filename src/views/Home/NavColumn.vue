<template>
  <nav class="nav-header recommend-collection">
    <div class="nav-items">
      <router-link class="nav-item"
                   :class="{'active':$route.name==='home'}"
                   :to="{name:'home'}">推荐</router-link>
      <a class="nav-item"
         v-for="column_item in navItem"
         :key="column_item.column_id"
         @click="switchNav({name:'column',params:{en_name:column_item.en_name}})"
         :class="{'active':currColumnEnName===column_item.en_name}">
        {{column_item.name}}
      </a>
    </div>
    <div class="nav-more">
      <a href="javascript:;"
         class="nav-more-btn"
         @click="switchNav({name:'columnAll'})">
        更多...
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavHeader',
  props: {
    navItem: Array
  },
  methods: {
    switchNav (val) {
      this.$router.push(val)
    }
  },
  computed: {
    currColumnEnName () {
      // 当前的专栏
      return this.$store.state.articleColumn.currColumnEnName
    }
  }
}
</script>

<style scoped lang="scss">
.nav-header {
  width: 100%;
  transition: all 0.2s;
  transform: translateZ(0);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px 5px 10px;
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  &.recommend-collection {
    .nav-items {
      flex: 1;
      .nav-item {
        height: 30px;
        box-sizing: border-box;
        padding: 0 20px;
        border-radius: 2px;
        font-size: 14px;
        line-height: 30px;
        display: inline-block;
        color: #646464;
        background-color: #f6f6f6;
        margin: 0 4px 10px;
        &.active {
          font-weight: 500;
          color: #f46e65;
          background-color: #f46e653b;
        }
      }
    }
    .nav-more {
      width: 80px;
      .nav-more-btn {
        position: absolute;
        right: 15px;
        top: 21px;
        font-size: 13px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        background: #f0f0f0;
        border-radius: 2px;
        width: 56px;
        height: 28px;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
