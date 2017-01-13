import { Injectable } from '@angular/core';
import * as request from "../../../../node_modules/request-promise";
import * as cfg from "../../../../config";

@Injectable()
export class ApiService {

	private baseUrl: string;

	constructor() {
		this.baseUrl = cfg.SERVER_URL;
	}

	register(username: string, password: string, publicKey: Buffer): Promise<number> {
		return new Promise((fulfill, reject) => {
			request.post(this.baseUrl + "/users", {
				username: username,
				password: password,
				publicKey: publicKey.toString(cfg.ENCODING)
			})
				.then(r => JSON.parse(r).id)
				.then(id => fulfill(id))
				.catch(err => { // TODO getting bad request 400
					if (err.statusCode) {
						switch (err.statusCode) {
							case 422:
								// TODO
								break;
							case 404:
							case 400:
								reject(err);
								break;
						}
					} else {
						reject(err);
					}
				});
		});
	}
}
