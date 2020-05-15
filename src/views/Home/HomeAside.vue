<template>
  <div class="home-lay layout-aside">
    <div class="aside-component client-card-shadow">
      <h3 class="as-title">写下你想说的</h3>
      <div class="issue-btn">
        <a href="javascript:;"
           @click="createArticle"
           class="btn-note">
          <i class="el-icon-edit"></i>
          <span class="label-title">写文章</span>
        </a>
        <a href="javascript:;"
           @click="createDynamic"
           class="btn-dynamic">
          <i class="el-icon-chat-line-round"></i>
          <span class="label-title">发片刻</span>
        </a>
        <a href="javascript:;"
           @click="createBooks"
           class="btn-book">
          <i class="el-icon-notebook-2"></i>
          <span class="label-title">撰小书</span>
        </a>
      </div>
    </div>

    <div class="new-dynamic client-card">
      <h3 class="as-title">
        最新片刻
      </h3>
      <ul class="dynamic-list">
        <li class="item"
            v-for="(item,key) in newDynamicList"
            :key="key">
          <router-link class="avatar"
                       :to="{
              name: 'user',
              params: { uid: item.user.uid, routeType: 'article' }
            }">
            <div class="avatar-img"
                 :style="`background-image: url(${item.user.avatar});`"></div>
          </router-link>
          <router-link class="dynamic"
                       :to='{name:"dynamicView",params:{dynamicId:item.id}}'>
            <div class="content-box"
                 v-html="contentRender(item.content)">
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="hot-tags-for-sidebar client-card">
      <header class="heading u-clearfix heading--borderedBottom heading--allCaps heading--normal heading--simple xzl-margin-bottom15">
        <div class="u-clearfix">
          <div class="heading-content hot-tags-header u-floatLeft">
            <span class="as-title">
              热门标签
            </span>
            <span class="hot-tags-more">
              <router-link :to="{ name: 'subscribe_tag', params: { type: 'all' } }">查看更多 &gt;</router-link>
            </span>
          </div>
        </div>
      </header>
      <ul class="tags xzl-tags-list hot-sidebar-items hot-tags-sidebar tags--light">
        <li v-for="(item, key) in home.popular_article_tag"
            :key="key">
          <router-link class="link xzl-link-color"
                       :to="{ name: 'article_tag', params: { en_name: item.en_name } }">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="notice client-card-shadow"
         v-if="website.notice.length > 0">
      <h3 class="as-title">公告</h3>
      <a class="notice-item"
         v-for="(item, key) in website.notice"
         v-if="item.enable"
         :href="item.link"
         :key="key">{{ item.title }}</a>
    </div>

    <div class="advertise client-card"
         v-if="website.advertise.length > 0">
      <div class="advertise-item"
           v-for="(advertiseItem, key) in website.advertise"
           v-if="advertiseItem.enable"
           :key="key">
        <a class="advertise-img"
           :href="advertiseItem.link || 'javascript:;'"
           v-if="advertiseItem.img_url">
          <div class="image"
               :style="`background-image: url(${advertiseItem.img_url||''})`"></div>
        </a>
        <a class="advertise-text"
           :href="advertiseItem.link || 'javascript:;'"
           v-else>
          {{ advertiseItem.title }}
        </a>
      </div>
    </div>

    <div class="website-information client-card">
      <ul class="more-list">
        <li class="item"
            v-if="website.meta.about">
          <a :href="website.meta.about"
             target="_blank">关于</a>
        </li>
        <li class="item"
            v-if="website.meta.feedback">
          <a :href="website.meta.feedback"
             target="_blank">建议反馈</a>
        </li>
      </ul>
      <ul class="more-list"
          v-if="website.meta.miibeian">
        <li class="item">
          <a href="http://www.beian.miit.gov.cn"
             target="_blank">{{
            website.meta.miibeian
          }}</a>
        </li>
      </ul>
      <ul class="more-list">
        <li class="item">
          <a>©{{ currYear }} {{ website.meta.website_name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faceQQ } from '@components'
export default {
  name: 'HomeAside',
  mounted () {
    this.getNewDynamic()
  },
  data () {
    return {
      newDynamicList: []
    }
  },
  methods: {
    getNewDynamic () {
      this.$store.dispatch("dynamic/GET_RECOMMEND_DYNAMIC_LIST", { type: "new" }).then(result => {
        this.newDynamicList = result.data.list || []
      })
    },
    createDynamic () {
      if (!this.$store.state.personalInfo.islogin) {
        this.$router.push({ name: 'signIn' })
      } else {
        this.$router.push({
          name: 'dynamics',
          params: { dynamicTopicId: 'newest' }
        })
      }
    },
    contentRender (val) {
      let content = val;
      faceQQ.map(faceItem => {
        content = content.replace(
          new RegExp("\\" + faceItem.face_text, "g"),
          faceItem.face_view
        );
      });
      return content;
    },
    createBooks () {
      if (!this.$store.state.personalInfo.islogin) {
        this.$router.push({ name: 'signIn' })
      } else {
        this.$router.push({ name: 'booksWrite', params: { type: 'create' } })
      }
    },
    createArticle () {
      if (!this.$store.state.personalInfo.islogin) {
        this.$router.push({ name: 'signIn' })
      } else {
        this.$router.push({ name: 'Write', params: { type: 'create' } })
      }
    }
  },
  computed: {
    ...mapState(['home', 'website']),
    currYear () {
      let date = new Date()
      let year = date.getFullYear()
      return year
    }
  }
}
</script>

<style scoped lang="scss">
.layout-aside {
  .as-title {
    font-size: 15px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: normal;
    margin-bottom: 16px;
    position: relative;
    padding-left: 12px;
    &::before {
      content: "";
      width: 4px;
      height: 20px;
      position: absolute;
      top: 4px;
      left: 0;
      border-radius: 2px;
      background: #ec7259;
    }
  }
  .new-dynamic,
  .notice,
  .hot-tags-for-sidebar,
  .aside-component,
  .website-information {
    padding: 20px;
    background-color: #fff;
    color: #8a6d3b;
    margin-bottom: 10px;
  }

  .new-dynamic {
    .dynamic-list {
      .item {
        display: flex;
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px solid #f7f7f7;
        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }
        .avatar {
          width: 38px;
          height: 38px;
          flex: 0 0 38px;
          margin-right: 10px;
          .avatar-img {
            height: 38px;
            width: 38px;
            border-radius: 3px 3px 3px 3px;
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.02);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
          }
        }
        .dynamic {
          line-height: 18px;
          flex: 1;
          font-size: 13px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }
      }
    }
  }

  .notice {
    .notice-item {
      display: block;
      line-height: 20px;
      color: #8a6d3b;
      font-size: 13px;
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: 1px solid #f7f7f7;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .advertise {
    margin-bottom: 10px;
    padding-top: 15px;
    .advertise-item {
      overflow: hidden;
      margin-bottom: 10px;
      .advertise-img {
        border-radius: 12px;
        overflow: hidden;
        display: block;
        padding: 0 15px;
        .image {
          position: relative;
          height: 180px;
          width: 100%;
          max-width: 100%;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          cursor: zoom-in;
          p {
            font-size: 14px;
            padding: 30px;
          }
        }
      }
      .advertise-text {
        font-size: 14px;
        color: #666;
      }
    }
  }
  .aside-component {
    .issue-btn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      a {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        flex: 1;
        text-align: center;
        position: relative;
        i {
          margin-right: 10px;
          font-size: 20px;
          margin-bottom: 8px;
        }
        .label-title {
          color: #333;
          font-size: 14px;
          display: block;
        }
      }
    }
  }

  .hot-tags-for-sidebar {
    .hot-tags-header {
      position: relative;
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      line-height: 1;
      .hot-tags-more {
        margin-left: auto;
        font-size: 14px;
        margin-bottom: 16px;
        color: #c7c7c7;
      }
    }
    ul.hot-sidebar-items li {
      display: inline-block;
      a {
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        margin-right: 8px;
        color: #888;
        margin-bottom: 8px;
        padding: 3px 8px;
        background: rgba(0, 0, 0, 0.03);
        display: block;
        font-size: 13px;
      }
    }
  }

  .website-information {
    ul {
      display: block;
      li {
        display: inline-block;
        font-size: 14px;
        margin-right: 30px;
        margin-top: 10px;
        a {
          color: rgba(0, 0, 0, 0.44) !important;
          fill: rgba(0, 0, 0, 0.44) !important;
          line-height: 20px;
        }
      }
    }
  }
}

@media (max-width: 575px) {
  body {
    .layout-aside {
      display: none;
    }
  }
}
</style>
