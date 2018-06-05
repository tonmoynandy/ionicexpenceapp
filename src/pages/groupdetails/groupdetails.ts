import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";

@IonicPage()
@Component({
  selector: 'page-groupdetails',
  templateUrl: 'groupdetails.html',
})
export class GroupdetailsPage {
	groupId : string ='';
	groupDetails : object = {
		name : '',
		id : ''
	};
	adminUser : any = {};
	createdUser : any = {};
	constructor(public navCtrl: NavController, public navParams: NavParams, public global:Global, public general : GeneralProvider) {
		this.groupId = this.navParams.get('groupid');

		let loder  = this.global.openLoader();
		this.general.getGroupDetails(this.groupId)
		.subscribe(data=>{
			this.global.closeLoader(loder);
			this.groupDetails  = data;
	  		this.adminUser = this.groupDetails['members'].find((m)=> {
	  			return m.admin == 1;
	  		})
	  		this.createdUser = this.groupDetails['members'].find((m)=> {
	  			return m.id == data['createdBy'];
	  		})
		})
	}

	ionViewDidLoad() {
		
	}

}
