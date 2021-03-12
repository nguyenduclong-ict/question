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
      answers: [],
      loggedIn: false,
    };
  },

  created() {},

  methods: {
    destroy() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.loggedIn = true;
          this.fetchListAnswers();
        })
        .catch(() => {
          this.destroy();
        });
    },
    fetchListAnswers() {
      const db = firebase.firestore();
      db.collection("answer")
        .get()
        .then((querySnapshot) => {
          const answers = [];
          querySnapshot.forEach((doc) => {
            answers.push(doc.data());
          });
          this.answers = answers;
        });
    },
  },
});
