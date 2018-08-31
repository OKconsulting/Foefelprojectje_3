import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import * as moment from "moment";

@Component({
    selector: 'myeok-history',
	templateUrl: './history.component.html',
})

export class MyEOKHistory {
    public form: FormGroup;

    public holidays: any = 
    [ 
        {
            key: '01/01/18 - 05/01/18',
            label: '01/01/18 - 05/01/18'
         },
         { 
             key: '10/03/18 - 15/03/18',
             label: '10/03/18 - 15/03/18'
         }, 
         { 
            key: '01/03/18 - 20/03/18',
            label: '01/03/18 - 20/03/18'
         }
    ];

    public holiday: string;

    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            holiday: [this.holidays[0].key]
        });

        this.form.statusChanges.subscribe(this.selectHoliday);
    }

    selectHoliday(form: FormGroup) : void {
        console.log(form);
    }
}
