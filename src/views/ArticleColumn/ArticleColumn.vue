<template>
  <div class="article-column"
       id="article-column">
    <div class="container  box-container client-card">

      <nav class="switch-list-nav">
        <div class="nav-list">
          <router-link class="nav-item"
                       :to="{name:'columnAll'}">专栏</router-link>
          <router-link class="nav-item"
                       :to="{name:'subscribe_tag',params:{type:'all'}}">全部标签</router-link>
        </div>
      </nav>

      <div class="content">

        <div class="column-view clearfix">
          <div class="column-item"
               v-for="(item_column,key) in articleColumn.column_list.list"
               v-if="item_column.en_name!=='all'"
               :key="key">
            <div class="column-item-box">
              <h2 class="title">{{item_column.name}}</h2>
              <ul class="tag-body">
                <li v-for="(itemTag,key) in item_column.tag"
                    :key="key">
                  <router-link class="tag-class frontend"
                               :to="{name:'article_tag',params:{en_name:itemTag.en_name}}">
                    <div class="img"
                         :alt="itemTag.name"
                         :style="`background-image: url(${itemTag.icon})`"></div>
                    {{itemTag.name}}
                  </router-link>

                </li>
              </ul>
            </div>
          </div>

        </div>

        <Page :total="Number(articleColumn.column_list.count)"
              :pageSize="Number(articleColumn.column_list.pageSize)"
              :page="Number($route.query.page)||1"
              @pageChange="pageChange"></Page>

      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Page } from '@components'
import { share, baidu, google } from '@utils'
import googleMixin from '@mixins/google'

export default {
  name: 'ArticleColumn',
  minixs: [googleMixin], //混合谷歌分析
  metaInfo () {
    return {
      title: '专栏',
      titleTemplate: `%s - ${this.website.meta.website_name}`,
      meta: [{                 // set meta
        name: 'description',
        content: `专栏-${this.website.meta.website_name}`,
      }],
      htmlAttrs: {
        lang: 'zh'
      },
      script: [
        ...baidu.resource({
          route: this.$route,
          config: this.website.config
        }),
        ...google.statisticsCode({
          route: this.$route, googleCode: this.website.config.googleCode, random: ''
        })
      ],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
  async asyncData ({ store, route, accessToken = '' }) {
    return Promise.all([
      store.dispatch('articleColumn/GET_ARTICLE_COLUMN_LIST', {
        page: route.query.page || 1
      })
    ])
  },
  methods: {
    pageChange (val) {
      this.$router.push({
        name: 'column',
        query: {
          page: val
        }
      })
    },
  },
  computed: {
    ...mapState(['articleColumn', 'website']),
  },
  components: {
    Page
  }
}
</script>

<style scoped lang="scss">
#article-column {
  .client-card {
    padding: 25px 35px;
  }
  .switch-list-nav {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    margin-bottom: 25px;
    .nav-list {
      align-items: center;
      line-height: 1;
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      .current-active {
        color: #ea6f5a;
      }
    }
    .nav-item {
      padding: 0 15px;
      font-size: 14px;
      border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  .content {
    .column-view {
      margin-left: -7px;
      margin-right: -7px;
      display: flex;
      flex-wrap: wrap;
      .column-item {
        flex-basis: 33.333%;
        position: relative;
        margin-bottom: 30px;
        .column-item-box {
          padding: 0 7px;
          .title {
            margin: 0;
            line-height: 32px;
            font-weight: bold;
            font-size: 14px;
            color: #333;
            margin-bottom: 15px;
            border-bottom: 1px solid rgba(178, 186, 194, 0.15);
          }

          .tag-body {
            display: block;
            li {
              position: relative;
              list-style: none;
              margin: 0 15px 15px 0;
              font-size: 12px;
              display: inline-block;
              > a {
                color: var(--layer-color);
                padding: 2px 5px;
                border: 1px solid transparent;
                position: relative;
                white-space: nowrap;
                word-wrap: normal;
                display: block;
                background-color: var(--light);
                border-radius: 3px 3px 3px 3px;
                line-height: 21px;
                .img {
                  border-radius: 2px 2px 2px 2px;
                  height: 16px;
                  width: 16px;
                  float: left;
                  margin: 2px 3px 0 0;
                  background-color: rgba(0, 0, 0, 0.02);
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
