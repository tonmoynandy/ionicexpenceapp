import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import {GeneralProvider} from '../../providers/general/general';
import {Global} from "../../app/global.config";
import {DashboardPage} from "../dashboard/dashboard";
import {HomePage} from "../home/home";
/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public loader: LoadingController, public navCtrl: NavController, public navParams: NavParams, public device: Device, public general : GeneralProvider, public global: Global) {
  }

  ionViewDidLoad() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let uuid = this.device.uuid;

      let loaderElement = this.loader.create({
	      content: "Synchronizing ...",
	    });
	    loaderElement.present();

      if(uuid!=null) {

        this.general.checkUuidAvailable(uuid).subscribe((responseData)=>{
        	loaderElement.dismiss();
          if (responseData['status'] == 1) {
            this.global.setLoggedUser(responseData['user']);
            this.navCtrl.push(DashboardPage);
          } else {
          	this.navCtrl.push(HomePage);
          }
        })
      } else {
      	loaderElement.dismiss();
        this.navCtrl.push(HomePage);
      }
  }

}
