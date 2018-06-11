import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { AlertController, LoadingController , IonicPage, NavController, NavParams} from 'ionic-angular';
import {Validators,  FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Global } from '../../app/global.config';
import {DashboardPage} from "../dashboard/dashboard";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  private logData : FormGroup;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public alertCtrl: AlertController,  
      private auth : AuthProvider,
      public loadingCtrl: LoadingController,
      public global : Global,
      private device: Device
      ) {
    let uuid = this.device.uuid;
  		this.logData = new FormGroup({
	    	phoneno : new FormControl('',[Validators.required,Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
	    	password : new FormControl('',[Validators.required]),
        uuid : new FormControl(uuid)
	    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  logForm()
  {
    let loader = this.global.openLoader();
  	this.auth.login(this.logData.value)
  	.subscribe(response  => {
      this.global.closeLoader(loader);
  		let responseData = response;
  		if (responseData['status'] == 0){
	  		const alert = this.alertCtrl.create({
		      title: 'Error !',
		      subTitle: responseData['message'],
		      buttons: ['OK']
		    });
		    alert.present();
	  	} else{
         //console.log(responseData);
          this.global.setLoggedUser(responseData['userdata']);
        	this.navCtrl.push(DashboardPage)
     	}
  	})
  }

}
