<template>
  <div class="only-office-container" style="width: 100%; height: 80vh">
    <van-button size="small" type="primary" style="margin-right: 12px" @click="insertImage">插入图片</van-button>
    <van-button size="small" type="primary" @click="save">保存</van-button>
    <div ref="onlyOffice" id="vabOnlyOffice"></div>
  </div>
</template>

<script>
export default {
  name: 'OnlyOffice',
  data() {
    return {
      doctype: '',
      docEditor: null,
      option: {
        url: 'http://172.16.24.131/files/md.pdf',
        isEdit: true,
        fileType: 'pdf',
        title: '文档编辑',
        lang: 'zh-CN',
        isPrint: true,
        user: { id: 1, name: '张三' } // 用户信息
      },
      show: false
    }
  },
  watch: {
    option: {
      handler: function (n) {
        this.setEditor(n)
        this.doctype = this.getFileType(n.fileType)
      },
      deep: true
    }
  },
  beforeCreate() {
    const script = document.createElement('script')
    script.src = 'http://172.16.24.131/onlyoffice/web-apps/apps/api/documents/api.js' //改成自己的ip也行
    script.onload = () => {
      if (this.option.url) {
        this.setEditor(this.option)
      }
    }
    script.onerror = () => {
      console.error('Failed to load OnlyOffice DocsAPI script.')
    }
    document.head.appendChild(script)
  },
  beforeUnmount() {
    if (this.docEditor !== null) {
      this.docEditor.destroyEditor()
      this.docEditor = null
    }
  },
  methods: {
    // 创建a标签，用于下载文件
    createDownloadLink(url, fileName) {
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    setEditor(option) {
      if (this.docEditor !== null) {
        this.docEditor.destroyEditor()
        this.docEditor = null
      }
      this.doctype = this.getEditorType(option.fileType)
      const config = {
        // type: 'embedded',
        document: {
          fileType: option.fileType,
          key: option.key || '',
          title: option.title,
          permissions: {
            chat: false,
            comment: false,
            copy: false,
            commentGroups: {
              edit: ['Group2', ''],
              remove: [''],
              view: ''
            },
            deleteCommentAuthorOnly: false,
            download: false,
            edit: true,
            editCommentAuthorOnly: false,
            fillForms: false,
            modifyContentControl: false,
            modifyFilter: false,
            print: false,
            protect: false,
            review: false,
            reviewGroups: ['Group1', 'Group2', ''],
            userInfoGroups: ['Group1', '']
          },
          url: option.url //文件url
        },
        documentType: this.doctype,
        editorConfig: {
          callbackUrl: option.editUrl,
          lang: option.lang,
          customization: {
            hideRightMenu: true,
            autosave: false,
            chat: false,
            comments: false,
            help: false,
            plugins: false
          },
          user: {
            //拓展协同编辑有影响的信息
            id: option.user.id,
            name: option.user.name
          },
          mode: 'edit'
        },
        width: '100%',
        height: '100%',
        token: option.token || '',
        events: {
          onDocumentReady: () => {
            console.log('文档加载完成')
          },
          onRequestInsertImage: (callback) => {
            console.log('callback', callback)
            console.log('请求插入图片')
            callback({
              c: 'add',
              url: 'https://gwell-cc-help-1251981983.file.myqcloud.com/img/1761790458264.png',
              fileType: 'png',
              width: '120px',
              height: '60px'
            })
          },
          onDownloadAs: (event) => {
            const fileType = event.data.fileType
            const url = event.data.url
            this.createDownloadLink(url, `document.${fileType}`)
          }
        }
      }
      this.docEditor = new window.DocsAPI.DocEditor('vabOnlyOffice', config)
      console.log('this.docEditor', this.docEditor)
    },
    getEditorType(fileType) {
      switch (fileType) {
        case 'xlsx':
          return 'cell'
        case 'pptx':
          return 'slide'
        case 'docx':
        case 'doc':
        case 'pdf':
        case 'txt':
        case 'odt':
        case 'ods':
        case 'odp':
          return 'word' // PDF 和 文本文件使用文字编辑器
        default:
          return 'word'
      }
    },
    insertImage() {
      console.log(' this.docEditor', this.docEditor)
      this.docEditor.insertImage({
        c: 'add',
        url: 'https://gwell-cc-help-1251981983.file.myqcloud.com/img/1761790458264.png',
        fileType: 'png',
        width: '120px',
        height: '60px'
      })
    },

    save() {
      this.docEditor.downloadAs('pdf')
    }
  }
}
</script>
<style lang="scss">
.only-office-container {
  #box-document-title {
    display: none;
  }
}
</style>
