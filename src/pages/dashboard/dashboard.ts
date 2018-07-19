import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import { GroupdetailsPage } from '../groupdetails/groupdetails';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { CreategroupPage } from '../creategroup/creategroup';

import { HomePage } from '../home/home';
import {Global} from "../../app/global.config";
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public loader : LoadingController,
		public menu : MenuController,
		public general : GeneralProvider,
		public global : Global,
		private device: Device
		) {
	}
	authuser : any = {};
	groups : any = [];

	doRefresh(refresher) {
	    console.log('Begin async operation', refresher);

	    setTimeout(() => {
	      console.log('Async operation has ended');
	      refresher.complete();
	    }, 2000);
	  }
	  
	ionViewDidLoad() {
		if (Object.keys(this.global.loggedUser).length == 0 ) {
			this.navCtrl.push(HomePage);
		}
		this.authuser = this.global.loggedUser;
		let loader = this.global.openLoader();
		this.general.getUserGroups()
		.subscribe(response => {
			this.global.closeLoader(loader);
			this.groups = response;
		})
	}

	goToDetails(id)
	{
		this.navCtrl.push(GroupdetailsPage, {"groupid":id});
	}
	openMenu() {
		console.log('openMenu');
	   this.menu.open();
	}

	goToCreateGroup()
	{
		this.navCtrl.push(CreategroupPage);
	}
	goToChangePassword()
	{
		this.navCtrl.push(ChangepasswordPage);
	}
	goToLogout()
	{
		this.global.setLoggedUser({});
		let uuid = this.device.uuid;
		if(uuid!=null) {
			this.general.removeUuid(uuid).subscribe((responseData)=>{
				this.navCtrl.push(HomePage);
			})
		} else {
			this.navCtrl.push(HomePage);
		}

		
	}
}
