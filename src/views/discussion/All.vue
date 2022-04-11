<template>
    <el-container>
        <div style="font-size: 20px; float: left">总帖数：{{this.total}}</div>
        <el-main>
            <el-card v-for="index in pagesize" shadow="false" v-show="titles[index-1]!=null" @click.native="toPage(ids[index-1])">
                <el-container>
                    <el-aside style="width: 10%" >
                        <div style="height: 100%">
                            <el-avatar size="large" :src="avatars[index-1]" style="margin-top: 30%"></el-avatar>
                            <br>
                            <span>{{authorIDs[index-1]}}</span>
                        </div>
                    </el-aside>
                    <el-main style="width: 70%">
                        <div style="font-size: 30px;" align="left" >
                            <span>{{titles[index-1]}}</span>
                        </div>
                        <br>
                        <div align="left">{{contents[index-1] | ellipsis}}</div>
                    </el-main>
                    <el-aside style="width: 20%">
                        <div align="right">
                            <span>{{$moment(times[index-1]).format('YYYY-MM-DD HH:mm')}}</span>
                        </div>
                    </el-aside>
                </el-container>
            </el-card>
            <el-empty description="暂无评论" v-if="isEmpty"></el-empty>
        </el-main>
        <el-footer>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pagesize"
                @current-change="page"
                :total="total">
            </el-pagination>
        </el-footer>

    </el-container>

</template>

<script>
export default {
    name: "All",
    data() {
        return{
            total: null,
            pagesize: 3,
            tableData: [],
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            cellStyle: {
                'height': '100px'
            },
            ids: [],
            titles: [],
            contents: [],
            times: [],
            authorIDs: [],
            avatars: [],
            isEmpty: true
        }
    },
    methods: {
        page(currentPage){
            const _this = this
            axios.get("http://localhost:8181/discussion/findAll/"+currentPage+"/"+this.pagesize).then(function (resp){
                _this.tableData = resp.data.content
                _this.total = resp.data.totalElements
                _this.ids = []
                _this.titles = []
                _this.contents = []
                _this.times = []
                _this.authorIDs = []
                _this.avatars = []

                for (let i = 0; i < resp.data.content.length; i++) {
                    _this.ids.push(resp.data.content[i].id)
                    _this.titles.push(resp.data.content[i].title)
                    _this.contents.push(resp.data.content[i].content)
                    _this.times.push(resp.data.content[i].time)
                    _this.authorIDs.push(resp.data.content[i].authorID)
                    _this.avatars.push(resp.data.content[i].avatar)
                }
            })
        },
        handleClick(id, event){
            this.$router.push({
                path: '/reply',
                query: {
                    discussionid: id
                }
            })
        },
        toPage(id){
            this.$router.push("/reply?discussionid="+id).catch(err => {
            })
        }
    },
    created() {
        const _this = this
        axios.get("http://localhost:8181/discussion/findAll/1/"+this.pagesize).then(function (resp){
            _this.tableData = resp.data.content
            _this.total = resp.data.totalElements
            for (let i = 0; i < resp.data.content.length; i++) {
                _this.ids.push(resp.data.content[i].id)
                _this.titles.push(resp.data.content[i].title)
                _this.contents.push(resp.data.content[i].content)
                _this.times.push(resp.data.content[i].time)
                _this.authorIDs.push(resp.data.content[i].authorID)
                _this.avatars.push(resp.data.content[i].avatar)
            }
            if(_this.ids.length != 0){
                _this.isEmpty = false
            }
        })
    },
    filters:{
        ellipsis(value){
            if (!value) return '';
            if (value.length > 60) {
                return value.slice(0,60) + '...'
            }
            return value
        }
    }
}
</script>

<style scoped>
p{
    height: auto;word-break: break-all;word-wrap: break-word
}
</style>