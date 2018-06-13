import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
	newpassword : string = '';
	authUser : object = {};
	successMessage : string = "";
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public global : Global,
		public general : GeneralProvider) {
		this.authUser = this.global.loggedUser;
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad ChangepasswordPage');
	}
	saveNewPassword()
	{
		let postData = {
			id : this.authUser['id'],
			password : this.newpassword
		};
		this.general.resetPassword(postData).subscribe((response)=>{
			this.newpassword = '';
			this.successMessage = 'Password is updated successfully';
		})
	}

}
