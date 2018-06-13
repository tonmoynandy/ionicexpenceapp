import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Global} from "../app/global.config";
import {GeneralProvider} from '../providers/general/general';
import { Device } from '@ionic-native/device';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, global : Global, general : GeneralProvider, device: Device) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let uuid = device.uuid;
      if(uuid!=null) {
        general.checkUuidAvailable(uuid).subscribe((responseData)=>{
          if (responseData['status'] == 1) {
            global.setLoggedUser(responseData['user']);
            statusBar.styleDefault();
            splashScreen.hide();
          }
        })
      } else {
        console.log('no data');
        statusBar.styleDefault();
        splashScreen.hide();
      }
      
    });
  }
}

