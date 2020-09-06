import { Component, OnInit, OnDestroy } from '@angular/core';
import { CBPDataSharingService } from 'src/app/services/cbp.data.sharing.service';
import { Subscription } from 'rxjs';
import { CBPProjectionModel } from 'src/app/Models/cbp.projection.model';
import { CBPFormatter } from 'src/app/formatter/cbp.formatter';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cbp-projection-grid',
  templateUrl: './cbp.projection-grid.component.html',
  styleUrls: ['./cbp.projection-grid.component.scss']
})

/**
 * This class is the grid component.
 * This class is responsible for displaying grid with the latest data feed to it through observable.
 */
export class ProjectionGridComponent implements OnInit, OnDestroy {

  /** This is the subscription variable to store the subscriber. */
  private subscriptions: Subscription;

  /** This is  column defination of the */
  public columnDefs: Array<object>;

  /** This is the row data of the grid. */
  public rowData: CBPProjectionModel[] = [];

  /** This is the default column settings rule. */
  public defaultColDef;

  /** This property will always display the pivot panel. */
  public pivotPanelShow;

  /** This is the pagination size of the grid. */
  public paginationPageSize;

  /** THis is the grid api of the ag grid. */
  public gridApi;

  /** This defines the page size options in an array. */
  public pageSizes: Array<number>;
  /**
   * This is the constructor function of the class.
   * THis initilizes the data sharing service.
   */
  constructor(private dataService: CBPDataSharingService) {
    this.defaultColDef = {
      editable: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
    this.pivotPanelShow = 'always';
    this.paginationPageSize = 100; /** Initilize the page size to 100. */
    this.pageSizes = [25, 50, 100, 250, 500]; /** array of paze size options. */
  }

  /**
   * This is the init lifecycle hook.
   * This function gets called when the compounted is mounted.
   * This function is responsible for initilizing the values to the class.
   */
  ngOnInit() {
     const cbpFormatter = new CBPFormatter();
    /** column def initilization for the row. */
     this.columnDefs = [
      {headerName: 'Year', field: 'year' },
      {headerName: 'Age', field: 'age' },
      {headerName: 'Starting Balance', field: 'startingBalance', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
      {headerName: 'Contributions', field: 'contributionValue', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
      {headerName: 'Earnings', field: 'earningsValue', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
      {headerName: 'Fees', field: 'feeValue', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
      {headerName: 'Tax', field: 'taxValue', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
      {headerName: 'Withdrawls', field: 'withDrawlValue', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
      {headerName: 'End Balance', field: 'endBalance', valueFormatter: (params) => cbpFormatter.currencyFormatter(params)},
    ];

    /** Subscribe to an observable, gets the latest whenever there is change. */
     this.subscriptions = this.dataService.sharedData.subscribe((value) => {
      this.rowData = value; /** Row data initilizations. */
    });
  }

  /** This lifecycle hook is called when the component is destroyed. */
  ngOnDestroy() {
    /** To prevent from memory leak we have to unsubscribe any thing we subscribe in the component. */
    this.subscriptions.unsubscribe();
  }

  /**
   * On page size changed by user run this function.
   * @param newPageSize user selected page size.
   */
  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(newPageSize.value);
  }

  /**
   * On grid ready it will assign the value. to grid api and gridcolumn api.
   */
  public onGridReady(params) {
    this.gridApi = params.api;
  }
}
