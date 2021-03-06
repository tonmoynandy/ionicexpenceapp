import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Device } from '@ionic-native/device';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { GroupdetailsPage } from '../pages/groupdetails/groupdetails';
import { PaymentPage } from '../pages/payment/payment';
import { PaymenthistoryPage } from '../pages/paymenthistory/paymenthistory';
import { AddmemberPage } from '../pages/addmember/addmember';
import { StatisticsPage } from '../pages/statistics/statistics';
import { CreategroupPage } from '../pages/creategroup/creategroup';
import {CreategroupmemberComponent} from '../components/creategroupmember/creategroupmember';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { AuthProvider } from '../providers/auth/auth';
import { GeneralProvider } from '../providers/general/general';
import {Global} from './global.config';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    SigninPage,
    SignupPage,
    DashboardPage,
    GroupdetailsPage,
    PaymentPage,
    PaymenthistoryPage,
    AddmemberPage,
    StatisticsPage,
    CreategroupPage,
    CreategroupmemberComponent,
    ChangepasswordPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    SigninPage,
    SignupPage,
    DashboardPage,
    GroupdetailsPage,
    PaymentPage,
    PaymenthistoryPage,
    AddmemberPage,
    StatisticsPage,
    CreategroupPage,
    CreategroupmemberComponent,
    ChangepasswordPage
  ],
  providers: [
    Global,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    GeneralProvider,
    Device,
    FileTransfer, 
    File,
    Diagnostic
  ]

})
export class AppModule {}
