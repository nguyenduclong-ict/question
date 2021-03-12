var app = new Vue({
  el: "#app",
  filters: {
    date(value) {
      if (value) {
        let d;
        if (value.toDate) d = value.toDate();
        else {
          d = new Date(value);
        }
        // prettier-ignore
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      }
      return;
    },
  },
  data() {
    return {
      question: "",
      id: "",
      message: "",
      copied: false,
    };
  },

  computed: {
    link() {
      const search = new URLSearchParams({
        q: this.question,
        m: this.message,
        id: this.id,
      });
      return (
        "https://nguyenduclong-ict.github.io/fall-in-love" +
        (search.toString() ? "?" + search.toString() : "")
      );
    },
  },

  methods: {
    copy() {
      const copyToClipboard = (str) => {
        const el = document.createElement("textarea");
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      };
      copyToClipboard(this.link);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
  },
});
