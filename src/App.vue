<template>
    <div id="app">
        <div>
            <el-header style="height: 100px; width: 100%">
                <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    style="height: 100%"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#409EFF"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item style="height: 99%; ">
                        <router-link to="/"><el-image style="height: 100%" :src="require('../src/img/狗.png')"></el-image></router-link>
                    </el-menu-item>
                    <el-menu-item index="1" :style="itemstyle"><a href="/">首页</a></el-menu-item>
                    <el-menu-item align="center" :style="itemstyle">
                        <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            style="width: 100%;"
                            size="large"
                            clearable>
                        </el-input>
                    </el-menu-item>
<!--                    <el-submenu index="2" >-->
<!--                        <template slot="title">我的工作台</template>-->
<!--                        <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--                        <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--                        <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--                        <el-submenu index="2-4">-->
<!--                            <template slot="title">选项4</template>-->
<!--                            <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--                            <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--                            <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--                        </el-submenu>-->
<!--                    </el-submenu>-->
                    <el-menu-item index="3" style="float: right; " :style="itemstyle">
                        消息中心
                    </el-menu-item>
                    <el-menu-item :style="itemstyle" style="float: right" v-if="!flag">
                        <router-link to="/login">注册/登录</router-link>
                    </el-menu-item>
                    <el-dropdown index="4" :style="itemstyle" style="float: right" v-if="flag" >
                        <span class="el-dropdown-link">
                            <router-link to="/center">
                                <!--                                前往个人中心的链接-->
                                <el-avatar :size="50" :src="circleUrl"></el-avatar>
                            </router-link>
<!--                            下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                        </span>
<!--                        <template slot="title">-->
<!--                            <router-link to="/center">-->
<!--                                &lt;!&ndash;                                前往个人中心的链接&ndash;&gt;-->
<!--                                <el-avatar :size="50" :src="circleUrl"></el-avatar>-->
<!--                            </router-link>-->
<!--                        </template>-->
<!--                        <p>&nbsp;&nbsp;Hello, {{this.admin}}!</p>-->
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item index="4-1"><router-link to="/center">个人中心</router-link></el-dropdown-item>
                            <el-dropdown-item index="4-2">内容管理</el-dropdown-item>
                            <el-dropdown-item index="4-3" @click.native="exit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!--                    <el-menu-item index="4" ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->

                </el-menu>
            </el-header>
            <el-container>
                <el-aside style="width: 10%"></el-aside>
                <el-main style="width: 80%">
                    <router-view v-if="isShow"></router-view>
                </el-main>
                <el-aside style="width: 10%"></el-aside>
            </el-container>
            <el-footer>

            </el-footer>
        </div>
    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload,
            isShow:true
        }
    },
    data() {
        return {
            input: '',
            activeIndex2: '1',
            url: 'https://i0.hdslb.com/bfs/archive/f7099702f9903c279197ae3948ced7e1b64eefc0.png',
            itemstyle: {
                'height': '99%',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
            },
            circleUrl: null,
            flag: true,
            admin:'',
            isShow:true
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        submit(){
            if(true){
                this.$router.push('/login')
            }
        },
        exit(){
            window.localStorage.removeItem('access-admin')
            this.$router.push('/')
            this.$router.go(0)
        },
        reload(){
            this.isShow=false;
            this.$nextTick(()=>{
                this.isShow=true
            })
        }
    },
    created() {
        let admin=JSON.parse(window.localStorage.getItem('access-admin'))
        this.admin=admin;
        if (!admin) {
            this.flag=false
        }
        else{
            this.flag=true
            this.circleUrl=admin.avatar
        }
    }
}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
#app {
    min-height: 880px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background:url("assets/background.png");
    background-size: cover;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}
.menuitem {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
/*#nav a.router-link-exact-active {*/
/*    color: #42b983;*/
/*}*/

#building{
    background:url("assets/background.png");
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
}
</style>
