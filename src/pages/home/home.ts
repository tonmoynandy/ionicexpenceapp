import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";
import {DashboardPage} from "../dashboard/dashboard";
import {Global} from "../../app/global.config";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor( public navCtrl: NavController, public alertCtrl : AlertController,  public global : Global) {
		
	}
	ionViewCanEnter() {
		if(Object.keys(this.global.loggedUser).length >0) {
			this.navCtrl.push(DashboardPage);
		}
	}
	onLoadSignIn()
	{
		this.navCtrl.push(SigninPage);
	}
	onLoadSignUp()
	{
		this.navCtrl.push(SignupPage)
	}
	
}
