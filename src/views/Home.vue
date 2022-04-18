<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="300px"
      style="width: 100%"
    >
      <el-carousel-item
          v-for="notice in notices" :key="notice.id"
          :style="'height: 100%; background: url('+notice.cover+') center no-repeat;background-size: 100% 100%;'"
      >
          <a :href="notice.url" target="_blank">
              <img style="width: 100%;height: 100%" :src="notice.cover" class="image" :title="notice.name">
<!--              <h1>{{notice.name}}</h1>-->
          </a>
      </el-carousel-item>
    </el-carousel>
    <el-container style="height: 200px">
      <el-card style="height: 100%; width: 100%;">
        <div slot="header" class="clearfix">
          <span>功能分区</span>
        </div>
        <el-button
          type="primary"
          icon="el-icon-edit"
          v-for="(item, key) in items"
          @click="toPage(item)"
          :key="key"
          v-if="item.url!=null"
        >
          {{ item.value }}
        </el-button>
      </el-card>
    </el-container>
    <el-container>
      <el-card class="box-card" style="width: 70%">
          <div slot="header" class="clearfix">
              <h1>最新问题</h1>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toDiscussion">
                  查看更多
              </el-button>
          </div>
          <el-card v-for="dis in discussions" shadow="false" @click.native="toDis(dis.id)">
              <el-container>
                  <el-main style="width: 70%">
                      <div style="font-size: 30px;" align="left" >
                          <span>{{dis.title}}</span>
                      </div>
                      <br>
                      <div align="left">{{dis.content | ellipsis}}</div>
                  </el-main>
                  <el-aside style="width: 20%">
                      <div align="right">
                          <span>{{$moment(dis.time).format('YYYY-MM-DD HH:mm')}}</span>
                      </div>
                  </el-aside>
              </el-container>
          </el-card>
      </el-card>
      <el-card class="box-card" style="width: 30%">
          <div slot="header" class="clearfix">
              <h1>最新通知</h1>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toNotice">查看更多</el-button>
          </div>
          <el-card v-for="notice in new_notices" shadow="false" >
              <a :href="notice.url" target="_blank">{{notice.name}}</a>
          </el-card>
      </el-card>
    </el-container>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Goods from "./Goods";

export default {
  data() {
    return {
        server: '106.14.37.85',
      items: [
          { value: "问题讨论", url: "/discussion" },
          { value: "二手交易", url: "/transaction/goods" },
          { value: "资料共享", url: null },
          { value: "活动参与", url: "/activity" },
          { value: "重要公告",url: "/notice" },
          { value: "技术分享", url: null }
      ],
        notices: [],
        discussions: [],
        new_notices: []
    };
  },
    created() {
        const _this = this
        axios.get("http://"+this.server+":8181/notice/findAllNotice").then(function (resp){
            resp.data.reverse()
            for (let i = 0; i < 4; i++){
                if(i == resp.data.length) break
                _this.notices.push(resp.data[i])
            }
            for (let i = 0; i < 6; i++){
                if(i == resp.data.length) break
                _this.new_notices.push(resp.data[i])
            }
        })
        axios.get("http://"+this.server+":8181/discussion/findAllDis").then(function (resp){
            resp.data.reverse()
            for (let i = 0; i < 4; i++){
                if(i == resp.data.length) break
                _this.discussions.push(resp.data[i])
            }
        })
    },
    methods: {
      toDiscussion(){
        this.$router.push("/discussion")
      },
        toNotice(){
          this.$router.push("/notice")
        },
      toPage(btn){
          this.$router.push({path: btn.url})
      },
        toDis(id){
            this.$router.push("/reply?discussionid="+id).catch(err => {
            })
        }
  },
    filters:{
        ellipsis(value){
            if (!value) return '';
            if (value.length > 80) {
                return value.slice(0, 80) + '...'
            }
            return value
        }
    },
  name: "Home",
  components: {
      Goods,
    HelloWorld,
  },
};
</script>
