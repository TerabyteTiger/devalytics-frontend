import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "../firebase";

Vue.use(Vuex);

firebase.articleCollection.onSnapshot(snapshot => {
  let articleArray = [];
  let meta = {};

  snapshot.forEach(doc => {
    let article = doc.data();
    article.id = doc.id;
    if (article.id == "meta") {
      meta = { ...article };
    } else {
      articleArray.push(article);
    }
  });
  // 👆 Create an array of all docs found.
  store.commit("setArticles", articleArray);
  store.commit("setMeta", meta);
});

const store = new Vuex.Store({
  state: {
    articles: [],
    meta: {}
  },
  mutations: {
    setArticles(state, val) {
      state.articles = val;
    },
    setMeta(state, val) {
      state.meta = val;
    }
  },
  actions: {},
  getters: {
    totalViews: state => {
      let acc = 0;
      let i;
      for (i = 0; i < state.articles.length; i++) {
        acc =
          acc +
          state.articles[i].viewsTotal[
            state.articles[i].viewsTotal.length - 1
          ];
      }
      return acc;
    },
    totalReactions: state => {
      let acc = 0;
      let i;
      for (i = 0; i < state.articles.length; i++) {
        acc =
          acc +
          state.articles[i].reactionsTotal[
            state.articles[i].reactionsTotal.length - 1
          ];
      }
      return acc;
    },
    dailySummary: state => {
      let results = {
        labels: [],
        datasets: [
          {
            label: "Views",
            data: [],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153,102,255,1)",
            borderWidth: 1
          },
          {
            label: "Reactions",
            data: [],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86,1)",
            borderWidth: 1
          },
          {
            label: "Comments",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192,1)",
            borderWidth: 1
          }
        ]
      };

      let i;
      let dates = [];
      for (i = 0; i < state.articles.length; i++) {
        // Get the longest array of dates
        if (dates.length < state.articles[i].dates.length) {
          dates = [...state.articles[i].dates];
        }
      }
      // Remove first item from dates since it will include backlocked stats
      results.labels = dates.splice(0, 1);

      let viewsAcc, commentsAcc, reactionsAcc;

      for (let k = 0; k < dates.length; k++) {
        viewsAcc = 0;
        commentsAcc = 0;
        reactionsAcc = 0;
        for (let j = 0; j < state.articles.length; j++) {
          let current = state.articles[j];
          let index = current.dates.indexOf(dates[k]);
          console.log(current.dates, current);
          if (index != -1) {
            viewsAcc = viewsAcc + current.viewsDaily[index];
            commentsAcc =
              commentsAcc + current.commentsDaily[index];
            reactionsAcc =
              reactionsAcc + current.reactionsDaily[index];
          }
        }
        // Set Views
        results.datasets[0].data.push(viewsAcc);
        // Set Reactions
        results.datasets[1].data.push(reactionsAcc);
        // Set Comments
        results.datasets[2].data.push(commentsAcc);
      }

      return results;
    }
  }
});

export default store;
