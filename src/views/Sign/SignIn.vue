<template>
  <ClientOnly>
    <section class="sign-lay layout-content">
      <div class="sign-view client-card">
        <div class="title">
          登录
        </div>
        <div class="js-sign-in-container">
          <form id="new_session"
                ref="login">
            <!-- 正常登录登录名输入框 -->
            <div class="input-prepend restyle js-normal">
              <input placeholder="邮箱"
                     type="text"
                     v-model="formData.email"
                     @keyup.enter="login"
                     value="" />
              <i class="el-icon-user-solid"></i>
            </div>

            <div class="input-prepend">
              <input placeholder="密码"
                     type="password"
                     v-model="formData.password"
                     name="password"
                     @keyup.enter="login"
                     value="" />
              <i class="el-icon-key"></i>
            </div>

            <div class="remember-btn clearfix">
              <div class="pull-left">
                没有账号？ <em class="reg-btn"
                    @click="tapRegister">注册</em>
              </div>
              <div class="pull-right">
                <a href="javascript:;"
                   @click="tapResetPassword">忘记密码</a>
              </div>
            </div>

            <div class="footer-text"></div>

            <button class="sign-in-button"
                    id="sign-in-form-submit-btn"
                    type="button"
                    @click="login">
              登录
            </button>

            <div class="other-login"
                 v-if="~website.oauths.indexOf('github')">
              <a href="/api-client/v1/oauth/github-oauth"
                 class="github">通过github登录</a>
            </div>

            <router-link class="return-home"
                         :to="{ name: 'home' }">返回首页</router-link>
          </form>
        </div>
      </div>
    </section>
    <!--home-lay layout-content end-->
  </ClientOnly>
</template>

<script>
import { cookie } from '../../utils/cookie.js'
import ClientOnly from 'vue-client-only'
import { mapState } from 'vuex'
export default {
  name: 'SignIn',
  metaInfo () {
    return {
      title: `${this.website.website_name}-登录`,
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  asyncData ({ store, route, accessToken = '' }) {
    // 触发 action 后，会返回 Promise
    return Promise.all([
      store.dispatch('PERSONAL_INFO', { accessToken }),
      store.dispatch('website/GET_WEBSITE_INFO'),
      store.dispatch('articleTag/GET_ARTICLE_TAG_ALL')
    ])
  },
  data () {
    return {
      formData: {
        email: '',
        phone: '',
        type: 'email',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('sign/LOGIN', this.formData).then(res => {
        if (res.state === 'success') {
          this.$message.success(res.message)
          this.$refs.login.reset()
          cookie.set('accessToken', res.data.token, 7)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    tapRegister () {
      this.$router.push({ name: 'signUp' })
    },
    tapResetPassword () {
      this.$router.push({ name: 'resetPassword' })
    }
  },
  computed: {
    ...mapState(['website'])
  },
  components: {
    ClientOnly
  }
}
</script>

<style scoped lang="scss">
/*sign-in start*/
.reg-btn {
  color: #3194d0;
  cursor: pointer;
}
.return-home {
  font-size: 14px;
  display: inline-block;
  padding-top: 20px;
}
.github {
  display: block;
  margin-top: 10px;
  float: none;
  padding: 3px 10px;
  border: none;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: none;
  border-radius: 8px;
  line-height: 2em;
  vertical-align: middle;
  color: #fff;
  background-color: #5bc0de;
}
</style>
