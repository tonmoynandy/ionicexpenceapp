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
}
