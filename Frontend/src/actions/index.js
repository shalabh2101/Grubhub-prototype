

// export function addArticle(payload) {
//     return { type: "ADD_ARTICLE", payload }
//   };

  export function checklogin(payload) {
    console.log("payload "+payload);
    return { type: "CHECK_LOGIN", payload }
  };