import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from 'src/app/dialogs/dialog.module';



@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,NgxFileDropModule,DialogModule
  ],
  exports:[FileUploadComponent] // diğer componentlerde kullanabilmek için export ettik.onların ana modulüne de import ettik
})
export class FileUploadModule { }
