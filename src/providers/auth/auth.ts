import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Global} from '../../app/global.config';

@Injectable()
export class AuthProvider {
	httpOptions = {};
	constructor(public http: HttpClient, public global : Global) {
	this.httpOptions = {
	  headers: new HttpHeaders(this.global.HTTP_HEADER)
	};
	}

	login(postData)
	{
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/auth/signin', JSON.stringify(postData), this.httpOptions);
	}
	signupPost(postData:any) {
		return this.http.post(this.global.API_URL+'/'+this.global.APPLICATION_NAME+'/auth/signup', JSON.stringify(postData), this.httpOptions)
	}
}
