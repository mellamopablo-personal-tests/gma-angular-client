import { Injectable } from '@angular/core';
import { createDiffieHellman } from "../../../../node_modules/diffie-hellman/";
import * as request from "../../../../node_modules/request-promise";
import * as cfg from "../../../../config";

interface KeyPair {
	publicKey: Buffer
	privateKey: Buffer
}

@Injectable()
export class CryptoService {

	private baseUrl: string;
	private prime: Buffer;

	constructor() {
		this.baseUrl = cfg.SERVER_URL;
		this.prime = null;
	}

	/**
	 * Generates a key pair, the private key being the concatenation of the username
	 * and password. The public key can then be sent to the POST /users method in the server.
	 *
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<KeyPair>}
	 */
	generateKeyPair(username: string, password: string): Promise<KeyPair> {
		return new Promise((fulfill, reject) => {
			this.getPrime().then(prime => {
				const dh = createDiffieHellman(prime);
				dh.setPrivateKey(new Buffer(username + password));
				dh.generateKeys();

				fulfill({
					publicKey: dh.getPublicKey(),
					privateKey: dh.getPrivateKey()
				});
			}).catch(reject);
		});
	}

	private getPrime(): Promise<Buffer> {
		return new Promise((fulfill, reject) => {
			if (this.prime === null) {
				request(this.baseUrl + "/auth/prime")
					.then(r => JSON.parse(r).prime)
					.then(p => new Buffer(p, cfg.ENCODING))
					.then(fulfill).catch(reject);
			} else {
				fulfill(this.prime);
			}
		});
	}

}
