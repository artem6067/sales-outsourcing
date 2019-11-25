const Vue = require('vue/dist/vue.js')
const axios = require('axios')

new Vue({
  el: '#app',
  data: {
    pageList: [],
    newPageName: ''
  },
  methods: {
    createPage() {
      axios
        .post('./api/createNewHtmlPage.php', {name: this.newPageName})
        .then((response)=> {
          this.updatePageList()
        })
    },

    deletePage(page) {
      axios
        .post('./api/deleteHtmlPage.php', {name: page})
        .then(response => {
          this.updatePageList()
        })
      console.log(page);
    },

    updatePageList() {
      axios
        .get('./api/')
        .then(response => {
          this.pageList = response.data
        })
    }
  },
  created() {
    this.updatePageList()
  }
})
