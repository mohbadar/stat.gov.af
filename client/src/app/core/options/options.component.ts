import {
  Component,
  NgZone,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  // currentLang = 'en';

  options = {
    dark: false,
    boxed: false,
    collapsed: true,
    // dir: 'rtl'
  };

  @Output()
  messageEvent = new EventEmitter<Object>();
  @Output()
  toggleFullscreen = new EventEmitter<void>();

  @ViewChild(PerfectScrollbarDirective, { static: false })
  directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public translate: TranslateService, zone: NgZone) {
    // const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    // this.mediaMatcher.addListener(mql =>
    //   zone.run(() => {
    //     this.mediaMatcher = mql;
    //   })
    // );
  }

  sendMessage() {
    this.messageEvent.emit(this.options);
  }
}
