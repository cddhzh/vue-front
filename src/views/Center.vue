<template>
    <div class="me">
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">我的信息</h3>
            <el-row>
                <el-col>
                    <el-button @click="showDialog" type="primary" size="small" round
                    >更改密码</el-button
                    >
                </el-col>
            </el-row>
            <label>用户名：</label>
            <el-form-item prop="username">
                <el-input type="text"
                          v-model=ruleForm2.account
                          auto-complete="off"
                          placeholder="用户名"
                          style="width:40%"
                ></el-input>
            </el-form-item>
            <label>姓名：</label>
            <el-form-item prop="username">
                <el-input type="text"
                          v-model=ruleForm2.name
                          auto-complete="off"
                          placeholder="姓名"
                          style="width:40%"
                ></el-input>
            </el-form-item>
            <label>学校：</label>
            <el-form-item prop="school">
                <el-input type="text"
                          v-model=ruleForm2.school
                          auto-complete="off"
                          placeholder="学校"
                          style="width:40%"
                ></el-input>
            </el-form-item>
            <label>学院：</label>
            <el-form-item prop="academy">
                <el-input type="text"
                          v-model=ruleForm2.academy
                          auto-complete="off"
                          placeholder="学院"
                          style="width:40%"
                ></el-input>
            </el-form-item>
            <label>专业：</label>
            <el-form-item prop="academy">
                <el-input type="text"
                          v-model=ruleForm2.major
                          auto-complete="off"
                          placeholder="专业"
                          style="width:40%"
                ></el-input>
            </el-form-item>
        </el-form>
        <el-dialog title="更改密码" :visible.sync="dialogFormVisible">
            <el-form
                :model="form"
                ref="form"
                label-suffix=" : "
            >
                <el-form-item label="原密码" prop="oldpwd">
                    <el-input type="text"
                              v-model="form.oldpwd"
                              placeholder="请输入旧密码"
                              style="width:100%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动内容" prop="newpwd">
                    <el-input type="text"
                              v-model="form.newpwd"
                              placeholder="请输入新密码"
                              style="width:100%"
                              resize="none"
                    ></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changepwd()">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Center",
    created(){
        const _this = this
        this.admin=JSON.parse(window.localStorage.getItem('access-admin'))
        if(this.admin==null){
            this.$router.replace({path:'/login'})
        }
        axios.get('http://'+this.server+':8181/user/findbyid/'+JSON.parse(window.localStorage.getItem('access-admin')).uid).then(function (response) {
            // console.log(response.data)
            _this.ruleForm2 = response.data
            // _this.total = response.data.totalElements
        })
    },
    data(){
        return{
            server: '106.14.37.85',
            ruleForm2: {

            },
            rules2: {

            },
            user:{},
            checked: false,
            dialogFormVisible:false,
            form:[]
        }
    },
    methods:{
        showDialog(){
            this.dialogFormVisible=true;
            this.form={};
        },
        changepwd(){
            this.$refs.form.validate((valid) => {
                if(valid){
                    let _this = this
                    _this.user.account=_this.ruleForm2.account
                    _this.user.password=_this.form.oldpwd
                    axios.get('http://'+this.server+':8181/user/find',{params:_this.user}).then(function (resp) {
                        if(resp.data!=""){
                            //sessionStorage.setItem('username',_this.ruleForm2.userName)
                            _this.user=_this.ruleForm2
                            _this.user.password=_this.form.newpwd
                            axios.get('http://'+_this.server+':8181/user/updateUser',{params:_this.user}).then(function (resp) {
                                if(resp.data!=""){
                                    alert("更新密码成功")
                                    _this.dialogFormVisible=false
                                }else if(resp.data!=null){
                                    alert("fail")
                                }else{
                                    alert("network error!")
                                }
                            })
                        }else if(resp.data!=null){
                            alert("验证失败")
                            _this.dialogFormVisible=false
                        }else{
                            alert("nobody")
                        }
                    })
                }else{
                    alert('error submit!');
                    return false;
                }

            })
        },
    }

}
</script>

<style scoped>

</style>