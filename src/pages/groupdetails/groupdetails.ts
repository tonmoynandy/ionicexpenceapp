import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, ActionSheetController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';

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
		id : '',
		members : []
	};
	adminUser : any = {};
	createdUser : any = {};
	authUser : any = {};
	constructor(public navCtrl: NavController, 
				public navParams: NavParams, 
				public menuCtrl : MenuController,
				private transfer: FileTransfer, 
				private file: File,
				public actionSheetCtrl: ActionSheetController,
				public global:Global, 
				public general : GeneralProvider, 
				public alert : AlertController,
				public loader : LoadingController,
				private diagnostic: Diagnostic) {
		this.groupId = this.navParams.get('groupid');
		this.authUser = this.global.loggedUser;
		
		
	}
	openMenu() {
	   this.menuCtrl.enable(true, 'details-menu'); 
	   this.menuCtrl.toggle();
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

	doRefresh(refresher) {
	    console.log('Begin async operation', refresher);
	    this.getGroupDetails();
	    setTimeout(() => {
	      console.log('Async operation has ended');
	      refresher.complete();
	    }, 2000);
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
	goToHome()
	{
		this.menuCtrl.enable(false, 'details-menu'); 
		this.menuCtrl.enable(true, 'dashboard-menu'); 
		this.navCtrl.push(DashboardPage);
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
		var buttons = [];
		buttons.push({
          text: 'Home',
          handler: () => {
            this.goToHome();
          }
        });
        buttons.push({
			text: 'Add Member',
			handler: () => {
				this.openAddMemberModal();
			}
        	
        });
        buttons.push({
			text: 'Statistics',
			handler: () => {
				this.goToStatistics();
			}
        	
        })
        buttons.push({
			text: 'Export',
			handler: () => {
				this.exportGroup();
			}
        	
        })
        if (this.authUser.id == this.adminUser.id) {
            buttons.push({
    			text: 'Delete',
    			handler: () => {
    				this.deleteGroup();
    			}
            	
            })
        }
		
	    const actionSheet = this.actionSheetCtrl.create({
	      title: 'Action',
	      buttons:buttons
	    });
	    actionSheet.present();
		/*if (this.menu == true) {
			this.menu = false;
		} else {
			this.menu = true;
		}*/
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
		this.menuCtrl.enable(true, 'dashboard-menu'); 
		this.navCtrl.push(StatisticsPage,{'groupid': this.groupId});
	}

	setAsAdmin(member)
	{
		if(member.deposit > 0) {
			let alert = this.alert.create({
			    title: 'Alert !',
			    message: member.name + ' already have deposit amount, not able to set as admin.',
			    buttons: [
			      {
			        text: 'OK',
			        role: 'cancel',
			        handler: () => {}
			      }
			    ]
			  });
			  alert.present();
		} else {
			let alert = this.alert.create({
			    title: 'Alert !',
			    message: 'Are you sure to set '+member.name+' as admin?',
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
			        	var memberList = this.groupDetails['members'];
			        	console.log(memberList);
			        	var mList = [];
			        	for(let m of memberList) {
			        		var row = {
			        			id : m.id,
			        			name : m.name,
			        			deposit : parseFloat(m.deposit),
			        			admin : 0,
			        		};
			        		if(m.admin == 1) {
			        			row['admin'] = 0;
			        		}
			        		if(m.id == member.id) {
			        			row['admin'] = 1;
			        		}
			        		mList.push(row);
			        	}
			        	var postData ={
			        		groupId : this.groupId,
			        		members : mList,
			        		adminUser : {
			        			id : member['id'],
			        			name : member['name']
			        		}
			        	}
			        	this.general.setAsAdmin(postData).subscribe(response => {
			        		this.getGroupDetails();
			        	})
			        }
			      }
			    ]
			  });
			  alert.present();
		}
	}

	exportGroup()
	{
		this.diagnostic.requestExternalStorageAuthorization().then(()=>{
		//User gave permission 
			let loaderElement = this.loader.create({
		      content: "Downloading...",
		    });
		    loaderElement.present();
			this.general.downloadFile(this.groupId).subscribe(data => {
				if (data['status'] == 1) {
					
					const fileTransfer: FileTransferObject = this.transfer.create();
					const pdfUrl = this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/'+this.groupId+'.pdf';
					  fileTransfer.download(pdfUrl, this.file.externalRootDirectory + 'Download/'+this.groupId+'.pdf', true).then((entry) => {
					    let alert = this.alert.create({
							title : 'Success!',
							message : 'Download completed. Open  Local >> Internal Storage >> Download to get the exported file'
						});
						 alert.present();
						 loaderElement.dismiss();
					   // console.log('download complete: ' + entry.toURL());
					  }, (error) => {
					    // handle error
					    let alert = this.alert.create({
							title : 'Error Download Alert',
							message :  error.json()
						});
						 alert.present();
					  });
					
				}
			})
		}).catch(error=>{
			let alert = this.alert.create({
					title : 'Error Permission Alert',
					message :  error.json()
				});
			alert.present();
		});
	}
	presentActionSheet(user) {
		var buttons = []; 
		buttons.push({
	          text: 'Pay',
	          handler: () => {
	            this.openPay(user.id);
	          }
	        });
		if (this.authUser.id == this.adminUser.id && user.id != this.adminUser.id && user.deposit == 0) {
			buttons.push({
	          text: 'Set Admin',
	          handler: () => {
	            this.setAsAdmin(user.id)
	          }
	        })
		}
		if (this.authUser.id == this.adminUser.id && user.id != this.adminUser.id) {
			buttons.push({
	          text: 'Deposit',
	          handler: () => {
	            this.openDeposit(user.id);
	          }
	        })
		}
		if (this.authUser.id == this.adminUser.id && user.id != this.adminUser.id) {
			buttons.push({
	          text: 'Delete',
	          handler: () => {
	            this.deleteGroupUser(user.id)
	          }
	        });
		}
	    const actionSheet = this.actionSheetCtrl.create({
	      title: 'Action',
	      buttons:buttons
	    });
	    actionSheet.present();
	  }
	openDetails(user) {
	
		let alert = this.alert.create({
	    title: user.name,
	    message: "<p>Deposit : &#8377;"+ user.deposit+"</p><p>Pay Share : &#8377;"+user.paidFor+"</p><p>Pay : &#8377;"+user.paidBy+"</p><p>Balance : &#8377;"+user.balance+"</p>",
	   
	  });
	  alert.present();
	}
}
