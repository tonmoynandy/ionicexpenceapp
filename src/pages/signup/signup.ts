import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {Validators,  FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import {SigninPage} from "../signin/signin";
import {Global} from "../../app/global.config";
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	private signUpData : FormGroup;
  	constructor(
  			public navCtrl: NavController, 
  			public loader : LoadingController,
  			public alert : AlertController,
  			public navParams: NavParams,
  			public auth : AuthProvider,
  			public global : Global) {
  		this.signUpData = new FormGroup({
	    	phoneno : new FormControl('',[Validators.required,Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
	    	name : new FormControl('',[Validators.required]),
	    	password : new FormControl('',[Validators.required])
	    });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SignupPage');
  	}

  	errorMessage : string = '';
  	signFormPost()
  	{
  		let loader = this.global.openLoader();
  		let postData = this.signUpData.value;
  		this.auth.signupPost(postData)
  		.subscribe(response=>{
  			this.global.closeLoader(loader);
  			if (response['status'] == 0) {
  				const alert = this.alert.create({
			      title: 'Error !',
			      subTitle: response['message'],
			      buttons: ['OK']
			    });
			    alert.present();
  			} else {
  				const alert = this.alert.create({
			      title: 'Success !',
			      subTitle: "You successfully join with us. ",
			      buttons: [{
			      	text : "OK",
			      	handler : data =>{
			      		this.navCtrl.push(SigninPage);
			      	}
			      }]
			    });
			    alert.present();
  			}
  		})
  	}


}
