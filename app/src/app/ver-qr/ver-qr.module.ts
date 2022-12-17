import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerQRPageRoutingModule } from './ver-qr-routing.module';

import { VerQRPage } from './ver-qr.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerQRPageRoutingModule,
    QRCodeModule
  ],
  declarations: [VerQRPage]
})
export class VerQRPageModule {}
