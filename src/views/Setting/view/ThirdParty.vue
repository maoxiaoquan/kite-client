<template>
  <div class=" setting-view client-card">
    <div class="sub-view-box setting-password-view">
      <h1>第三方登录绑定</h1>
      <ul class="setting-list">
        
      </ul>
    </div>
  </div>
</template>

<script>
import { cookie } from '../../../utils/cookie.js'
export default {
  name: 'ResetPassword',
  metaInfo () {
    return {
      title: '个人设置-重置密码',
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped lang="scss">
.setting-view {
  // box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.1);
  // border-radius: 5px;
  padding: 30px;
  background: #ffffff;
  .sub-view-box {
    > h1 {
      color: #333333;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
    }
    .setting-list {
      

    }
  }
}
</style>
