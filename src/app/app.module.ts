import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './components/app/app.component';
import { RegisterComponent } from './components/register/register.component';
import { CryptoService } from "./services/crypto/crypto.service";
import { ApiService } from "./services/api/api.service";
import { AppRoutingModule } from "./components/app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { SessionService } from "./services/session/session.service";

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [CryptoService, ApiService, SessionService],
	bootstrap: [AppComponent]
})
export class AppModule { }
