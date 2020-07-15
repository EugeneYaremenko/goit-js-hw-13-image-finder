const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

const apiKey = '17157037-52a084c0f09be4b43a01edb5f';

export default {
  page: 1,
  query: '',
  feachArticles() {
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(baseUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.hits;
      });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
