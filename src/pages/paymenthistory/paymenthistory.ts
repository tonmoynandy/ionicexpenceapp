import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";
import {PaymentPage} from '../payment/payment'

@IonicPage()
@Component({
  selector: 'page-paymenthistory',
  templateUrl: 'paymenthistory.html',
})
export class PaymenthistoryPage {
	groupId : string = '';
	groupDetails : object = {
		name : '',
		id : ''
	};
	authUser : any;
	adminUser: any;
	constructor(public navCtrl: NavController, 
			public navParams: NavParams,
			public alert : AlertController,
		public global : Global,
		public general : GeneralProvider) {

			this.groupId = this.navParams.get('groupid');
			this.authUser = this.global.loggedUser;
			
	}

	ionViewDidLoad() {
		this.getHistory();
	}
	expenseList : any = [];
	getHistory()
	{
		let loder  = this.global.openLoader();
		this.general.getGroupDetails(this.groupId)
		.subscribe(data=>{
			this.global.closeLoader(loder);
			this.groupDetails  = data;
			this.adminUser = this.groupDetails['members'].find((m)=> {
	  			return m.admin == 1;
	  		})
			this.general.getGroupExpenseHistory(this.groupId).subscribe((response)=>{
				this.expenseList = response;
			})
		})
	}

	deleteExpense(expId)
	{
		let alert = this.alert.create({
		    title: 'Delete !',
		    message: 'Are you sure to remove this expence from the group?',
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
		         this.general.deleteGroupExpense(expId).subscribe((response)=>{
					if (response['status'] == true) {
						this.getHistory();
					}
				})
		        }
		      }
		    ]
		  });
		  alert.present();
	}

	editExpense(expence)
	{
		this.global.setExpenseDetails(expence);
		this.navCtrl.push(PaymentPage,{
			groupId : this.groupId,
			memberId : expence['paidBy'],
			expenceId : expence['id']
		})
	}
	
}
