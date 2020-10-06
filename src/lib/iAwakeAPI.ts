const apiEntry = 'https://api.iawaketechnologies.com/api/v2';
const mediaNamespace = 'media-library/free';

export default class IAwakeAPI {
  static apiEntry = apiEntry;
  static mediaNamespace = mediaNamespace;

  static async fetchMedia() {
    const url = `${apiEntry}/${mediaNamespace}`;
    return fetch(url).then((response) => response.json());
  }
}
