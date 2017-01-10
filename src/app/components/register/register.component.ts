import { Component, OnInit } from '@angular/core';
import { RegisterData } from "../../structures/interfaces/RegisterData";
import { register as str } from "../../strings/en";
import { CryptoService } from "../../services/crypto.service";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	str;
	registerData: RegisterData;

	constructor(private cryptoService: CryptoService) {
		this.str = str;

		this.registerData = {
			user: "",
			password: ""
		};
	}

	onSubmit() {
		console.log(this.registerData);
		this.cryptoService.generateKeyPair(this.registerData.user, this.registerData.password)
			.then(kp => kp.publicKey)
			.then(console.log)
			.catch(console.error /*TODO HANDLE*/);
	}

	ngOnInit() {
	}

}
