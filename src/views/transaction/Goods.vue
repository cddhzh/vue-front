<template>
    <el-container>
        <div class="infinite-list-wrapper" v-for="key1 in cardnum" :key="key1" style="width: 100%;" :gutter="20">
            <el-row v-infinite-scroll="load" infinite-scroll-disabled="disabled" :span="5" v-for="key2 in count" :key="key2">
                <el-col >
                    <el-card v-show="good.names[key1-1+cardnum*(key2-1)]!=null" shadow="never" align="center">
                        <router-link :to="'/transaction/good?goodid='+good.id[key1-1+cardnum*(key2-1)]">
                            <img style="border-radius: 20px" :src="good.covers[key1-1+cardnum*(key2-1)]" class="image">
                        </router-link>
                        <div style="padding: 14px;">
                            <router-link to="/transaction/good">
                                <span>{{good.names[key1-1+cardnum*(key2-1)]}}</span>
                            </router-link>
                            <div class="bottom clearfix">
                                <time class="time">{{ $moment(good.times[key1-1+cardnum*(key2-1)]).format('YYYY-MM-DD HH:mm') }}</time>
                            </div>
                        </div>
                    </el-card>
                    <br>
                </el-col>
            </el-row>
        </div>
    </el-container>
</template>

<script>
export default {
    name: "Goods",
    data() {
        return {
            good: {
                id: [],
                names: [],
                prices: [],
                times: [],
                urls: [],
                covers: []
            },
            cardnum: 4,
            count: 10,
            loading: false,
            length: 0
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/good/findAll').then( function (resp){
            resp.data.reverse()
            for (let i = 0; i < resp.data.length; i++) {
                _this.good.id.push(resp.data[i].id)
                _this.good.names.push(resp.data[i].goodname)
                _this.good.prices.push(resp.data[i].price)
                _this.good.times.push(resp.data[i].time)
                _this.good.urls.push(resp.data[i].url)
                if(resp.data[i].imgUrls != null){
                    _this.good.covers.push(resp.data[i].imgUrls[0])
                }
                else{
                    _this.good.covers.push("https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png")
                }
            }
            _this.length = resp.data.length
        })
    },
    computed: {
        noMore () {
            this.length = this.good.id.length
            return this.count >= Math.ceil(this.length/this.cardnum)
        },
        disabled () {
            return this.loading || this.noMore
        }
    },
    methods: {
        load () {
            this.loading = true
            this.length = this.good.id.length
            setTimeout(() => {
                this.count += 2
                this.loading = false
            }, 2000)
        }
    }
}
</script>

<style scoped>
.image {
    width: 80%;
    display: block;
}
</style>