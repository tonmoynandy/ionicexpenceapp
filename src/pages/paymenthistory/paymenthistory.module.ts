import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymenthistoryPage } from './paymenthistory';

@NgModule({
  declarations: [
    PaymenthistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymenthistoryPage),
  ],
})
export class PaymenthistoryPageModule {}
