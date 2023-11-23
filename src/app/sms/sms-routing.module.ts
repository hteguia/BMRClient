import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendSmsComponent } from './views/send-sms/send-sms.component';
import { SmsTopupComponent } from './views/sms-topup/sms-topup.component';
import { AddSmsTopupComponent } from './views/add-sms-topup/add-sms-topup.component';
import { UserBillingsResolver } from './resolvers/user-billings.resolver';
import { TopupResolver } from './resolvers/topup.resolver';


const routes: Routes = [
  { path: 'send', component: SendSmsComponent },
  { path: 'topup', component: SmsTopupComponent, resolve: { topups: TopupResolver } },
  { path: 'add-topup', component: AddSmsTopupComponent, resolve: { billings: UserBillingsResolver }  },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  

export class SmsRoutingModule {

}