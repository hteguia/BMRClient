import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendSmsComponent } from './views/send-sms/send-sms.component';
import { SmsRoutingModule } from './sms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BalanceSmsComponent } from './common/balance-sms/balance-sms.component';
import { SmsService } from './services/sms.service';
import { SmsTopupComponent } from './views/sms-topup/sms-topup.component';
import { AddSmsTopupComponent } from './views/add-sms-topup/add-sms-topup.component';
import { UserBillingsResolver } from './resolvers/user-billings.resolver';
import { TopupResolver } from './resolvers/topup.resolver';



@NgModule({
  declarations: [
    SendSmsComponent,
    BalanceSmsComponent,
    SmsTopupComponent,
    AddSmsTopupComponent
  ],
  imports: [
    CommonModule,
    SmsRoutingModule,
    SharedModule
  ],
  providers:[SmsService, UserBillingsResolver, TopupResolver]
})
export class SmsModule { }
