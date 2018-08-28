<template>
    <div class="pic-upload">
      <el-button type="primary">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
      <input type="file" value="上传文件" class="pic-input" ref="ipt"/>
      <el-dialog
        title="图片裁剪"
        :visible.sync="dialogVisible">
        <vueCropper
          style="height: 800px"
          ref="cropper"
          :img="cropperImg"
          :outputSize="option.size"
          :outputType="option.outputType"
          :canScale="option.canScale"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :full="option.full"
          :fixedNumber="option.fixedNumber"
          :fixedBox="option.fixedBox"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
        ></vueCropper>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelImg()">取 消</el-button>
          <el-button type="primary" @click="confirmImg()">确 定</el-button>
        </span>
      </el-dialog>

      <div class="img-area" v-if="result !== ''">
        <img :src="result" id="checkImg">
        <el-button size="mini" class="modify-btn-white" @click="deletePic">删除图片</el-button>
      </div>

<!--
      <el-dialog title="大图预览" :visible.sync="modal">
        <img :src="result">
      </el-dialog>
 -->
    </div>
</template>

<style lang="scss">
  .pic-upload {
       position: relative;
     }
  .pic-input {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    width: 120px;
    background: red;
    opacity: 0;
    z-index: 100;
    cursor: pointer;
  }
  .pic-result {
    display: block;
    width: 100%;
    margin: 10px 0 0 0;
    min-height: 80px;
  }
  .img-area {
    position: relative;
    margin: 10px 0 0 0;
    max-width: 150px;
    vertical-align: top;
  }
  .pic-icon {
    position: absolute;
    display: inline-block;
    top: -12px;
    right: -12px;
    z-index: 100;
  }
  .ivu-modal-footer {
    display: none!important;
  }
  #checkImg {
    width: 350px;
    height: 200px;
  }
  .el-dialog {
    margin-top: 0 !important;
  }
</style>

<script>
  import VueCropper from 'vue-cropper';

  export default{
    data() {
      return {
        cantReadFile: false,
        modal: false,
        result: '', // 最终图
        cropperImg: '', // 截图
        dialogVisible: false, // 截图对话框
        option: {
          size: 0.9,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          fixed: true,
          full: false,
          fixedNumber: [16, 9],
          fixedBox: false,
          canMove: false,
          canMoveBox: true
        }
      };
    },
    props: ['parentMessage'],
    mounted() {
      if (typeof (FileReader) === 'undefined') {
        this.cantReadFile = true;
        this.result = '抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！';
      } else {
        this.$refs.ipt.addEventListener('change', this.readFile, false);
      }
    },
    methods: {
      readFile() {
        const file = this.$refs.ipt.files[0];
        if (file.type && !/image\/\w+/.test(file.type) || file.type === 'image/bmp') {
          this.$message.error('请确保文件为图像类型，仅供上传jpg/jpeg/png/gif格式的图片');
          this.$refs.ipt.value = null;
          return;
        }
        if (file.size > 1024000) {
          this.$message.error('图片过大，请上传1MB以内的图片');
          this.$refs.ipt.value = null;
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.dialogVisible = true;
        reader.onload = (e) => {
          this.cropperImg = reader.result;
          this.$refs.ipt.value = null;
          // this.result = reader.result;
          // this.$emit('on-success', reader.result);
        };
      },
      confirmImg() {
        this.$refs.cropper.startCrop();
        // console.log(this.$refs.cropper.cropW); // 获取宽度
        // console.log(this.$refs.cropper.cropH); // 获取高度
        this.$refs.cropper.getCropData((data) => {
          // do something
          // console.log(data);
          this.result = data;
          this.$emit('on-success', data);
          this.dialogVisible = false;
        });
      },
      cancelImg() {
        this.dialogVisible = false;
        this.$refs.ipt.value = null;
      },
      deletePic() {
        this.$confirm('此操作将会删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.result = '';
          this.$emit('on-success', '');
          this.$message.success('图片已删除');
        });
        // if (!confirm('确认删除这张图片?')) return
      }
    },
    watch: {
      parentMessage() {
        this.result = this.parentMessage;
      }
    },
    components: {
      VueCropper
    }
  };
</script>
