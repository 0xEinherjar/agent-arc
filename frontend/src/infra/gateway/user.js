export default class UnitGateway {
  constructor (httpClient, baseUrl) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

	async load() {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/user`,
			method: 'get',
      credentials: true
		});
		return { status: result.statusCode, data: result.body };
	}

	async logout() {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/logout`,
			method: 'get',
      credentials: true
		});
		return { status: result.statusCode };
	}

	async withdraw(params) {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/user/withdraw`,
			method: 'post',
      credentials: true,
      data: params
		});
		return { status: result.statusCode, data: result.body };
	}

	async importPrivateKey(params) {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/user/import-wallet`,
			method: 'post',
      credentials: true,
      data: params
		});
		return { status: result.statusCode, data: result.body };
	}

	async exportPrivateKey() {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/user/export-wallet`,
			method: 'get',
      credentials: true,
		});
		return { status: result.statusCode, data: result.body };
	}
}