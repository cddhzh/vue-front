<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text"
                          v-model="ruleForm2.account"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm2.password"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" >登录</el-button>
            </el-form-item>
            <!--<el-form-item style="width:100%;">-->
            <!--<el-button type="info" style="width:100%;" @click="handleRegister" :loading="registering">注册</el-button>-->
            <!--</el-form-item>-->
            <router-link to="/register">注册</router-link>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            ruleForm2: {
                account: '',
                password: '',
            },
            rules2: {
                userName: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false,
            user: {
                uid: null,
                school: null,
                name: null,
                token: null,
                avatar: null
            }
        }

    },
    methods: {
        handleSubmit(){
            this.$refs.ruleForm2.validate((valid) => {
                if(valid){
                    let _this = this
                    axios.get('http://106.14.37.85:8181/user/find',{params:_this.ruleForm2}).then(function (resp) {
                        if(resp.data!=""){
                            alert("成功")
                            //sessionStorage.setItem('username',_this.ruleForm2.userName)
                            _this.user.uid = resp.data.id
                            _this.user.name = resp.data.account
                            _this.user.school = resp.data.school
                            _this.user.token = resp.data.token
                            _this.user.avatar = resp.data.avatar
                            localStorage.setItem('access-admin',JSON.stringify(_this.user))
                            _this.$router.push({path:'/'})
                            _this.$router.go(0)
                        }else if(resp.data!=null){
                            alert("fail")
                        }else{
                            alert("nobody")
                        }
                    })
                }else{
                    alert('error submit!');
                    return false;
                }

            })
        }
    },
}
</script>

<style scoped>
.login-container {
    width: 100%;
    /*height: 100%;*/
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>