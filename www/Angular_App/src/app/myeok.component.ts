import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
////import { DoccleService } from './services/DoccleService.service';
import { Observable } from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";
import { HeaderNavItem } from "arizona-pattern-library/lib/model/header-nav-item.interface";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'myeok-root',
	templateUrl: './myeok.component.html',
	styleUrls: ['./myeok.component.css'],
	////providers: [DoccleService]
})

/**
 * @desc The main app component for paychecks.
 */
export class MyEOKApp implements OnInit {
	/**
	 * @desc The app title.
	 */
	public title: string = '';

	/**
	 * @desc Indicates the app is loading.
	 */
    public loading: boolean = true;
    
    public navigationLinks: Observable<HeaderNavItem[]> = Observable.of([
		{
            title: "Kalender",
			routerLink: '',
			icon: 'fa-home fa-fw',
			disabled: false
        },
        {
            title: "Verlofsaldo",
			routerLink: 'holidaybalance',
			icon: 'fa-money-bill-alt fa-fw',
			disabled: false
        },
        {
            title: "Verlof aanvragen",
			routerLink: 'holidayrequest',
			icon: 'fa-calendar fa-fw',
			disabled: false
		},
		{
            title: "Ziekte aanvragen",
			routerLink: 'sickleave',
			icon: 'fa-user-md fa-fw',
			disabled: false
        },
        {
            title: "Verlof behandelen",
			routerLink: 'processholidays',
			icon: 'fa-calendar-check fa-fw',
			disabled: false
        },
        {
            title: "Historiek",
			routerLink: 'history',
			icon: 'fa-history fa-fw',
			disabled: false
        },
        {
            title: "Info",
			routerLink: 'info',
			icon: 'fa-info-circle fa-fw',
			disabled: false
        },
    ]);

	/**
	 * @desc When the user is not using doccle this contains the translation.
	 */
	public doccleStatusMessage: string;

	/**
	 * @desc Initializes the app root.
	 * @param doccleSerivce The doccle service.
	 */
	constructor(private router: Router, private translate: TranslateService) {
	}

	/**
	 * @desc Initialize the component.
	 */
	ngOnInit(): void {
		this.translate.setDefaultLang('nl');
		
		
		// // let translations = this.doccleSerivce.getTranslations();
		// // let status = this.doccleSerivce.getDoccleStatus();

		// // forkJoin([translations, status])
		// // 	.subscribe(
		// // 		results => {
		// // 			this.title = results[0].PageTitle;
		// // 			if (results[1].toLowerCase() !== 'optin') {
		// // 				this.doccleStatusMessage = results[0][results[1]];
		// // 			} else {
		// // 				this.doccleStatusMessage = null;
		// // 			}

		// // 			this.loading = false;
		// // 		},
		// // 		error => console.log("Error :: " + error)
		// // 	);
	}
}
