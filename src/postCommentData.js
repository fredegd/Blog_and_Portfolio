export const postData = async (url, data) => {
  const response = await fetch(`.netlify/functions${url}`, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    //mode: 'cors' // if your endpoints are on a different domain
  });
  console.log(response)
  return await response.json();
};