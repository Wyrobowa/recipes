export const fetchData = (url) => new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => resolve(data.data))
    .catch((error) => reject(error));
});
