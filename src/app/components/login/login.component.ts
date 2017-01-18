import { Component, OnInit } from "@angular/core";
import { str } from "../../strings/en";
import {LoginData} from "../../structures/interfaces/LoginData";
import {ApiService} from "../../services/api/api.service";
import {SessionService} from "../../services/session/session.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	str;
	loginData: LoginData;

	constructor(private apiService: ApiService) {
		this.str = str;

		this.loginData = {
			user: "",
			password: "",
			extended: false
		};
	}

	onSubmit() {
		this.apiService.login(
			this.loginData.user,
			this.loginData.password,
			this.loginData.extended
		)
			.then(success => {
				if (success) { // TODO
					alert("Logged in!");
				} else {
					alert("Log in error :(");
				}
			})
			.catch(console.error);
	}

	ngOnInit() {
	}

}
