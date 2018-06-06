import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";
import {Validators,  FormGroup, FormControl } from '@angular/forms';
import {GroupdetailsPage} from '../groupdetails/groupdetails'

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
	groupId : string = '';
	memberId : string = '';
	groupDetails : object = {
		name : '',
		id : ''
	};
   paymentFrm : FormGroup;
   category : any = [
		'Food',
		'Drink',
		'Hotel',
		'Medical',
		'Entertainment',
		'Miscellaneous',
		'Parking',
		'Shopping',
		'Toll',
		'Travel'
	];
	shareMembers : any = [] ;
	authUser : any;
	expenceId : string = '';
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public global : Global,
		public general : GeneralProvider) {
		this.groupId = this.navParams.get('groupId');
		this.memberId = this.navParams.get('memberId');
		this.expenceId = this.navParams.get('expenceId');

		this.authUser = this.global.loggedUser;
		this.paymentFrm = new FormGroup({
			description : new FormControl('',[Validators.required]),
			category : new FormControl('',[Validators.required]),
			payDate : new FormControl(new Date(),[Validators.required]),
			payBy : new FormControl('',[Validators.required]),
			amount : new FormControl('',[Validators.required,Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
			shareMembers : new FormControl([],[Validators.required]),
			groupId : new FormControl(this.groupId),
			addedBy : new FormControl(this.authUser['id']),
			id : new FormControl('')
		});

		
	}
	getGroupDetails()
	{

		let loder  = this.global.openLoader();
		this.general.getGroupDetails(this.groupId)
		.subscribe(data=>{
			this.global.closeLoader(loder);
			this.groupDetails  = data;
	  		for(let m of this.groupDetails['members']) {
				this.shareMembers.push({
					id : m['id'],
					name : m['name']
				});
			}
			this.paymentFrm.controls['shareMembers'].setValue(this.shareMembers);
			this.paymentFrm.controls['payDate'].setValue(new Date().toISOString());
			this.paymentFrm.controls['payBy'].setValue(this.memberId);

			if(this.global.expenseDetails && this.expenceId !='') {
				this.paymentFrm.controls['description'].setValue(this.global.expenseDetails['description']);
		  		this.paymentFrm.controls['category'].setValue(this.global.expenseDetails['type']);
		  		this.paymentFrm.controls['amount'].setValue(parseInt(this.global.expenseDetails['amount']));
		  		this.paymentFrm.controls['payDate'].setValue(this.global.expenseDetails['payDate']);
		  		this.paymentFrm.controls['id'].setValue(this.expenceId);
		  		var shareMemberList = [];
		  		for(let m of this.shareMembers) {
		  			var index = this.global.expenseDetails['sharewith'].findIndex((i)=>{
		  				return i.id == m['id']
		  			});
		  			if (index != -1) {
		  				shareMemberList.push(m);
		  			}
		  		}
		  		this.paymentFrm.controls['shareMembers'].setValue(shareMemberList);
			}
		})
	}
	payFormPost()
	{
		this.general.savePay(this.paymentFrm.value).subscribe((response)=> {
				this.navCtrl.push(GroupdetailsPage,{"groupid":this.groupId});
			
		})
	}
	ionViewDidLoad() {
	this.getGroupDetails();
	}

}
