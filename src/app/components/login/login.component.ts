import { Component, OnInit } from "@angular/core";
import { str } from "../../strings/en";
import {LoginData} from "../../structures/interfaces/LoginData";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	str;
	loginData: LoginData;

	constructor() {
		this.str = str;

		this.loginData = {
			user: "",
			password: ""
		};
	}

	onSubmit() {
		// TODO !!!!
	}

	ngOnInit() {
	}

}
