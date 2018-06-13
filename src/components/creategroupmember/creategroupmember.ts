import { Component } from '@angular/core';
import {  ViewController } from 'ionic-angular';
import {GeneralProvider} from '../../providers/general/general';

/**
 * Generated class for the CreategroupmemberComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'creategroupmember',
  templateUrl: 'creategroupmember.html'
})
export class CreategroupmemberComponent {

  member : any = {
			id : '',
			name : '',
			admin : 0,
			deposit : 0
		};
	userList : any = [];
	search : string = "";
  constructor( private general : GeneralProvider, public viewCtrl: ViewController) {
    
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

  dismissModal()
  {
  	//let data = this.member;
   	this.viewCtrl.dismiss();
  }
  saveMember()
  {
  	let data = this.member;
  	this.viewCtrl.dismiss(data);	
  }
}
