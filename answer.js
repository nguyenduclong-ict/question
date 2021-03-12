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
      db: null,
    };
  },

  created() {
    this.db = firebase.firestore();
    this.db
      .collection("answer")
      .get()
      .then((querySnapshot) => {
        const answers = [];
        querySnapshot.forEach((doc) => {
          answers.push(doc.data());
        });
        this.answers = answers;
      });
  },
});
