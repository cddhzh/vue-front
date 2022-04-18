<template>
    <el-container>
        <el-main style="width: 70%; height: 100%">
            <el-card class="box-card" style="width: 99%">
                <div slot="header" class="clearfix">
                    <span style="float: left; font-size: 30px">问题</span>
                    <br><br>
                </div>
                <div>
                    <div>
                        <div align="left">
                            <el-avatar :size="70" :src="discussion.avatar"></el-avatar>
                            {{this.discussion.authorID}}
                        </div>
                    </div>
                    &nbsp;&nbsp;
                    <div>
                        <h1 style="margin: auto;font-size: 30px" align="left" >{{this.discussion.title}}</h1>
                    </div>
                    <div>
                        <p align="left" style="font-size: 20px;">
                            {{this.discussion.content}}
                        </p>
                    </div>
                    <br>
                    <div>
                        <el-button size="medium" style="float: left" type="primary" round icon="el-icon-edit" @click="changeVisible">
                            写回答
                        </el-button>
                        &nbsp;&nbsp;
                        <el-button
                            :type="thumb"
                            style="float: left"
                            @click="clickthumb"
                            icon="el-icon-thumb" circle>
                        </el-button>
                        &nbsp;&nbsp;
                        <el-button
                            :type="star"
                            style="float: left"
                            @click="clickstar"
                            icon="el-icon-star-off" circle>
                        </el-button>
                        <br><br>
                    </div>
                </div>
            </el-card>

            <el-card v-show="this.visible">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="form.content">
                </el-input>
                <br><br>
                <el-button round type="primary" style="float: right" @click="changeVisible">取消</el-button>
                <el-button round type="primary" style="float: right" @click="handleClick">发布</el-button>
                <br><br>
            </el-card>

            <el-card class="box-card" style="width: 99%">
                <div slot="header" class="clearfix">
                    <span style="float: left; font-size: 25px">所有回复</span>
                    <br><br>
                </div>
                <div v-for="(reply, key) in replys" :key="key" class="text item">
<!--                    {{'列表内容 ' + reply.content }}-->
                    <hr>
                    <div>
                        <p align="left"><el-avatar size="medium" :src="reply.avatar"></el-avatar>{{reply.authorID}}</p>
                    </div>
                    <div>
                        <p align="left" style="font-size: 18px">&nbsp;&nbsp;{{reply.content}}</p>
                    </div>
                </div>
                <el-empty description="暂无评论" v-if="isEmpty"></el-empty>
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
import AddReply from "./AddReply";
export default {
    name: "Reply",
    components: {AddReply},
    inject:[
        'reload'
    ],
    data(){
        return{
            server: "106.14.37.85",
            visible: false,
            replys:[],
            discussion: {},
            form: {
                id: null,
                discussionid: null,
                content: null,
                authorID: '',
            },
            star: null,
            thumb: null,
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            userid: JSON.parse(window.localStorage.getItem('access-admin')).uid,
            starDis: [],
            thumbDis: [],
            isEmpty: true
        }
    },
    created() {
        const _this = this
        axios.get("http://"+this.server+":8181/discussion/findByID/"+this.$route.query.discussionid).then(function (resp){
            _this.discussion = resp.data
        })
        axios.get('http://'+this.server+':8181/reply/findByDiscussionid/'+this.$route.query.discussionid).then(function (resp){
            _this.replys = resp.data
            if(_this.replys[0] != null){
                _this.isEmpty = false
            }
        })
        axios.get('http://'+this.server+':8181/star_dis/findById/'+this.$route.query.discussionid+'/'+this.userid).then(function (resp){
            if(resp.data){
                _this.star = "primary"
            }
            else{
                _this.star = null
            }
        })
        axios.get('http://'+this.server+':8181/thumb_dis/findById/'+this.$route.query.discussionid+'/'+this.userid).then(function (resp){
            if(resp.data){
                _this.thumb = "primary"
            }
            else{
                _this.thumb = null
            }
        })
        axios.get("http://"+this.server+":8181/star_dis/findDiscussion/"+this.userid).then(function (resp){
            resp.data.reverse()
            for (let i = 0; i < 4; i++){
                if(i < resp.data.length)
                    _this.starDis.push(resp.data[i])
            }
        })
        axios.get("http://"+this.server+":8181/thumb_dis/findDiscussion/"+this.userid).then(function (resp){
            resp.data.reverse()
            for (let i = 0; i < 4; i++){
                if(i < resp.data.length)
                    _this.thumbDis.push(resp.data[i])
            }
        })
    },
    methods: {
        update(){
            this.reload()
        },
        changeVisible(){
            this.visible = !this.visible
        },
        handleClick(){
            const _this = this
            this.form.discussionid = this.$route.query.discussionid
            this.form.authorID = JSON.parse(window.localStorage.getItem('access-admin')).name
            axios.post("http://"+this.server+":8181/reply/save", this.form).then(function (resp){
                if(resp.data != null){
                    alert("发布成功！")
                    window.location.reload()
                }
            })
        },
        clickstar(){
            if(this.star==null){
                this.star = 'primary'
                this.staron()
            }
            else{
                this.star = null
                this.staroff()
            }
            this.$router.go(0)
        },
        staron(){
            axios.post("http://"+this.server+":8181/star_dis/star/" + this.$route.query.discussionid+"/" + this.userid).then(function (resp){

            })
        },
        staroff(){
            axios.post("http://"+this.server+":8181/star_dis/staroff/" + this.$route.query.discussionid+"/" + this.userid).then(function (resp){

            })
        },
        clickthumb(){
            if(this.thumb==null){
                this.thumb = "primary"
                this.thumbon()
            }
            else{
                this.thumb = null
                this.thumboff()
            }
            this.$router.go(0)
        },
        thumbon(){
            axios.post("http://"+this.server+":8181/thumb_dis/thumb/" + this.$route.query.discussionid+"/" + this.userid).then(function (resp){

            })
        },
        thumboff(){
            axios.post("http://"+this.server+":8181/thumb_dis/thumboff/" + this.$route.query.discussionid+"/" + this.userid).then(function (resp){

            })
        },
        toPage(id){
            this.$router.push("/reply?discussionid="+id).catch(err => {
            })
            this.update();
        }
    }
}
</script>

<style scoped>
/deep/.el-textarea__inner{
    line-height: 2;
    font-size: 20px;
    font-family: "Hiragino Sans GB";
}
p{
    height: auto;word-break: break-all;word-wrap: break-word
}
</style>