import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
@Injectable()
export class Global
{	
	APPLICATION_NAME =  'expense';
	API_URL = 'https://apibinssoft.herokuapp.com';
	//API_URL = 'http://localhost:8080';
	HTTP_HEADER = {
	  	'Access-Control-Allow-Origin' : "*",
	  	"Access-Control-Allow-Credentials": "true",
	  	"Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT",
	  	"Access-Control-Allow-Headers": "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
	    'Content-Type':  'application/json'
	  }
	constructor(
	    public loader : LoadingController
	    ) { 
		this.getLoggedUser();
	}
	loggedUser : any = {};
	getLoggedUser()  {
		/*let authUser = this.cookies.get('_u');
		if(authUser){
			this.loggedUser = JSON.parse( atob(authUser));
		}*/
		
	} 
	setLoggedUser(lUser)  {
		//console.log(lUser);
		this.loggedUser = lUser; 
	}

	expenseDetails : any ;
	setExpenseDetails(details)
	{
		this.expenseDetails = details;
	}
	openLoader()
	{
		let loaderElement = this.loader.create({
	      content: "Please wait...",
	    });
	    loaderElement.present();
	    return loaderElement;
	}
	closeLoader(loaderElement)
	{
		loaderElement.dismiss();
	}

	groupMasterId :any ;
	setGroupmasterId(id)
	{
		this.groupMasterId = id;
	} 
}