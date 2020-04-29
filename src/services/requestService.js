/**
 * Fetch external data
 *
 * @param {String} url
 * @returns {Promise}
 */
export const fetchData = (url) => new Promise((resolve, reject) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => resolve(data.data))
    .catch((error) => reject(error));
});


/**
 * Send data to external URL
 *
 * @param {String} url
 * @param {String} method
 * @param {Object} formData
 * @returns {Promise}
 */
export const sendData = (url, method, formData) => new Promise((resolve, reject) => {
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data.data);
    })
    .catch((error) => {
      reject(error);
    });
});
