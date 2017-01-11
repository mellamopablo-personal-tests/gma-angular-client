import { Injectable } from '@angular/core';
import { GmaCrypto, KeyPair } from "gma-client-crypto/dist";
//import { createCipher } from "crypto";
const createCipher = require("crypto").createCipher;
import * as cfg from "../../../config";

@Injectable()
export class CryptoService {

	cryptoClient: GmaCrypto;

	constructor() {
		this.cryptoClient = new GmaCrypto(cfg.SERVER_URL);
	}

	generateKeyPair(username: string, password: string): Promise<KeyPair> {
		return this.cryptoClient.generateKeyPair(username, password);
	}

	encrypt(message: string, secret: Buffer): string {
		const cipher = createCipher(cfg.ENCRYPTION_ALGORITHM, secret);

		let encrypted = cipher.update(message, cfg.INPUT_ENCODING, cfg.OUTPUT_ENCODING);
		encrypted += cipher.final(cfg.OUTPUT_ENCODING);

		return encrypted;
	}

}
