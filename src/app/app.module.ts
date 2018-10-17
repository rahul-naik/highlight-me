import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { HighlightTextComponent } from './highlight-text/highlight-text.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    HighlightTextComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [HighlightTextComponent],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const customText = createCustomElement(HighlightTextComponent, { injector: this.injector });
    customElements.define('highlight-me', customText);
  }
}
