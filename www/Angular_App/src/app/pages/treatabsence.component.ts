import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import * as moment from "moment";

@Component({
    selector: 'myeok-treat-absence',
	templateUrl: './treatabsence.component.html',
})

export class MyEOKtreatAbsence {
    public holidays: string[] = ['Emma: 05/03/18 - 07/03/18', 'Patrick: 10/03/18 - 15/03/18', 'José: 01/03/18 - 20/03/18'];

    public holiday: string;

    selectHoliday(item: string) : void {
        this.holiday = item;
    }
}
