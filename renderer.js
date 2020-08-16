const { clipboard } = require('electron')
const Vue = require('vue/dist/vue.js')

const audio = new Audio('./clipboard.mp3')

const App = new Vue({
  el: '#app',
  data: {
    title: 'Clipboard',
    history: [],
  },
  mounted() {
    this.history.push({
      text: clipboard.readText(),
      clipped: new Date().toLocaleString(),
    })
    setInterval(this.checkClipboard, 500)
  },
  computed: {
    historyReversed() {
      return this.history.slice().reverse()
    },
  },
  methods: {
    checkClipboard() {
      const text = clipboard.readText()
      if (this.history[this.history.length - 1].text !== text) {
        this.history.push({
          text: text,
          clipped: new Date().toLocaleString(),
        })
        audio.currentTime = 0
        audio.play()
      }
    },
    itemClicked(item) {
      const index = this.history.indexOf(item)
      clipboard.writeText(item.text)
      this.history.splice(index, 1)
      window.scrollTo(0, 0)
    },
  },
})
