<template>
  <client-only>
    <section class="layout-content detail-lay">
      <div class="container  box-container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-md-8 main">
            <div class="client-card pd20">
              <h3>经验明细</h3>
              <div class="amount">
                等级：<span class="amount-num">Lv {{ getLevel() || 0 }} </span>
                总经验：<span class="amount-num">{{ personalInfo.user_info.experience || 0 }}
                </span>
              </div>

              <table class="table-view">
                <tr>
                  <td style="width:20%"
                      class="hd">时间</td>
                  <td style="width:20%"
                      class="hd">数额</td>
                  <td style="width:20%"
                      class="hd">描述</td>
                </tr>
                <tr v-for="(detailItem, key) in detail.list"
                    :key="key">
                  <td style="width:20%">{{ detailItem.create_dt }}</td>
                  <td style="width:20%">
                    <span class="balance"> +{{ detailItem.value }} </span>
                  </td>
                  <td style="width:20%">
                    {{ detailItem.actionText + detailItem.typeText }}
                    <router-link style="color:#df5858"
                                 v-if="detailItem.type === modelName.article"
                                 :to="{
                        name: 'article',
                        params: { aid: detailItem.content.aid }
                      }">{{ detailItem.content.title }}</router-link>
                    <router-link style="color:#df5858"
                                 v-if="detailItem.type === modelName.dynamic"
                                 :to="{
                        name: 'dynamicView',
                        params: { dynamicId: detailItem.content.id }
                      }">{{ detailItem.content.content }}</router-link>
                  </td>
                </tr>
              </table>

              <Page :total="Number(detail.count)"
                    :pageSize="Number(detail.pageSize)"
                    :page="Number(detail.page) || 1"
                    @pageChange="pageChange"></Page>
            </div>
          </div>

          <div class="col-xs-12 col-sm-4 col-md-4 box-aside">
            <UserAside />
          </div>
        </div>
      </div>
    </section>
  </client-only>
</template>

<script>
import UserAside from '../view/UserAside'
import { mapState } from 'vuex'
import ClientOnly from 'vue-client-only'
import { Page, faceQQ, Dropdown } from '@components'
import { userMessageAction, modelName, userLevel } from '@utils/constant'

export default {
  name: 'Personal',
  metaInfo () {
    return {
      title: '个人中心',
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  data () {
    return {
      modelName,
      userLevel,
      detail: {
        list: [],
        count: 0,
        page: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    if (!this.personalInfo.islogin) {
      this.$router.push({ name: 'signIn' })
    }
    this.getVirtualList()
  },
  methods: {
    pageChange (val) {
      this.detail.page = val
      this.getVirtualList()
    },
    getVirtualList () {
      this.$store
        .dispatch('common/GET_EXPERIENCE_LIST', {
          uid: this.personalInfo.user.uid,
          page: this.detail.page,
          pageSize: this.detail.pageSize
        })
        .then(result => {
          this.detail = result.data
        })
    },
    getLevel () {
      let experience = this.personalInfo.user_info.experience
      if (experience > this.userLevel.five) {
        return 5
      } else if (experience > this.userLevel.four) {
        return 4
      } else if (experience > this.userLevel.three) {
        return 3
      } else if (experience > this.userLevel.two) {
        return 2
      } else if (experience > this.userLevel.one) {
        return 1
      } else if (experience < this.userLevel.one) {
        return 0
      }
    },
  },
  computed: {
    ...mapState(['personalInfo', 'user']) // personalInfo:个人信息  user:登录后的个人信息当前用户
  },
  components: {
    UserAside,
    ClientOnly,
    Page
  }
}
</script>

<style scoped lang="scss">
.detail-lay {
  .amount {
    margin-top: 10px;
    margin-bottom: 10px;
    .amount-num {
      color: #0aa31c;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .table-view {
    width: 100%;
    .hd {
      font-weight: bold;
    }
    tr {
      border-bottom: 1px solid #f3f3f3;
    }
    td {
      font-size: 14px;
      padding: 10px 0;
      .plus {
        color: #0aa31c;
      }
      .less {
        color: #ff3c00;
      }
      .balance,
      .amount {
        font-weight: bold;
      }
      .balance {
        color: #0aa31c;
      }
    }
  }
}
</style>
