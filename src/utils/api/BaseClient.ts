import ApiClient from 'utils/api/ApiClient';

class BaseClient {
  protected _client: ApiClient;
  static readonly prefix: string;

  constructor(client: ApiClient) {
    this._client = client;
  }
}

export default BaseClient;
