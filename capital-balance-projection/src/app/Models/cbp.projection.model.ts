/**
 * This is the model structure for the projection data.
 * @description This is a model class that defines the basic structure of projection.
 * @created 03 sep 2020
 * @author Nirakar Puri
 */
export class CBPProjectionModel {

  /** This is the age count of the projection. */
  public age: number;

  /** THis is the year count of the projection. */
  public year: number;

  /** This is a starting balance of the projection. */
  public startingBalance: number;

  /** This is a contribution value of the projection. */
  public contributionValue: number;

  /** This is a earnings Value of the projection. */
  public earningsValue: number;

  /** This is a fee Value of the projection. */
  public feeValue: number;

  /** This is a tax Value of the projection. */
  public taxValue: number;

  /** This is a withDrawl Value of the projection. */
  public withDrawlValue: number;

  /** This is the end balance of the projection in each year. */
  public endBalance: number;

  public yearAgeFormat?: string;

  /**
   * This is a constructor of this class.
   * This function will initilize all the properties of this class to zero.
   */
  constructor() {
    this.startingBalance = 0;
    this.contributionValue = 0;
    this.earningsValue = 0;
    this.feeValue = 0;
    this.taxValue = 0;
    this.withDrawlValue = 0;
    this.endBalance = 0;
    this.yearAgeFormat = '';
  }
}
