<template>
    <el-container>
        <el-main style="width: 70%; height: 100%;">
            <el-card class="box-card" style="width: 99%;">
                <div>
                    <el-input style="width: 50%" v-model="findcontent"></el-input>&nbsp;
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary" @click="toAdd">发布问题</el-button>
                </div>
                <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" style="margin: 10px">
                        <el-tab-pane name="all" >
                            <span slot="label" class="fontClass">全部</span>
                            <all></all>
                        </el-tab-pane>
                        <el-tab-pane v-for="(item, key) in items" :name="item.id.toString()" :key="key" >
                            <span slot="label" class="fontClass">{{ item.subject }}</span>
                            <zone :id="item.id.toString()"></zone>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </el-main>
        <el-aside style="width: 30%">
            <el-main>
                <el-card class="box-card" style="width: 99%;height: 350px">
                    <div slot="header" class="clearfix">
                        <span>最近点赞</span>
                        <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
                    </div>
                    <el-card v-for="dis in thumbDis" shadow="false" @click.native="toPage(dis.id)">
                        {{dis.title}}
                    </el-card>
                </el-card>
                <el-card class="box-card" style="width: 99%; height: 340px">
                    <div slot="header" class="clearfix">
                        <span >最近收藏</span>
                        <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
                    </div>
                    <el-card v-for="dis in starDis" shadow="false" @click.native="toPage(dis.id)">
                        {{dis.title}}
                    </el-card>
                </el-card>
            </el-main>
        </el-aside>
    </el-container>

</template>

<script>
import All from "./All";
import Zone from "./Zone";
export default {
    name: "Discussion",
    components: {Zone, All},
    data() {
        return {
            activeName: 'all',
            items: [],
            divstyle: {
                'height': '100%',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'width': '100%'
            },
            findcontent: null,
            userid: JSON.parse(window.localStorage.getItem('access-admin')).uid,
            starDis: [],
            thumbDis: [],
        };
    },
    methods: {
        handleClick(tab, event) {
            // const _this = this
            // this.$router.push({path: '/discussion/zone?subjectid='+tab.name})
            // this.$router.push({
            //     path: '/discussion/zone',
            //     query: {
            //         subjectid: tab.name
            //     }
            // })
        },
        toAdd(){
            this.$router.push({path: "/addDiscussion"})
        },
        toPage(id){
            this.$router.push("/reply?discussionid="+id).catch(err => {
            })
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/subject/findAll').then(function (resp){
            _this.items = resp.data
            _this.items.reverse()
        })
        axios.get("http://localhost:8181/star_dis/findDiscussion/"+this.userid).then(function (resp){
            resp.data.reverse()
            for (let i = 0; i < 4; i++){
                if(i < resp.data.length)
                    _this.starDis.push(resp.data[i])
            }
        })
        axios.get("http://localhost:8181/thumb_dis/findDiscussion/"+this.userid).then(function (resp){
            resp.data.reverse()
            for (let i = 0; i < 4; i++){
                if(i < resp.data.length)
                    _this.thumbDis.push(resp.data[i])
            }
        })
    }
}
</script>

<style scoped>
    .box-card {
        width: 480px;
    }
    .fontClass{
        font-size:16px;
        /*font-family: Microsoft Yahei;*/
    }
</style>