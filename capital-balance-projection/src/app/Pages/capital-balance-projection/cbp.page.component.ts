import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cbp-page-component',
  templateUrl: './cbp.page.component.html',
  styleUrls: ['./cbp.page.component.scss']
})
export class CBPPageComponent implements OnInit {

  /** this variable will determine to show chart and table or not. */
  public showChartAndTable = false;

  /**
   * Constructor of this component.
   */
  constructor() { }

  /**
   * This lifecycle hook will get called when the component is loaded.
   */
  ngOnInit() {
  }

  /**
   * this function will change the value of show chart and table.
   * @param value boolean true/false
   */
  onValidFormSubmit(value) {
    this.showChartAndTable = value;
  }

}
