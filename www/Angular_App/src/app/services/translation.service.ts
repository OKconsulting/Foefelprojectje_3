import { URLSearchParams } from '@angular/http';
import { AbstractTranslateLoader } from 'arizona-pattern-library/lib/classes/abstract-translate-loader';
import { TranslationService } from 'arizona-pattern-library/lib/services/translation.service';
import { Observable } from 'rxjs';

const TRANSLATION_NL = {
    DATE_PICKER: {
		'MO': 'Maa',
		'TU': 'Din',
		'WE': 'Woe',
		'TH': 'Don',
		'FR': 'Vri',
		'SA': 'Zat',
		'SU': 'Zon',
		'JAN': 'Jan',
		'FEB': 'Feb',
		'MAR': 'Maa',
		'APR': 'Apr',
		'MAY': 'Mei',
		'JUN': 'Jun',
		'JUL': 'Jul',
		'AUG': 'Aug',
		'SEP': 'Sep',
		'OCT': 'Okt',
		'NOV': 'Nov',
		'DEC': 'Dec',
		'TODAY': 'Vandaag',
		'TO': 'tot',
		'FORMAT': 'dd/mm/jjjj',
	},
}
const TRANSLATION_FR = {
    DATE_PICKER: {
		'MO': 'Maa',
		'TU': 'Din',
		'WE': 'Woe',
		'TH': 'Don',
		'FR': 'Vri',
		'SA': 'Zat',
		'SU': 'Zon',
		'JAN': 'Jan',
		'FEB': 'Feb',
		'MAR': 'Maa',
		'APR': 'Apr',
		'MAY': 'Mei',
		'JUN': 'Jun',
		'JUL': 'Jul',
		'AUG': 'Aug',
		'SEP': 'Sep',
		'OCT': 'Okt',
		'NOV': 'Nov',
		'DEC': 'Dec',
		'TODAY': 'Vandaag',
		'TO': 'tot',
		'FORMAT': 'dd/mm/jjjj',
	},
}
const TRANSLATION_DE = {
    DATE_PICKER: {
		'MO': 'Maa',
		'TU': 'Din',
		'WE': 'Woe',
		'TH': 'Don',
		'FR': 'Vri',
		'SA': 'Zat',
		'SU': 'Zon',
		'JAN': 'Jan',
		'FEB': 'Feb',
		'MAR': 'Maa',
		'APR': 'Apr',
		'MAY': 'Mei',
		'JUN': 'Jun',
		'JUL': 'Jul',
		'AUG': 'Aug',
		'SEP': 'Sep',
		'OCT': 'Okt',
		'NOV': 'Nov',
		'DEC': 'Dec',
		'TODAY': 'Vandaag',
		'TO': 'tot',
		'FORMAT': 'dd/mm/jjjj',
	},
}

export function MYEOKTranslateLoaderFactory(translationService: TranslationService) {
    console.log("factory created translation service");
	return new MYEOKTranslateLoader(translationService);
}

export class MYEOKTranslateLoader extends AbstractTranslateLoader {

    constructor(translate: TranslationService) {
        console.log("created translate loader");
        super(translate);
    }

	getTranslationURL(lang: string): string {
		return 'https://path.to.your/api/translation';
	}

	getSearchParams(lang: string): URLSearchParams | {[key: string]: any} {
		return {language: lang};
    }
    
    getTranslation(lang: string): Observable<any> {
		return Observable.of(this.getUITranslation(lang));
	}

	getUITranslation(lang: string): any {
        console.log("get translations: " + lang);
		switch (lang) {
			case 'fr':
				return TRANSLATION_FR;
			case 'de':
				return TRANSLATION_DE;
			case 'nl':
			default:
				return TRANSLATION_NL;
		}
	}
}