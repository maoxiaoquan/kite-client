<template>
  <div class="github">
    <div class="github-view">
      <div class="title">
        {{ !$route.query.state ? 'github授权登录' : 'github授权绑定' }}
      </div>
      <div class="github-main"
           v-if="!isloading">
        <div class="info"
             v-if="authInfo.state === 'success'">
          <div class="create"
               v-if="authInfo.data.type === 'create'">
            <p>登录邮箱：{{ authInfo.data.user.email }}</p>
            <p>登录密码：{{ authInfo.data.password }}</p>
            <p>此账户是github授权登录时，生成的账户</p>
            <p>请记住账号密码，可使用当前账号密码登录，也可直接使用github登录</p>
            <p>请尽快在个人中心修改密码</p>
            <p>当前页仅在首次登录时出现</p>
            <p><a href="/">直接登录，返回首页</a></p>
          </div>
          <div class="bind"
               v-else-if="authInfo.data.type === 'bind'">
            <p>
              github授权绑定成功，返回个人中心
            </p>
            <p>以后可使用当前绑定的github账户直接登录</p>
            <p>3秒后返回个人中心</p>
            <p><a href="/">返回个人中心</a></p>
          </div>
          <div class="login"
               v-else-if="authInfo.data.type === 'login'">
            <p>
              登录成功，返回首页
            </p>
          </div>
        </div>
        <div class="error"
             v-else>
          <div class="title">授权失败</div>
          {{ authInfo.message }}
          <a href="/">返回首页</a>
        </div>
      </div>
      <div class="loading"
           v-else>
        <p>请稍等，正在操作中...</p>
        <p>请勿关闭浏览器</p>
        <p>如果长时间无反应<a href="/">请返回首页</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { cookie } from '../../utils/cookie.js'
export default {
  name: 'Main',
  mounted () {
    this.githubAuth()
  },
  data () {
    return {
      isloading: false,
      authInfo: {
        data: {
          type: ''
        }
      }
    }
  },
  methods: {
    githubAuth () {
      this.isloading = true
      this.$store
        .dispatch('common/GITHUB_OAUTN', this.$route.query)
        .then(result => {
          this.isloading = false
          this.authInfo = result
          if (result.state === 'success') {
            if (result.data.type === 'login') {
              cookie.set('accessToken', result.data.token, 7)
              window.location.href = '/'
            } else if (result.data.type === 'create') {
              cookie.set('accessToken', result.data.token, 7)
            } else if (result.data.type === 'bind') {
              setTimeout(() => {
                this.$router.push({ name: 'ThirdParty' })
              }, 3000)
            }
          }
        })
    }
  }
}
</script>
<style scoped lang="scss">
.github {
  .github-view {
    width: 500px;
    margin: 50px auto;
    padding: 50px 30px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 #e4e4e4;
    .title {
      font-size: 25px;
      text-align: center;
    }
    .github-main {
      .error {
        font-size: 22px;
        text-align: center;
        padding: 30px;
      }
      a {
        display: block;
        font-size: 20px;
        margin-top: 10px;
        color: #ea6f5a;
      }
      .create {
        padding-top: 30px;
        a {
          text-align: center;
        }
      }
      .login {
        display: block;
        font-size: 18px;
        margin-top: 10px;
        color: #ea6f5a;
        text-align: center;
        padding-top: 30px;
      }
      .bind {
        display: block;
        font-size: 18px;
        margin-top: 10px;
        color: #ea6f5a;
        text-align: center;
        padding-top: 30px;
      }
    }
    .loading {
      text-align: center;
      padding: 30px;
      p {
        font-size: 18px;
      }
      a {
        display: block;
        font-size: 18px;
        margin-top: 10px;
        color: #ea6f5a;
      }
    }
  }
}
</style>
