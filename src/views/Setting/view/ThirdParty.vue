<template>
  <div class=" setting-view client-card">
    <div class="sub-view-box setting-password-view">
      <h1>第三方登录绑定</h1>
      <ul class="setting-list">
        <li>
          <div class="type">github</div>
          <div class="info">
            <span class="bind"
                  v-if="~personalInfo.bindType.indexOf('github')">已绑定 <span class="del-bind"
                    @click="deletaAuth">解绑</span> </span>
            <a class="no-bind"
               v-else
               :href="githubBindUrl">未绑定，点击绑定</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cookie } from '../../../utils/cookie.js'
import { mapState } from 'vuex'
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
      githubBindUrl: ''
    }
  },
  mounted () {
    this.initUrl()
  },
  methods: {
    initUrl () {
      this.githubBindUrl = `/api-client/v1/oauth/github-oauth?state=${this.personalInfo.user.uid}`
    },
    deletaAuth () {
      this.$store.dispatch('common/DELETE_OAUTN', { identity_type: 'github' }).then(result => {
        this.$store.dispatch('PERSONAL_INFO')
      })
    },
  },
  computed: {
    ...mapState(['personalInfo'])
  },
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
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        .type {
        }
        .info {
          .bind {
            color: #ffc107;
            .del-bind {
              color: #f46e65;
              cursor: pointer;
            }
          }
          .no-bind {
            color: #f46e65;
          }
        }
      }
    }
  }
}
</style>
