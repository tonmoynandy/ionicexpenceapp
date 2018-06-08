import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";
import {PaymentPage} from '../payment/payment'
import { PaymenthistoryPage } from '../paymenthistory/paymenthistory';
import { AddmemberPage } from '../addmember/addmember';
import { DashboardPage } from '../dashboard/dashboard';
import { StatisticsPage } from '../statistics/statistics';
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
	authUser : any = {};
	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public global:Global, 
				public general : GeneralProvider, 
				public alert : AlertController) {
		this.groupId = this.navParams.get('groupid');
		this.authUser = this.global.loggedUser;
		
		
	}
	getGroupDetails()
	{
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
	openDeposit(memberId)
	{
		let member = this.groupDetails['members'].find((m)=>{
			return m.id == memberId;
		})
		let alert = this.alert.create({
	    title: 'Deposit',
	    inputs: [
	      {
	        name: 'deposit_amount',
	        placeholder: 'Amount',
	        value : member['deposit']
	      },
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Save',
	        handler: data => {
	          let postData = {
					memberId : member['id'],
					admin : {id : this.adminUser['id'], name : this.adminUser['name']},
					groupId : this.groupDetails['id'],
					deposit : { 
						old : parseInt(member['deposit']),
						new : parseInt(data.deposit_amount)
					}
				};
				this.general.saveDeposit(postData).subscribe(response=>{
					this.getGroupDetails();
				})
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	deleteGroupUser(memberId)
	{
		let member = this.groupDetails['members'].find((m)=>{
			return m.id == memberId;
		})
		let alert = this.alert.create({
		    title: 'Delete !',
		    message: 'Are you sure to remove '+member['name']+' from the group?',
		    buttons: [
		      {
		        text: 'No',
		        role: 'cancel',
		        handler: () => {
		          
		        }
		      },
		      {
		        text: 'Yes',
		        handler: () => {
		          this.general.deleteGroupUser(this.groupId, memberId).subscribe((response)=>{
						if (response['status'] == true) {
							this.getGroupDetails();
						}
					})
		        }
		      }
		    ]
		  });
		  alert.present();
	}

	openPay(memberId)
	{
		this.global.setExpenseDetails(null);
		this.navCtrl.push(PaymentPage,{
			groupId : this.groupId,
			memberId : memberId,
		})
	}

	goToDetails(groupId)
	{
		this.navCtrl.push(PaymenthistoryPage,{"groupid":groupId});
	}
	ionViewDidLoad() {
		this.getGroupDetails();
	}
	menu : boolean = false;
	menuToggle()
	{
		if (this.menu == true) {
			this.menu = false;
		} else {
			this.menu = true;
		}
	}

	openAddMemberModal()
	{
		this.navCtrl.push(AddmemberPage,{'groupid':this.groupId});
	}

	deleteGroup()
	{

		let alert = this.alert.create({
		    title: 'Delete !',
		    message: 'Are you sure to delete '+this.groupDetails['name']+'?',
		    buttons: [
		      {
		        text: 'No',
		        role: 'cancel',
		        handler: () => {
		          
		        }
		      },
		      {
		        text: 'Yes',
		        handler: () => {
		          this.general.deleteGroup(this.groupId).subscribe((response)=>{
						if (response['status'] == true) {
							this.navCtrl.push(DashboardPage);
						}
					})
		        }
		      }
		    ]
		  });
		  alert.present();
		
	}

	goToStatistics()
	{
		this.navCtrl.push(StatisticsPage,{'groupid': this.groupId});
	}
}
