import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
	APPLICATION_NAME =  'expense';
	API_URL = 'https://apibinssoft.herokuapp.com';
	//API_URL = 'http://localhost:8080';

	httpOptions = {};
  constructor(public http: HttpClient) {
    this.httpOptions = {
	  headers: new HttpHeaders({
	  	'Access-Control-Allow-Origin' : "*",
	  	"Access-Control-Allow-Credentials": "true",
	  	"Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT",
	  	"Access-Control-Allow-Headers": "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
	    'Content-Type':  'application/json'
	  })
	};
  }

  login(postData)
  {

  	return this.http.post(this.API_URL+'/'+this.APPLICATION_NAME+'/auth/signin', JSON.stringify(postData), this.httpOptions);
  }

}
