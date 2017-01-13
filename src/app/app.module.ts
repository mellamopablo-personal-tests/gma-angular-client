import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { RegisterComponent } from './components/register/register.component';
import { CryptoService } from "./services/crypto/crypto.service";
import { ApiService } from "./services/api/api.service";

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [CryptoService, ApiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
