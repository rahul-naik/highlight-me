import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-text',
  templateUrl: './highlight-text.component.html',
  styleUrls: ['./highlight-text.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class HighlightTextComponent implements OnInit {

  @Input() color = '#ecc63080';
  constructor() { }

  ngOnInit() {
  }

}
