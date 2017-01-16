import { Injectable } from '@angular/core';
import * as request from "../../../../node_modules/request-promise";
import * as cfg from "../../../../config";
import {ERegisterError} from "./enums";

@Injectable()
export class ApiService {

	private baseUrl: string;

	constructor() {
		this.baseUrl = cfg.SERVER_URL;
	}

	register(username: string, password: string, publicKey: Buffer): Promise<number> {
		return new Promise((fulfill, reject) => {
			request.post(this.baseUrl + "/users")
				.form({
					username: username,
					password: password,
					publicKey: publicKey.toString(cfg.ENCODING)
				})
				.then(r => JSON.parse(r).id)
				.then(ApiService.parse)
				.then(r => fulfill(r.id))
				.catch(err => {
					if (err.statusCode) {
						switch (err.statusCode) {
							case 422:
								err.ERegisterError = ERegisterError.USERNAME_ALREADY_TAKEN;
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

	login(username: string, password: string, extended: boolean = false) {
		request.post(this.baseUrl + "/auth/login")
			.form({
				username: username,
				password: password,
				extended: extended
			})
			.then()
	}

	private static parse(response: string) {
		return JSON.parse(response);
	}
}
