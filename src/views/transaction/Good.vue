<template>
    <el-container>
        <el-aside style="width: 10%"></el-aside>
        <el-main style="width: 80%">
            <el-card style="width: 99%">
                <el-container>
                    <el-main style="width: 60%">
                        <div class="block">
                            <el-carousel trigger="click" height="300px">
                                <el-carousel-item v-for="item in good.imgUrls" :key="item">
                                    <img style="width: 100%;height: 100%" :src="item" class="image">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-main>
                    <el-aside style="width: 40%;">
                        <el-main style="height: 99%">
                            <el-card style="height: 99%" shadow="never">
                                <div slot="header" class="clearfix">
                                    <span style="float: left; font-size: 30px">{{good.goodname}}</span>
                                    <br><br>
                                </div>
                                <div>
                                    <span style="float: left; font-size: 25px">Price: ￥{{good.price}}</span>
                                </div>
                                <br><br><br>
                                <div>
                                    <span style="float: left; font-size: 16px">发布者：{{good.ownerid}}</span>
                                </div>
                                <br><br>
                                <div>
                                    <span style="float: left; font-size: 16px">发布时间：{{$moment(good.time).format('YYYY-MM-DD HH:mm')}}</span>
                                </div>
                                <br><br><br>
                                <div>
                                    <el-button @click="clickthumb" style="float: left" :type="thumb" icon="el-icon-thumb"></el-button>
                                    &nbsp;&nbsp;
                                    <el-button @click="clickstar" style="float: left" :type="star" icon="el-icon-star-off" ></el-button>
                                </div>
                            </el-card>
                        </el-main>
                    </el-aside>
                </el-container>
            </el-card>
            <el-card style="width: 99%">
                <el-main>
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="商品详情" name="1">
                            <p align="left">{{good.description}}</p>
                        </el-collapse-item>
                        <el-collapse-item title="商品链接" name="2">
                        </el-collapse-item>
                    </el-collapse>
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
                    <el-card class="box-card" style="width: 99%" shadow="never">
                        <div slot="header" class="clearfix">
                            <span style="float: left; font-size: 25px">所有回复</span>
                            <el-button type="primary" style="float: right" @click="changeVisible">评论</el-button>
                            <br><br>
                        </div>
                        <div v-for="(reply, key) in replys" :key="key" class="text item">
                            <hr>
                            <div>
                                <p align="left"><el-avatar :src="reply.avatar"></el-avatar>{{reply.authorid}}</p>
                            </div>
                            <div>
                                <p align="left" style="font-size: 18px">&nbsp;&nbsp;{{reply.content}}</p>
                                <span style="float: left">{{$moment(reply.time).format('YYYY-MM-DD HH:mm')}}</span>
                            </div>
                        </div>
                    </el-card>
                </el-main>
                <el-aside>

                </el-aside>
            </el-card>
        </el-main>
        <el-aside style="width: 10%"></el-aside>
    </el-container>
</template>

<script>
export default {
    name: "Good",
    data() {
        return {
            visible: false,
            activeNames: ['1','2'],
            good: {},
            thumb: null,
            star: null,
            userid: JSON.parse(window.localStorage.getItem('access-admin')).uid,
            form: {
                content: null,
                id: null,
                goodid: null,
                authorid: JSON.parse(window.localStorage.getItem('access-admin')).name,
                time: null
            },
            replys: []
        };
    },
    created() {
        const _this = this
        axios.get("http://localhost:8181/good/findById/"+this.$route.query.goodid).then(function (resp){
            _this.good = resp.data
        })
        axios.get('http://localhost:8181/star_good/findById/'+this.$route.query.goodid+'/'+this.userid).then(function (resp){
            if(resp.data){
                _this.star = "primary"
            }
            else{
                _this.star = null
            }
        })
        axios.get('http://localhost:8181/thumb_good/findById/'+this.$route.query.goodid+'/'+this.userid).then(function (resp){
            if(resp.data){
                _this.thumb = "primary"
            }
            else{
                _this.thumb = null
            }
        })
        axios.get("http://localhost:8181/good_reply/findByGoodid/"+this.$route.query.goodid).then(function (resp){
            _this.replys = resp.data
        })
    },
    methods: {
        changeVisible(){
            this.visible = !this.visible
        },
        handleChange(val) {
            console.log(val);
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
        },
        staron(){
            axios.post("http://localhost:8181/star_good/star/" + this.$route.query.goodid+"/" + this.userid).then(function (resp){

            })
        },
        staroff(){
            axios.post("http://localhost:8181/star_good/staroff/" + this.$route.query.goodid+"/" + this.userid).then(function (resp){

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
        },
        thumbon(){
            axios.post("http://localhost:8181/thumb_good/thumb/" + this.$route.query.goodid+"/" + this.userid).then(function (resp){

            })
        },
        thumboff(){
            axios.post("http://localhost:8181/thumb_good/thumboff/" + this.$route.query.goodid+"/" + this.userid).then(function (resp){

            })
        },
        handleClick(){
            const _this = this
            this.form.goodid = this.$route.query.goodid
            this.form.time = new Date()
            axios.post("http://localhost:8181/good_reply/save", this.form).then(function (resp){
                if(resp.data != null){
                    alert("发布成功！")
                    window.location.reload()
                }
            })
        }
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
p{
    height: auto;word-break: break-all;word-wrap: break-word
}
</style>