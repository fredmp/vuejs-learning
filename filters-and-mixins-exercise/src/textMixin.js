export const textMixin = {
  data () {
    return {
      text: ''
    }
  },
  computed: {
    stringWithLength () {
      if (this.text.length < 1) {
        return '';
      }
      return `${this.text} (${this.text.length})`;
    },
    stringReversed () {
      return this.text.split("").reverse().join("");
    }
  }
}
