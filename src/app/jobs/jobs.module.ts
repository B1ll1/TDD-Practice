import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JobsComponent } from './jobs.component';
import { JobsService } from './services/jobs.service';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    JobsComponent
  ],
  exports: [
    JobsComponent
  ],
  entryComponents: [ ],
  providers: [ JobsService ]
})
export class JobsModule { }
