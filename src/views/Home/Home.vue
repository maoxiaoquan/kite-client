<template>
  <div class="home-lay index-container"
       id="index">
    <div class="row">
      <div class="col-xs-12 col-sm-8--4 col-md-8--4">
        <!--home-lay layout-content start-->
        <section class="client-card">
          <!-- <NavHeader /> -->
          <NavColumn :navItem="articleColumn.homeColumn" />
          <NavSort @navTap="navTap"
                   ref="navSort"></NavSort>
          <scroll-loading @scroll-loading="infiniteHandler"
                          :isLoading="isLoading"
                          :isMore="isMore">
            <ArticleItem v-for="(item,key) in home.article.article_list"
                         :key="key"
                         :articleItem="item" />
          </scroll-loading>

        </section>
        <!--home-lay layout-content end-->
      </div>
      <div class="col-xs-12 col-sm-3--6 col-md-3--6">
        <!--aside.html start-->
        <div class="home-aside">
          <HomeAside />
        </div>
        <!--aside.html end-->
      </div>
    </div>
  </div>
</template>

<script>
import HomeAside from "@views/Home/HomeAside";
import NavHeader from "@views/Home/NavHeader";
import NavColumn from "@views/Home/NavColumn";
import NavSort from "@views/Home/NavSort";
import ArticleItem from "@views/Article/component/ArticleItem";
import { mapState } from "vuex";
import { ScrollLoading } from "@components";
import { baidu, google } from '@utils'
import googleMixin from '@mixins/google'

export default {
  name: "Home",
  mixins: [googleMixin], //混合谷歌分析
  metaInfo () {
    return {
      title: this.website.meta.website_name,
      titleTemplate: `%s - ${this.website.meta.introduction || ''}`,
      meta: [
        {
          // set meta
          name: "description",
          content: `${this.website.meta.description || ''}`
        },
        {
          // set meta
          name: "keywords",
          content: `${this.website.meta.keywords || ''}`
        },
        {
          // og:site_name
          property: "og:site_name",
          content: this.website.meta.website_name
        },
        {
          // og:site_name
          property: "og:image",
          content: this.website.meta.logo
        },
        {
          // og:type
          property: "og:type",
          content: `website`
        },
        {
          // og:title
          property: "og:title",
          content: this.website.meta.website_name
        },
        {
          // og:description
          property: "og:description",
          content: this.website.meta.description
        },
        {
          // og:url
          property: "og:url",
          content: this.website.meta.domain_name
        },
      ],
      htmlAttrs: {
        lang: "zh"
      },
      script: [
        ...baidu.resource({
          route: this.$route,
          config: this.website.config,
        }),
        ...google.statisticsCode({
          route: this.$route, googleCode: this.website.config.googleCode, random: ''
        })
      ],
      __dangerouslyDisableSanitizers: ['script']
    };
  },
  async asyncData ({ store, route, accessToken = "" }) {
    // 触发 action 后，会返回 Promise
    return Promise.all([
      store.commit(
        "articleColumn/SET_CURRENT_ARTICLE_COLUMN",
        ""
      ),
      store.commit("home/SET_INIT_INDEX_ARTICLE_LIST"), // 重置文章列表数据
      store.dispatch("articleColumn/GET_ARTICLE_COLUMN_ALL"),
      store.dispatch("home/GET_INDEX_ARTICLE_LIST", {
        type: route.query.type || '',
      })
    ]);
  },
  data () {
    return {
      page: 2,
      sort: "",
      isLoading: false,
      isMore: true
    };
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // this.initHomeDate()
    this.isMore = true;
    next();
  },
  created () {
    this.$store.dispatch("home/GET_POPULAR_ARTICLE_TAG"); // 获取热门文章标签
  },
  methods: {
    navTap (val) {
      this.sort = val;
      this.initHomeDate();
    },
    initHomeDate () {
      this.$store.commit("home/SET_INIT_INDEX_ARTICLE_LIST"); // 重置文章列表数据
      this.isMore = true;
      this.page = 1;
      this.infiniteHandler();
    },
    infiniteHandler () {
      this.isLoading = true;
      this.$store
        .dispatch("home/GET_INDEX_ARTICLE_LIST", {
          type: this.$route.query.type || '',
          sort: this.sort,
          page: this.page
        })
        .then(result => {
          this.isLoading = false;
          if (result.data.article_list.length === 10) {
            this.page += 1;
          } else {
            this.isMore = false;
          }
        })
        .catch(err => {
          this.isMore = false;
        });
    }
  },
  computed: {
    ...mapState(["home", "articleColumn", "website"]) // home:主页  article_column:文章的专栏
  },
  components: {
    NavHeader,
    HomeAside,
    NavColumn,
    ArticleItem,
    NavSort,
    ScrollLoading
  }
};
</script>

<style scoped lang="scss">
.home-lay {
  .client-card {
    position: relative;
    border-radius: 2px;
    padding: 0 15px;
    /deep/ .article {
      border-bottom: 1px solid #f7f7f7;
    }
  }
}
</style>

