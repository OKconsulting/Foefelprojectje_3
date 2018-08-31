import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule, NgbRootModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MyEOKApp } from './myeok.component';
import { MyEOKHome } from './pages/home.component';
import { MyEOKHolidayRequest } from './pages/holidayrequest.component'; 
import { MyEOKHolidayBalance } from './pages/holidaybalance.component'; 
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyEOKtreatAbsence } from './pages/treatabsence.component';
import { MyEOKHistory } from './pages/history.component';
import { MyEOKInfo } from './pages/info.component';
import { MyEOKSickRequest } from './pages/requestsick.component';

import { HeaderComponent } from 'arizona-pattern-library/lib/components/header/header.component';
import { FormFooterComponent, TextInputComponent, NumberInputComponent, NumberTextInputComponent, 
  TextareaComponent, DatePickerComponent, FeedbackComponent, RadioButtonComponent, MultiSelectComponent, 
  InputSelectComponent, CheckboxComponent } from 'arizona-pattern-library/lib/components/form';
import  { LoaderComponent } from 'arizona-pattern-library/lib/components/loader/loader.component';
import { ToggleMenuComponent } from 'arizona-pattern-library/lib/components/toggle-menu/toggle-menu.component';
import { FormComponent } from 'arizona-pattern-library/lib/components/form/form.component';
import { TranslationService } from 'arizona-pattern-library/lib/services/translation.service';
import { MYEOKTranslateLoader, MYEOKTranslateLoaderFactory } from './services/translation.service';

// import fontawesome from '@fortawesome/fontawesome';
// import solid from '../../node_modules/@fortawesome/fontawesome-free-solid';

// fontawesome.library.add(solid);

registerLocaleData(localeNl);

const routes: Routes = [
  { path: 'holidaybalance', component: MyEOKHolidayBalance },
  { path: 'holidayrequest', component: MyEOKHolidayRequest },
  { path: 'processholidays', component: MyEOKtreatAbsence },
  { path: 'history', component: MyEOKHistory },
  { path: 'info', component: MyEOKInfo },
  { path: 'sickleave', component: MyEOKSickRequest },
  { path: '', component: MyEOKHome },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    MyEOKApp,
    MyEOKHome,
    MyEOKHolidayRequest,
    MyEOKHolidayBalance,
    MyEOKtreatAbsence,
    MyEOKHistory,
    MyEOKInfo,
    MyEOKSickRequest,
    CalendarComponent,
    HeaderComponent,
    ToggleMenuComponent,
    FormComponent,
    FormFooterComponent,
    TextInputComponent,
    NumberInputComponent,
    NumberTextInputComponent,
    TextareaComponent,
    DatePickerComponent,
    FeedbackComponent,
    RadioButtonComponent,
    InputSelectComponent,
    MultiSelectComponent,
    CheckboxComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule.forRoot(),
    NgbPopoverModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    PdfViewerModule,
    TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (MYEOKTranslateLoaderFactory),
				deps: [TranslationService, HttpClient],
			}
		})
  ],
  providers: [
    TranslationService,
    HttpClient,
  ],
  bootstrap: [MyEOKApp],
  exports: [
    TranslateModule
	]
})
export class MyEOKModule { }
