const BASE_URL = "https://dummyjson.com";

export async function fetchData(endpoint, callback, callbackSkeleton) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  const data = response.json();
  data
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      callbackSkeleton();
    });
}
