const API_KEY = 'qbe7wOx7Xjd2Hnx9UDgv1TJHQZ2UZtIW';
const BASE_URL = 'https://api.giphy.com/v1/stickers/search';

export const searchImgService = query => {
  const url = `${BASE_URL}?api_key=${API_KEY}&q=${query}&limit=8`;
  const get = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(res => res.json());
  console.log({ get });
  return get;
};
