import { Injectable } from '@angular/core';
import { GmaCrypto, KeyPair } from "gma-client-crypto/dist";

@Injectable()
export class CryptoService {

	cryptoClient: GmaCrypto;

	constructor() {
		this.cryptoClient = new GmaCrypto("http://localhost:3000/api/v1");
	}

	generateKeyPair(username: string, password: string): Promise<KeyPair> {
		return this.cryptoClient.generateKeyPair(username, password);
	}

}
