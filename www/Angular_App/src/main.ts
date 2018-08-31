import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MyEOKModule } from './app/myeok.module';


import './styles.scss';

if (process.env.ENV && process.env.ENV.indexOf("prod") > -1) {
  console.log("Enabling prod mode.");
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MyEOKModule)
  .catch(err => console.log(err));