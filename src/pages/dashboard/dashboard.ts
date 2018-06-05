import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import { GroupdetailsPage } from '../groupdetails/groupdetails';
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
		public general : GeneralProvider,
		public global : Global,
		) {
	}
	groups : any = [];
	ionViewDidLoad() {
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
}
