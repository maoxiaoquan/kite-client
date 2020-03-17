<template>
  <client-only>
    <section class="layout-content detail-lay">
      <div class="container  box-container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-md-8 main">
            <div class="client-card pd20">
              <h3>收藏</h3>
              <section class="collect-lay layout-content">
                <div class="filter">
                  <span class="filter-item"
                        @click="switchType({})"
                        :class="{'active':!type}">全部</span>
                  <span class="filter-item"
                        v-for="(item,key) in typeList"
                        :key="key"
                        @click="switchType(item)"
                        :class="{'active':type===item.type}"
                        href="javascript:;">{{item.text}}</span>
                </div>
                <div class="collect-list row">
                  <div class="col-xs-12 col-sm-6 col-md-6"
                       v-for="(item,key) in detail.list"
                       :key="key">
                    <div class="item">
                      <i class="tag">{{modelInfo[item.type].name}}</i>
                      <router-link v-if="item.type == modelName.article"
                                   class="title"
                                   :to="{ name: 'article', params: { aid: item.info.aid } }">{{ item.info.title }}</router-link>
                      <router-link v-if="item.type == modelName.books"
                                   :to="{name: 'book',
                                  params: { books_id: item.info.books_id }
                                }">{{ item.info.title }}</router-link>
                      <span class="cancal-collect"
                            @click="onUserCollect(item)">取消收藏</span>
                    </div>
                  </div>
                </div>
                <Page :total="Number(detail.count)"
                      :pageSize="Number(detail.pageSize)"
                      :page="Number(detail.page) || 1"
                      @pageChange="pageChange"></Page>
              </section>
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

import { mapState } from 'vuex'
import ClientOnly from 'vue-client-only'
import { Page } from '@components'
import UserAside from '../view/UserAside'
import {
  statusList,
  statusListText,
  payTypeText,
  isFree,
  isFreeText,
  modelName,
  modelInfo
} from '@utils/constant'

export default {
  name: 'Collect',
  metaInfo () {
    return {
      title: '收藏集',
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  data () {
    return {
      typeList: [
        {
          type: modelName.article,
          text: '文章'
        },
        {
          type: modelName.books,
          text: '小书'
        }
      ],
      modelName,
      modelInfo,
      type: '',
      detail: {
        list: [],
        page: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    pageChange (val) {
      this.detail.page = val
      this.getList()
    },
    onUserCollect (item) {
      /*用户collect 文章*/
      this.$store
        .dispatch('common/SET_COLLECT', {
          associate_id: item.associate_id,
          type: item.type
        })
        .then(result => {
          this.$message.warning(result.message)
          if (result.state === 'success') {
            this.$store.dispatch('user/GET_ASSOCIATE_INFO')
            this.getList()
          }
        })
    },
    switchType (item) {
      this.type = item.type || ''
      this.getList()
    },
    getList () {
      this.$store
        .dispatch('common/GET_COLLECT_LIST', {
          uid: this.personalInfo.user.uid,
          page: this.detail.page,
          type: this.type || '',
          pageSize: this.detail.pageSize
        })
        .then(result => {
          this.detail = result.data
        })
    }
  },
  computed: {
    ...mapState(['personalInfo', 'user']),  // personalInfo:个人信息  user:登录后的个人信息当前用户
  },
  components: {
    ClientOnly,
    UserAside,
    Page
  }
}
</script>

<style scoped lang="scss">
.collect-lay {
  .filter {
    padding-top: 20px;
    .filter-item {
      display: inline-block;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.56);
      text-align: center;
      padding: 3px 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 14px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      &.active {
        background: #f46300;
        border-color: #f46300;
        color: #fff;
      }
    }
  }

  .collect-list {
    .item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      height: 80px;
      position: relative;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 10px;
      .tag {
        padding: 2px 5px;
        font-size: 12px;
        border-radius: 5px;
        background-color: rgb(253, 239, 207);
        color: rgb(255, 174, 14);
      }
      .cancal-collect {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 2px 5px;
        cursor: pointer;
        display: none;
        font-size: 12px;
        border-radius: 5px;
        background-color: rgb(253, 239, 207);
        color: rgb(255, 174, 14);
      }
      &:hover {
        .cancal-collect {
          display: block;
        }
      }
    }
  }
}
</style>
