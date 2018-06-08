import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";
import {DashboardPage} from "../dashboard/dashboard";
import {CreategroupmemberComponent} from '../../components/creategroupmember/creategroupmember';
/**
 * Generated class for the CreategroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creategroup',
  templateUrl: 'creategroup.html',
})
export class CreategroupPage {

	group : any = {
		name : '',
		startdate : new Date(),
		members : [],
		createdBy : '',
		createdOn : new Date()
	};
	authUser : any = {};
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public global : Global,
				public general : GeneralProvider,
				public alert : AlertController,
				public modal: ModalController) {
		this.authUser = this.global.loggedUser;

	}

	ionViewDidLoad() {
		this.group.members.push({
			id : this.authUser['id'],
			name : this.authUser['name'],
			admin : 1,
			deposit : 0
		});
	}
	openAddMember()
	{
		let addMemberModal = this.modal.create(CreategroupmemberComponent);
		addMemberModal.onDidDismiss(data => {
		 if (data) {
		 	this.group.members.push(data);
		 }
		});
		addMemberModal.present();
	}
	removeItem(index) {
		this.group.members.splice(index,1);
	}

	saveGroup()
	{
		this.general.createGroup(this.group).subscribe((response)=>{
			this.navCtrl.push(DashboardPage)
		});
	}
}
