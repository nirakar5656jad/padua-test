import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { CBPDataSharingService } from '../../services/cbp.data.sharing.service';
import { CBPProjectionModel } from 'src/app/Models/cbp.projection.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cbp-projection-chart',
  templateUrl: './cbp.projection-chart.component.html',
  styleUrls: ['./cbp.projection-chart.component.scss']
})

/**
 * This class is the chart component.
 * This class is responsible for displaying chart with the latest data feed to it through observable.
 */
export class ProjectionChartComponent implements OnInit, OnDestroy {
  /** declear and initilize the label of the chart. */
  private chartLabel: string;

  private lineChartData: ChartDataSets[];

  private lineChartLabels: Label[] = [];

  private xAxisData: Array<number> = [];

  private yAxisData: Array<string> = [];

  /** Initilize the linechart options. */
  private lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Starting Balance',
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Year',
        }
      }]
    },
    tooltips: {
      callbacks: {
        label(tooltipItems, data) {
          return `Starting Balance: $${tooltipItems.yLabel}`;
      }
      }
    }
  };

  /** Initilize the colour of the line chart. */
  private lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  /** set the legend of the line chart to true; */
  private lineChartLegend = true;

  /** Chart type set to line chart. */
  private lineChartType = 'line';

  /** Plugin initilized to empty array. */
  private lineChartPlugins = [];

  /** This is the subscription variable to store the subscriber. */
  private subscriptions: Subscription;

  /** This is the projection data that needs to be projected on the line chart. */
  private projectionData: CBPProjectionModel[];

  /**
   * This is the constructor function of this class.
   * @param dataService This is the data service for sharting the data bewteen sibling components.
   */
  constructor(private dataService: CBPDataSharingService) {}

  /**
   * This function is called when the component is initilized on the screen.
   */
  ngOnInit() {
    this.chartLabel = 'Capital Balance Projection';
    this.lineChartData = [{data: [], label: this.chartLabel}];
    this.lineChartLabels = [];
    this.subscriptions = this.dataService.sharedData.subscribe((value) => {
      this.projectionData = value;
      this.xAxisData = [];
      this.yAxisData = [];
      this.projectionData.forEach(element => {
        this.xAxisData.push(element.startingBalance);
        this.yAxisData.push(element.year.toString());
      });
      this.lineChartData = [{data: this.xAxisData, label: this.chartLabel}];
      this.lineChartLabels = this.yAxisData;
    });
  }

  /**
   * This function is called automatically when the components is destroyed form the screen.
   */
  ngOnDestroy() {
    /** To prevent from memory leak we have to unsubscribe any thing we subscribe in the component. */
    this.subscriptions.unsubscribe();
  }

}
