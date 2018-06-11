import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Global} from '../../app/global.config';

@Injectable()
export class GeneralProvider {
	httpOptions = {};
	constructor(public http: HttpClient, public global : Global) {
	this.httpOptions = {
	  headers: new HttpHeaders(this.global.HTTP_HEADER)
	};
	}
	
	getUserGroups()
	{	
		let postData = {
			id : this.global.loggedUser['id']
		}
		//console.log(postData);		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/user-groups', JSON.stringify(postData), this.httpOptions)		
	}

	getGroupDetails(id)
	{
		let postData = {
			id : id
		}		
		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/groups-details', JSON.stringify(postData), this.httpOptions)		
	}

	saveDeposit(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/member-deposit-edit', JSON.stringify(postData), this.httpOptions)		
	}

	deleteGroupUser(groupId, userId)
	{
		let postData = {
			userId : userId,
			groupId : groupId
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/delete-group-user', JSON.stringify(postData), this.httpOptions)			
	}

	savePay(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/save-pay', JSON.stringify(postData), this.httpOptions);
	}

	getGroupExpenseHistory(id) 
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/group-expense-history', JSON.stringify(postData), this.httpOptions)		
	}

	deleteGroupExpense(id) 
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/delete-group-expense', JSON.stringify(postData), this.httpOptions)		
	}

	searchUser(term : string) {
		return this.http.get(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/search-user?term='+term)
	}

	addGroupMember(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/add-group-member', JSON.stringify(postData), this.httpOptions)			
	}

	deleteGroup(id)
	{
		let postData = {
			id : id
		}		
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/delete-group', JSON.stringify(postData), this.httpOptions)		
	}
	getStatistics(id) {
		let postdata ={
			id : id
		};
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/group-statistics',JSON.stringify(postdata), this.httpOptions);
	}

	createGroup(postData: object)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/create-group', JSON.stringify(postData), this.httpOptions)
	}

	setAsAdmin(postData : object)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/group-admin-set', JSON.stringify(postData), this.httpOptions)
	}

	checkUuidAvailable(uuid)
	{
		let postData = {
			uuid : uuid
		}
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/check-uuid', JSON.stringify(postData), this.httpOptions)
	}
	removeUuid(uuid)
	{
		let postData = {
			uuid : uuid
		}
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/remove-uuid', JSON.stringify(postData), this.httpOptions)
	}

}
