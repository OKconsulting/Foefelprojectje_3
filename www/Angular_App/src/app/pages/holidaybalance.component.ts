
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInputOption } from 'arizona-pattern-library/lib/model/form-input-option.interface';

@Component({
    selector: 'myeok-balance',
	templateUrl: './holidaybalance.component.html',
	////providers: [DoccleService]
})

export class MyEOKHolidayBalance {

	public selectFrm: FormGroup;

	public yearOptions: FormInputOption[] = [
		{
			key: "2017",
			label: "2017"
		},
		{
			key: "2018",
			label: "2018"
		},
		{
			key: "2019",
			label: "2019"
		},
	]

	public typeOptions: FormInputOption[] = [
		{
			key: "40",
			label: "Jaarlijkse vakantie"
		},
		{
			key: "41",
			label: "Recup"
		},
		{
			key: "42",
			label: "ADV"
		},
	]

	constructor(private fb: FormBuilder) {
		this.selectFrm = fb.group({
			year: ["2018"],
			type: ["40"]
		});

		this.selectFrm.valueChanges.subscribe(this.formChanged);
	}

	formChanged(form): void {
		console.log("change form:");
		console.log(form);
	}
}