import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cbp-appbar',
  templateUrl: './cbp.appbar.component.html',
  styleUrls: ['./cbp.appbar.component.scss']
})
export class CBPAppbarComponent implements OnInit {
  /** This is the title of the app. */
  private title: string;
  constructor() { }

  /**
   * This function is called when the component is initilized on the screen.
   */
  ngOnInit() {
    this.title = 'Capital Balance Projection';
  }

}
