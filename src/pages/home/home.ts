import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";
import {DashboardPage} from "../dashboard/dashboard";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor( public navCtrl: NavController, public alertCtrl : AlertController) {
		
	}
	ionViewCanEnter() {
	    
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
