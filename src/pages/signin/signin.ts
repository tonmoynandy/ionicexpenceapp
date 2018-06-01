import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import {DashboardPage} from "../dashboard/dashboard";
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  private logData : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,  private auth : AuthProvider) {
  		this.logData = new FormGroup({
	    	phoneno : new FormControl('',[Validators.required,Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
	    	password : new FormControl('',[Validators.required])
	    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  logForm()
  {
  	this.auth.login(this.logData.value).subscribe(response  => {
  		let responseData = response;
  		if (responseData['status'] == 0){
	  		const alert = this.alertCtrl.create({
		      title: 'Error !',
		      subTitle: responseData['message'],
		      buttons: ['OK']
		    });
		    alert.present();
	  	} else{
        //this.cookies.set('_u', window.btoa( JSON.stringify(responseData['userdata']) ), 356)
        //window.location.href = '#/home'; 
        //this.global.setLoggedUser(responseData['userdata']);
        	this.navCtrl.push(DashboardPage)
     	}
  	})
  }

}
