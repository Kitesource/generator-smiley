<template>
  <div class="only-office" style="width: 90vw; height: 70vh; position: relative">
    <van-button size="small" type="primary" style="margin-right: 12px" @click="insertImage">插入图片</van-button>
    <van-button size="small" type="primary" @click="save">保存</van-button>
    <div ref="onlyOffice" id="vabOnlyOffice"></div>
  </div>
</template>

<script>
const customization = {
  // logo: {
  //     image: url,
  //     imageDark: url, // logo for dark theme
  //     imageLight: url, // logo for light header
  //     imageEmbedded: url, // deprecated, use image instead
  //     url: http://...,
  //     visible: true // hide logo if visible=false
  // },
  // customer: {
  //   name: 'SuperPuper',
  //   address: 'New-York, 125f-25',
  //   mail: 'support@gmail.com',
  //   www: 'www.superpuper.com',
  //   phone: '1234567890',
  //   info: 'Some info',
  //   logo: '',
  //   logoDark: '' // logo for dark theme
  // },
  about: false,
  feedback: {
    visible: false
    // url: http://...
  },
  // goback: {
  //   url: 'http://...',
  //   text: 'Go to London',
  //   blank: true,
  //   requestClose: false // if true - goback send onRequestClose event instead opening url, deprecated, use customization.close instead
  // },
  close: {
    visible: true,
    text: 'Close file'
  },
  reviewPermissions: {
    Group1: ['Group2'], // users from Group1 can accept/reject review changes made by users from Group2
    Group2: ['Group1', 'Group2'], // users from Group2 can accept/reject review changes made by users from Group1 and Group2
    Group3: [''] // users from Group3 can accept/reject review changes made by users without a group
  },
  anonymous: {
    // set name for anonymous user
    request: true, // enable set name
    label: 'Guest' // postfix for user name
  },
  review: {
    hideReviewDisplay: false, // hide button Review mode
    hoverMode: false, // true - show review balloons on mouse move, not on click on text
    showReviewChanges: false,
    reviewDisplay: 'original', // original for viewer, markup for editor
    trackChanges: undefined // true/false - open editor with track changes mode on/off,
  },
  layout: {
    // hide elements, but don't disable feature
    toolbar: {
      file: {
        // menu file
        close: false, // false / true, // close menu button
        settings: false, // false / true, // advanced settings
        info: false, // false / true // document info
        save: false // false/true // save button
      },
      home: {
        mailmerge: false // false/true // mail merge button // deprecated, button is moved to collaboration tab. use toolbar->collaboration->mailmerge instead
      },
      insert: {
        file: false, // false/true // text from file button in de
        field: false // false/true // field button in de
      }, // insert tab
      layout: {
        pagecolor: false // false/true // page color button in de
      }, // layout tab
      references: false, // de references tab
      collaboration: {
        mailmerge: false // false/true // mail merge button in de
      }, // collaboration tab
      draw: false, // draw tab
      protect: false, // protect tab
      plugins: false, // plugins tab
      view: {
        navigation: false // false/true // navigation button in de
      }, // view tab
      save: false // false/true // save button on toolbar in
    }, // use instead of customization.toolbar,
    header: {
      users: false, // false/true // users list button
      save: false, // false/true // save button
      editMode: false, // false/true // change mode button
      user: false // false/true // icon of current user
    }, // header
    // leftMenu: {
    //   navigation: false, // false/true // navigation button in sse,
    //   spellcheck: false, // false/true // spellcheck button in sse,
    //   mode: true // false/true // init value for left panel, true - is visible, false - is hidden, used for option "Left panel" on the View Tab
    // }, // leftMenu
    // rightMenu: {
    //   mode: true // false/true // init value for right panel, true - is visible, false - is hidden, used for option "Right panel" on the View Tab
    // }, // rightMenu
    leftMenu: false,
    rightMenu: false,
    statusBar: {
      textLang: false, // false/true // text language button in de/pe
      docLang: false, // false/true // document language button in de/pe
      actionStatus: false // false/true // status of operation
    } // statusBar
  },
  features: {
    // disable feature
    spellcheck: {
      mode: false, // false/true // init value in de/pe
      change: false // false/true // hide/show feature in de/pe/sse
    }, // spellcheck
    roles: false, // false/true // hide/show Roles manager, roles settings in right panel and roles in View form button in de
    tabStyle: {
      mode: 'fill', // 'fill'/'line' // init value, 'fill' by default,
      change: true // true/false // show/hide feature
    }, // tabStyle
    tabBackground: {
      mode: 'header', // 'header'/'toolbar' // init value, 'header' by default
      change: true // true/false // show/hide feature
    }, // tabBackground
    featuresTips: false // false/true // show tips about new feature
  },
  chat: false, // deprecated 7.1, use permissions.chat
  comments: false,
  zoom: 100,
  compactToolbar: true,
  leftMenu: false, // must be deprecated. use layout.leftMenu instead
  rightMenu: false, // must be deprecated. use layout.rightMenu instead
  hideRightMenu: false, // hide or show right panel on first loading !! default value changed in 8.1
  toolbar: false, // must be deprecated. use layout.toolbar instead
  statusBar: false, // must be deprecated. use layout.statusBar instead
  autosave: false,
  forcesave: false,
  commentAuthorOnly: false, // must be deprecated. use permissions.editCommentAuthorOnly and permissions.deleteCommentAuthorOnly instead
  showReviewChanges: false, // must be deprecated. use customization.review.showReviewChanges instead
  help: false,
  compactHeader: false,
  toolbarNoTabs: false, // must be deprecated. use features.tabStyle.mode='line' && features.tabBackground='toolbar' instead
  toolbarHideFileName: false,
  reviewDisplay: 'original', // must be deprecated. use customization.review.reviewDisplay instead
  spellcheck: false, // must be deprecated. use customization.features.spellcheck instead
  compatibleFeatures: false,
  unit: 'cm', // cm, pt, inch,
  mentionShare: false, // customize tooltip for mention,
  macros: false, // can run macros in document
  plugins: false, // can run plugins in document
  macrosMode: 'warn', // warn about automatic macros, 'enable', 'disable', 'warn',
  trackChanges: undefined, // true/false - open editor with track changes mode on/off,  // must be deprecated. use customization.review.trackChanges instead
  hideRulers: true, // hide or show rulers on first loading (presentation or document editor)
  hideNotes: true, // hide or show notes panel on first loading (presentation editor)
  uiTheme: 'default-light', // set interface theme: id or default-dark/default-light
  integrationMode: 'embed', // turn off scroll to frame
  pointerMode: 'select', // 'select' / 'hand', // set cursor mode in presentation/document viewer, select by default
  mobile: {
    forceView: true, // true/false (default: true) // turn on/off the 'reader' mode on launch. for mobile document editor only
    standardView: false, // true/false (default: false) // open editor in 'Standard view' instead of 'Mobile view'
    disableForceDesktop: false // hide or show UI option to switch editor in 'Desktop' type
  },
  submitForm: {
    visible: false // true/false (default: true)
    // resultMessage:  'text' / '' / null / undefined // if '' - don't show a message after submitting form, null/undefined - show the default message
  },
  forceWesternFontSize: false, // / true, // used only in the document editor with lang=zh, Chinese by default
  slidePlayerBackground: '#000000', // background color for slide show in presentation editor
  wordHeadingsColor: '#00ff00', // set color for default heading styles in document editor
  showVerticalScroll: true, // true/false, //  show/hide scroll in the spreadsheet editor by default
  showHorizontalScroll: true, // true/false, //  show/hide scroll in the spreadsheet editor by default
  startFillingForm: {
    text: 'Share & collect' // caption of the start filling button, used for pdf-forms
  },
  suggestFeature: false
}
export default {
  name: 'OnlyOffice',
  data() {
    return {
      doctype: '',
      docEditor: null,
      option: {
        url: 'http://172.16.24.131:9001/md.docx',
        isEdit: true,
        fileType: 'docx',
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
    script.src = '/onlyoffice/web-apps/apps/api/documents/api.js' //改成自己的ip也行
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
    setEditor(option) {
      if (this.docEditor !== null) {
        this.docEditor.destroyEditor()
        this.docEditor = null
      }
      this.doctype = this.getFileType(option.fileType)
      const config = {
        type: 'embedded',
        document: {
          fileType: option.fileType,
          key: option.key || '',
          title: option.title,
          permissions: {
            edit: option.isEdit,
            print: option.isPrint,
            download: true
          },
          url: option.url //文件url
        },
        documentType: this.doctype,
        editorConfig: {
          callbackUrl: option.editUrl,
          lang: option.lang,
          // customization,
          customization: {
            compactHeader: false,
            compactToolbar: false,
            compatibleFeatures: false,
            autosave: false,
            chat: false,
            comments: false,
            hideNotes: true,
            help: false,
            plugins: false,
            hideRightMenu: true,
            hideRulers: true,
            logo: { visible: false },
            layout: {
              header: {
                // 头部所有元素都隐藏
                save: false,
                undo: false,
                redo: false,
                user: false,
                users: false,
                close: false
              },
              leftMenu: false, // 隐藏左侧菜单
              rightMenu: false, // 隐藏右侧菜单
              statusBar: false // 完全隐藏状态栏（替代原来的细分配置）
            },
            toolbar: false,
            mobile: {
              forceView: true,
              info: true,
              standardView: false
            }
          },
          user: {
            //拓展协同编辑有影响的信息
            id: option.user.id,
            name: option.user.name
          },
          mode: 'edit',
          editable: true
        },
        width: '100%',
        height: '100%',
        token: option.token || '',
        events: {
          onDocumentReady: () => {
            console.log('文档加载完成')
            // 手动设置iframe下的元素的样式
            // 隐藏iframe下的元素
            const iframe = document.querySelector('vabOnlyOffice')
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
            const elements = iframeDoc.querySelectorAll(
              '.onlyoffice-header, .onlyoffice-left-menu, .onlyoffice-right-menu, .onlyoffice-status-bar'
            )
            elements.forEach((el) => {
              el.style.display = 'none'
            })
          },
          onRequestInsertImage: (callback) => {
            console.log('callback', callback)
            console.log('请求插入图片')
            callback({
              c: 'add',
              images: [
                {
                  url: 'https://gwell-cc-help-1251981983.file.myqcloud.com/img/1761790458264.png',
                  fileType: 'png',
                  width: '120px',
                  height: '60px'
                }
              ]
            })
          },
          onDownloadAs: (event) => {
            const fileType = event.data.fileType
            const url = event.data.url
            console.log(`ONLYOFFICE Document Editor create file: ${url}`)
            console.log('下载文档')
          }
        }
      }
      this.docEditor = new window.DocsAPI.DocEditor('vabOnlyOffice', config)
      console.log('this.docEditor', this.docEditor)
    },
    getFileType(fileType) {
      const fileTypesDoc = ['doc', 'docx', 'txt', 'pdf']
      const fileTypesCsv = ['csv', 'xls', 'xlsx']
      const fileTypesPPt = ['ppt', 'pptx']
      if (fileTypesDoc.includes(fileType)) return 'text'
      if (fileTypesCsv.includes(fileType)) return 'spreadsheet'
      if (fileTypesPPt.includes(fileType)) return 'presentation'
      return ''
    },
    insertImage() {
      console.log(' this.docEditor', this.docEditor)
      this.docEditor.insertImage({
        c: 'add',
        images: [
          {
            url: 'https://gwell-cc-help-1251981983.file.myqcloud.com/img/1761790458264.png',
            fileType: 'png',
            width: '120px',
            height: '60px'
          }
        ]
      })
    },
    save() {
      this.docEditor.downloadAs('docx')
    }
  }
}
</script>

<style lang="scss">
.only-office {
  iframe {
    position: absolute !important;
    left: 10px !important;
    top: 40px !important;
    width: 88vw;
    height: 80vh;
    max-height: 90vh;
    overflow: auto !important;
  }
}
</style>
