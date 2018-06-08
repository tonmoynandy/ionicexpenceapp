import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Global} from "../../app/global.config";
import {GeneralProvider} from '../../providers/general/general';

import {GroupdetailsPage} from '../groupdetails/groupdetails'
/**
 * Generated class for the AddmemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addmember',
  templateUrl: 'addmember.html',
})
export class AddmemberPage {
 	groupId : string = '';
 	member : any = {
 		id : '',
 		name : '',
 		deposit : 0
 	};
 	userList : any = [];
 	search : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public global : Global, public general : GeneralProvider) {
  	this.groupId = this.navParams.get('groupid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmemberPage');
  }

  searchMember()
  {
  	this.userList = [];
  	if (this.search.length > 1) {
  		this.general.searchUser(this.search).subscribe(response =>{
        	this.userList = response;

        })
  	}
  }
  selectMember(member)
  {
  	this.member.id = member.id;
  	this.member.name = this.search = member.name; 
  	this.userList=[];
  }

  onSaveMember()
  {
  	let postData = {
		id : this.groupId,
		user : this.member
	};
	this.general.addGroupMember(postData).subscribe((response)=>{
		this.navCtrl.push(GroupdetailsPage,{"groupid":this.groupId});
	})
  }

}
