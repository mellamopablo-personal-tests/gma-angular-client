import { Component, OnInit } from '@angular/core';
import { RegisterData } from "../../structures/interfaces/RegisterData";
import { register as str } from "../../strings/en";
import { CryptoService } from "../../services/crypto/crypto.service";
import { ApiService } from "../../services/api/api.service";
import * as cfg from "../../../../config";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	str;
	registerData: RegisterData;

	constructor(private cryptoService: CryptoService, private apiService: ApiService) {
		this.str = str;

		this.registerData = {
			user: "",
			password: ""
		};
	}

	onSubmit() {
		this.cryptoService.generateKeyPair(this.registerData.user, this.registerData.password)
			.then(kp => kp.publicKey)
			.then(pk => this.apiService.register(
				this.registerData.user, this.registerData.password, pk
			))
			.then(console.log)
			.catch(console.error /*TODO HANDLE*/);
	}

	ngOnInit() {
	}

}
