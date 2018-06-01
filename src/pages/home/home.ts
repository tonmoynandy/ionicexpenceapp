import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public navCtrl: NavController) {

	}
	onLoadSignIn()
	{
		this.navCtrl.push(SigninPage);
	}
	onLoadSignUp()
	{
		this.navCtrl.push(SignupPage)
	}
	/*onLoadSignin()
	{
		//alert('signin');
		this.navCtrl.push('SigninPage');
	}
	ongoToSignUp()
	{
		alert('signup');
		//this.navCtrl.push('SignupPage')
	}*/
}
