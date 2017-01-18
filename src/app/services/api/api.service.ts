import {Injectable, NgModule} from '@angular/core';
import * as request from "../../../../node_modules/request-promise";
import * as cfg from "../../../../config";
import {ERegisterError} from "./enums";
import {SessionService} from "../session/session.service";

@NgModule({
	providers: [SessionService]
})
@Injectable()
export class ApiService {

	private baseUrl: string;

	constructor(private sessionService: SessionService) {
		this.baseUrl = cfg.SERVER_URL;
	}

	/**
	 * Creates a new user.
	 *
	 * @param username
	 * @param password
	 * @param publicKey
	 * @returns {Promise<number>} The created user id.
	 */
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
							default:
								reject(err);
								break;
						}
					} else {
						reject(err);
					}
				});
		});
	}

	/**
	 * Logs in and retrieves a session token.
	 *
	 * @param username
	 * @param password
	 * @param extended Whether or not the session is meant to be extended. Extended sessions
	 *                 last longer than regular sessions.
	 * @returns {Promise<string>} The session token
	 */
	login(username: string, password: string, extended: boolean = false) {
		return new Promise((fulfill, reject) => {
			request.post(this.baseUrl + "/auth/login")
				.form({
					username: username,
					password: password,
					extended: extended
				})
				.then(ApiService.parse)
				.then(r => r.token)
				.then(this.sessionService.startSession)
				.then(() => fulfill(true))
				.catch(err => {
					if (err.statusCode) {
						switch (err.statusCode) {
							case 401:
								switch (JSON.parse(err.error).error.code) {
									case "WRONG_USERNAME_OR_PASSWORD":
										fulfill(false);
										break;
									default:
										reject(err);
										break;
								}
								break;
							default:
								reject(err);
								break;
						}
					} else {
						reject(err);
					}
				});
		});
	}

	private static parse(response: string) {
		return JSON.parse(response);
	}
}
