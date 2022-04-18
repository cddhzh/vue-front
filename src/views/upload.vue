<template>
    <div>
        <el-upload
            ref="upload"
            class="avatar-uploader"
            :on-progress="handleProgress"
            action="http://106.14.37.85:8181/upload/file/avatar"
            :show-file-list="false"
            :on-change="handleChange"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="http://106.14.37.85:8181/upload/file/avatar"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarListSuccess"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

    </div>
</template>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<script>
export default {
    data() {
        return {
            imgUrls: "",
            imageUrl: '',
            fileList: []
        };
    },
    methods: {
        handleProgress(event, file){
            console.log(event)
        },
        handleError(err, file){
            console.log(err)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(res)
        },
        handleAvatarListSuccess(res, fileList) {
            this.imgUrls += (res + " ")
            console.log(this.imgUrls)
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        handleChange(file, fileList){
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
}
</script>