import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { CBPDataSharingService } from 'src/app/services/cbp.data.sharing.service';
import { CBPValidators } from 'src/app/validators/cbp.validators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cbp-input-form',
  templateUrl: './cbp.input-form.component.html',
  styleUrls: ['./cbp.input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  /** Validation for the form. */
  public inputForm: FormGroup;

  /** This is the output event that will be emitted when the form is valid and we need to show the grid and table. */
  @Output() validFormSubmitEvent = new EventEmitter<boolean>();

  /** This variable input will hold the data from parent to know if the chart is hidden or not. */
  @Input() isChartGridHidden: boolean;

  /**
   * This is the constructor function of this class.
   * @param dataService This is the data service for sharting the data bewteen sibling components.
   */
  constructor(private dataSharingService: CBPDataSharingService) {}

  /**
   * This function is called when the component is initilized on the screen.
   */
  ngOnInit() {
    const cbpValidators = new CBPValidators();
    /** initilize chart grid hidden to false */
    this.isChartGridHidden = true;

    /** form creation and valdation rules creation. */
    this.inputForm = new FormGroup({
      /** salary is required and should be number. */
      salary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
      ]),
      /** contributaion rate is required and should be numebr. */
      contributionRate: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
        Validators.max(100),
      ]),
      /** Inflation rate is required and should be numebr. */
      inflationRate: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
        Validators.max(100),
      ]),
      /** earning rate is required and should be numebr. */
      earningsRate: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
        Validators.max(100),
      ]),
      /** fee rate is required and should be numebr. */
      feeRate: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
        Validators.max(100),
      ]),
      /** tax rate is required and should be numebr. */
      taxRate: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      /** withdraw rate is required and should be numebr. */
      withdrawalRate: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      /** withdrawal rate is required and should be numebr. */
      withdrawalAge: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
      ]),
      /** starting  balance is required and should be numebr. */
      startingBalance: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+(.[0-9]{0,2})?$'),
        Validators.min(0),
      ]),
      /** projection period is required and should be numebr. */
      projectionPeriod: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      /** starting Age is required and should be numebr. */
      startingAge: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      /** starting Year is required and should be numebr. */
      startingYear: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
    }, { validators : cbpValidators.withdrawalAgeValidator('withdrawalAge', 'startingAge')}
    );

    /** initilizing the initial value in the form. */
    this.inputForm.patchValue({
      startingBalance: 300000,
      startingAge: 45,
      startingYear: new Date().getFullYear(),
      projectionPeriod: 50,
      salary: 100000,
      inflationRate: 3,
      contributionRate: 9.50,
      earningsRate: 7.50,
      feeRate: 1.5,
      taxRate: 15,
      withdrawalRate: 5,
      withdrawalAge: 66,
    });
  }

  /**
   * This function is called when user clicks on the clear button.
   * This function will clear all the values in the input filelds.
   */
  public onClear() {
    /** This will clear the form. */
    this.inputForm.reset();
    this.inputForm.patchValue({
      startingYear : new Date().getFullYear(),
    });
  }

  /**
   * This function is called when the form is submitted.
   * This function gets the form input from the user.
   * This function then calculates the projection with the given data and calls the subject to emit event.
   */
  public onSubmit() {
    /** check for validation before submission. */
    if (this.inputForm.invalid) {
      this.isChartGridHidden = true;
      this.validFormSubmitEvent.emit(false);
      return; /** return if not valid. */
    }

    /** calling calculate projection to get the projection data. */
    const projectionData = this.dataSharingService.calculateProjection(this.inputForm.value);
    /** Broadcast the projection data so other components can consume it. */
    this.dataSharingService.boradcastData(projectionData);

    /** show the chart and table after the data is successfully shared with components. */
    /** only emit to true if it is hidden. */
    if (this.isChartGridHidden) {
      this.validFormSubmitEvent.emit(true);
    }
  }

  /**
   * This will call the submit form each time the input is changed to display the latest data.
   * @param $event Changed value in the form.
   */
  public onInputChangeEvent($event): void {
    this.onSubmit(); /** This will submit the form. */
  }
}
