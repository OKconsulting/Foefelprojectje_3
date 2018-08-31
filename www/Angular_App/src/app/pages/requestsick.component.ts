import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import * as moment from "moment";

@Component({
    selector: 'myeok-sick',
	templateUrl: './requestsick.component.html',
})

export class MyEOKSickRequest {
	public form: FormGroup;

	public formLoading: boolean;

	constructor(private fb: FormBuilder) {
		this.form = fb.group({
			dateFrom: new Date(),
			dateTo: new Date(),
            comment: "",
            file: ""
		});
	}

	submitForm(form: FormGroup) {
		this.formLoading = true;
		setTimeout(t => this.formLoading = false, 2000);
	}
}