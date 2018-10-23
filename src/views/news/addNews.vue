<template>
    <div>
      <el-card>
        <div slot="header">
          <span>添加新闻</span>
        </div>
        <el-form label-width="100px" :rules="rules" style="width: 100%;" class="mac">
          <el-form-item label="新闻标题：" prop="title">
            <el-input v-model="formData.title"/>
          </el-form-item>
          <el-form-item label="新闻头图：">
            <el-switch
              v-model="show"
              active-text="本地上传"
              inactive-text="上传链接"></el-switch>
            <uploadImg v-model="formData.avatar" v-show="show"></uploadImg>
            <el-input v-model="formData.avatar" v-show="!show"></el-input>
          </el-form-item>
          <el-form-item label="新闻内容">
            <quill-editor v-model="formData.content"
                          ref="myQuillEditor"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import uploadImg from '@/components/uploadImg'
export default {
  components: {
    uploadImg,
    quillEditor
  },
  data () {
    return {
      formData: {
        title: '',
        content: ''
      },
      editorOption: {
        // some quill options
      },
      show: true,
      rules: {
        title: [
          {required: true, message: '请输入新闻标题', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
  }
}
</script>

<style scoped>

</style>
