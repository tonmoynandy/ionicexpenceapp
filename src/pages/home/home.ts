import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { NavController, AlertController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";
import {DashboardPage} from "../dashboard/dashboard";
import {Global} from "../../app/global.config";
import {GeneralProvider} from '../../providers/general/general';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(private global : Global, private general : GeneralProvider, public navCtrl: NavController, public alertCtrl : AlertController, private device: Device) {
		

	}
	ionViewCanEnter() {
	    let uuid = this.device.uuid;
		if(uuid!=null) {
			this.general.checkUuidAvailable(uuid).subscribe((responseData)=>{
				if (responseData['status'] == 1) {
					this.global.setLoggedUser(responseData['user']);
					this.navCtrl.push(DashboardPage);
				}
			})
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
