import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {

	private token: string;
	private started: boolean;

	constructor() {
		this.started = false;
	}

	public startSession(token: string) {
		this.started = true; // TODO Cannot set property 'started' of undefined
		this.token = token;
	}

}
