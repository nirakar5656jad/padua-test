/**
 * @author Nirakar Puri
 * @created 05 sep 2020
 * @description This is a data sharing service class.
 * This class will create and observebale and other class using this observable will be able to subscribe.
 * Those component which subscribe to this observable will get the latest value from any class that emits the event.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CBPProjectionModel } from '../Models/cbp.projection.model';

@Injectable()
export class CBPDataSharingService {

  /** This is the subject behaviour that will keep the latest value of the data emitted by any component. */
  private $subject = new BehaviorSubject<CBPProjectionModel[]>([]);

  /** This is an observable that is created for other components to subscribe on to watch the latest value. */
  public sharedData = this.$subject.asObservable();

  /**
   * This is the constructor function.
   * This function can be used to initilize http instances if we need to call web services.
   */
  constructor() { }

  /**
   * This function is responsible for calling the next event of the subject behaviour.
   * @param data This is the data this will be sent to all the subscriber of the obserbavle.
   */
  public boradcastData(data: CBPProjectionModel[]) {
    this.$subject.next(data);
  }

  /**
   * This function is responsible for calculating the projection with the give input parameters.
   * @param inputParameters This is the value of all the inputs submitted on the form.
   * @returns projectionData This is the projection data for the given period of time.
   */
  public calculateProjection(inputParameters: any): CBPProjectionModel[] {
    const projectionDataArray: CBPProjectionModel[] = [];
    let year = 0;
    let startingBalance = 0;
    let contributionValue = 0;
    let earningsValue = 0;
    let feeValue = 0;
    let taxValue = 0;
    let withDrawlValue = 0;
    let endBalance = 0;
    let yearAgeFormat = '';
    let i = 0;
    for (let age = inputParameters.startingAge;
      age <= (inputParameters.startingAge + inputParameters.projectionPeriod);
      age++, i++) {
        year = inputParameters.startingYear + i;
        if (age === inputParameters.startingAge) {
          startingBalance = inputParameters.startingBalance;
        } else {
          startingBalance = endBalance;
        }
        if (age >= inputParameters.withdrawalAge) {
          withDrawlValue =  Math.round(startingBalance * inputParameters.withdrawalRate / 100);
          contributionValue = 0;
        } else {
          withDrawlValue = 0;
          if (age === inputParameters.startingAge) {
            contributionValue = Math.round(inputParameters.salary * inputParameters.contributionRate / 100);
          } else {
            contributionValue = Math.round(contributionValue * (1 + inputParameters.inflationRate / 100));
          }
        }
        earningsValue = Math.round((startingBalance + contributionValue ) * inputParameters.earningsRate / 100);
        feeValue = Math.round((startingBalance + earningsValue + contributionValue) * inputParameters.feeRate / 100);
        taxValue = Math.round((contributionValue + earningsValue) * inputParameters.taxRate / 100);
        endBalance = Math.round(startingBalance + contributionValue + earningsValue - feeValue - taxValue - withDrawlValue);
        const projectionData: CBPProjectionModel = {
          age,
          year,
          startingBalance,
          contributionValue,
          earningsValue,
          feeValue,
          taxValue,
          withDrawlValue,
          endBalance,
        };
        projectionDataArray.push(projectionData);
    }
    return projectionDataArray;
  }
}
