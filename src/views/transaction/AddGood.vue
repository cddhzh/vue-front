<template>
    <el-container align="center">
        <el-aside style="width: 10%"></el-aside>
        <el-main style="width: 80%">
            <el-card style="width: 99%" >
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="商品名称" prop="goodname">
                        <el-input v-model="form.goodname" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="description">
                        <el-input
                            type="textarea"
                            :rows="10"
                            placeholder="请输入内容"
                            v-model="form.description">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="price">
                        <el-input v-model="form.price" placeholder="请输入价格" ></el-input>
                    </el-form-item>
                    <el-form-item label="商品链接（可选）" prop="url">
                        <el-input v-model="form.url" placeholder="请输入商品链接"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片" prop="goodimgs">
                        <el-upload
                            v-model="form.goodimgs"
                            ref="upload"
                            class="upload-demo"
                            :action="'http://'+this.server+':8181/upload/file/good'"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            :file-list="fileList"
                            :on-success="handleSuccess"
                            list-type="picture">
                            <el-button size="small" type="primary">选择图片</el-button>
<!--                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
                        <el-tooltip effect="dark" content="将所选图片上传至服务器" placement="bottom">
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item>
                        <el-tooltip effect="dark" content="请先点击上传服务器按钮将图片上传" placement="bottom" >
                            <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
                        </el-tooltip>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-main>
        <el-aside style="width: 10%"></el-aside>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            server: '106.14.37.85',
            form: {
                id: '',
                goodname: '',
                description: '',
                price: '',
                ownerid: '',
                url: '',
                time: '',
                goodimgs: ''
            },
            fileList: [],
            rules:{
                goodname: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                goodimgs: [
                    { required: true, message: '请上传商品图片', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submitUpload(){
            this.$refs.upload.submit()
        },
        onSubmit(formName){
            this.onSubmit2(formName)
        },
        onSubmit2(formName){
            const _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.form.ownerid = JSON.parse(window.localStorage.getItem('access-admin')).name
                    _this.form.time = new Date();
                    console.log(_this.form)
                    axios.post('http://'+this.server+':8181/good/save/', _this.form).then(function (resp){
                        console.log(resp)
                    })
                    alert('发布成功！');
                    _this.$router.push({path: '/transaction/goods'})
                    // window.location.reload()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(){
            this.$router.push({path: "/transaction/goods"})
        },
        handleRemove(file, fileList) {
            //console.log(file, fileList);
        },
        handlePreview(file) {
            //console.log(file);
        },
        handleSuccess(res, fileList){
            this.form.goodimgs += (res + " ")
            //console.log(this.form.goodimgs)
        }
    }
}
</script>

<style scoped>

</style>