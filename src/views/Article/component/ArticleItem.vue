<template>
  <article class="article">
    <div class="article-box"
         v-if="articleItem.aid">
      <router-link class="title"
                   :to="{ name: 'article', params: { aid: articleItem.aid } }">{{ articleItem.title }}</router-link>

      <ul class="meta-list">
        <li class="item">
          <span class="type"
                :class="`type${articleItem.type}`">{{
            articleTypeText[articleItem.type]
          }}</span>
        </li>
        <li class="item">
          <router-link :to="{
              name: 'user',
              params: { uid: articleItem.user.uid, routeType: 'article' }
            }"
                       class="name">{{ articleItem.user.nickname }}</router-link>
        </li>
        <li class="item">
          <time>{{ articleItem.create_dt }}</time>
        </li>
        <li class="item tag-view"
            v-if="articleItem.tag_ids">
          <router-link v-for="(itemTag, key) in articleItem.tag"
                       class="tag-class frontend"
                       :key="key"
                       :to="{ name: 'article_tag', params: { en_name: itemTag.en_name } }">{{ itemTag.name }}</router-link>
        </li>

        <li class="item"
            v-if="articleItem.article_blog">
          <router-link class="meta-item ContentItem-action"
                       :to="{
              name: 'articleBlog',
              params: { blogId: articleItem.article_blog.blog_id }
            }">
            {{ articleItem.article_blog.name }}
          </router-link>
        </li>
        <li class="item">
          <i class="el-icon-thumb"></i>
          <span>​​{{ articleItem.thumb_count }}​ </span>
        </li>

        <li class="item">
          <i class="el-icon-chat-dot-round"></i>
          <span>​​{{ articleItem.comment_count }}</span>
        </li>

        <li class="item">
          <i class="el-icon-view"></i>
          <span>​{{ articleItem.read_count }}</span>
        </li>
      </ul>
    </div>

    <div class="thumb"
         v-if="articleItem.cover_img">
      <router-link class="title"
                   :to="{ name: 'article', params: { aid: articleItem.aid } }">
        <img class="box-image"
             v-lazy="articleItem.cover_img"
             alt="" />
      </router-link>
    </div>
  </article>
</template>

<script>
import {
  statusList,
  articleType,
  statusListText,
  articleTypeText
} from '@utils/constant'

import { Dropdown } from '@components'
import { share } from '@utils'
import { mapState } from 'vuex'

export default {
  name: 'ArticleItem',
  props: {
    articleItem: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      articleType,
      articleTypeText
    }
  },
  methods: {
    shareChange (val) {
      // 分享到其他
      let urlOrigin = window.location.origin // 源地址
      if (val.type === 'sina') {
        // 新浪
        share.shareToXl(
          val.data.title,
          urlOrigin + '/p/' + val.data.aid,
          this.website.meta.logo
        )
      } else if (val.type === 'qzone') {
        // qq空间
        share.shareToQq(
          val.data.title,
          urlOrigin + '/p/' + val.data.aid,
          this.website.meta.logo
        )
      } else if (val.type === 'qq') {
        // qq空间
        share.shareQQ(
          val.data.title,
          urlOrigin + '/p/' + val.data.aid,
          this.website.meta.logo
        )
      }
    }
  },
  components: {
    'box-drop': Dropdown
  },
  computed: {
    ...mapState(['personalInfo', 'website'])
  }
}
</script>

<style scoped lang="scss">
.article {
  border-bottom: 1px solid #f7f7f7;
  padding: 15px 12px;
  align-items: center;
  display: flex;
  .article-box {
    flex: 1;
    .title {
      font-size: 16px;
      line-height: 23px;
      display: block;
      font-weight: 700;
      margin-bottom: 5px;
      color: #333;
    }
    .meta-list {
      display: block;
      .item {
        display: inline-block;
        font-size: 12px;
        color: #9b9b9b;
        vertical-align: middle;
        .type {
          padding: 2px 5px;
          border-radius: 5px;
          @for $i from 1 through 5 {
            &.type#{$i} {
              @if $i==1 {
                background-color: rgb(253, 239, 207);
                color: rgb(255, 174, 14);
              } @else if $i==2 {
                background-color: rgb(245, 243, 231);
                color: rgb(135, 125, 106);
              } @else if $i==3 {
                background-color: rgb(231, 243, 240);
                color: rgb(145, 203, 186);
              } @else if $i==4 {
                background-color: rgb(135, 198, 179);
                color: rgb(255, 255, 255);
              } @else if $i==5 {
                background-color: rgb(245, 243, 231);
                color: rgb(135, 125, 106);
              }
            }
          }
        }

        .tag-class + .tag-class::before {
          display: inline;
          content: " \B7 ";
          color: #9b9b9b;
          padding-left: 2px;
          padding-right: 2px;
        }
      }
      .item + .item::before {
        display: inline;
        content: " \B7 ";
        color: #9b9b9b;
        padding-left: 2px;
        padding-right: 2px;
      }
    }
  }
  .thumb {
    display: flex;
    width: 55px;
    height: 55px;
    flex: 0 0 55px;
    align-items: center;
    overflow: hidden;
  }
}

@media (max-width: 575px) {
  .article {
    padding: 10px 5px;
    .thumb {
      display: none;
    }
  }
}
</style>
