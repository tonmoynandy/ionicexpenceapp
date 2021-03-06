import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Global} from "../app/global.config";
import {GeneralProvider} from '../providers/general/general';
import { Device } from '@ionic-native/device';
import { LandingPage } from '../pages/landing/landing';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, global : Global, general : GeneralProvider, device: Device) {
    platform.ready().then(() => {
       statusBar.styleDefault();
       splashScreen.hide();
      
    });
  }
}

