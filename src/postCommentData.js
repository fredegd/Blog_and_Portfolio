// export const postData = async (url, data) => {
//   console.log(url,data)
//   const response = await fetch(`.netlify/functions${url}`, {
//     body: JSON.stringify(data),
//     headers: {
//       "content-type": "application/json",
//     },
//     method: "POST",
//     //mode: 'cors' // if your endpoints are on a different domain
//   });
//   console.log(response,"is the response")
//   return response.json();
// };

export default function postData(url, data) {
  return fetch(`.netlify/functions${url}`, {
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
    method: "POST",
    //mode: 'cors' // if your endpoints are on a different domain
  }).then((response) => response.json());
}
