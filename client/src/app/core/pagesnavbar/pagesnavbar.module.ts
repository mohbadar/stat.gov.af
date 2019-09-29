import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesnavbarComponent } from './pagesnavbar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
      RouterModule,
      CommonModule,
      TranslateModule
  ],
  declarations: [PagesnavbarComponent],
  exports: [ PagesnavbarComponent ]
})
export class PagesnavbarModule { }
