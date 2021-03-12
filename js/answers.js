import { callOne } from "./utils.js";

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
      user: null,
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(
      callOne((user) => {
        if (user) {
          this.inited = true;
          this.loggedIn = true;
          this.user = firebase.auth().currentUser;
          this.fetchListAnswers();
        }
      })
    );
  },

  methods: {
    handleLogin() {
      this.login().then(() => {
        this.fetchListAnswers();
      });
    },
    destroy() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    async login() {
      var user = firebase.auth().currentUser;
      if (user) {
        this.loggedIn = true;
        this.user = user;
        return user;
      } else {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            this.loggedIn = true;
            this.user = firebase.auth().currentUser;
            this.user;
          });
      }
    },
    fetchListAnswers() {
      const db = firebase.firestore();
      db.collection("answers")
        .get()
        .then((querySnapshot) => {
          const answers = [];
          querySnapshot.forEach((doc) => {
            answers.push(doc.data());
          });
          this.answers = answers;
        });
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggedIn = false;
          this.answers = [];
        });
    },
  },
});
