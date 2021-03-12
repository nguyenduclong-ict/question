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
      answer: null,
    };
  },

  created() {
    const search = new URLSearchParams(window.location.search);
    const id = search.get("id");
    if (id) {
      firebase
        .firestore()
        .collection("answers")
        .where("id", "==", id)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push(doc.data());
          });

          if (docs[0]) {
            this.answer = docs[0];
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  },
});
