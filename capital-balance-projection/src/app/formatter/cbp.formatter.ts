/**
 * @description This is a formatter helper class that have different functions for fomatting.
 * @created 03 sep 2020
 * @author Nirakar Puri
 */
export class CBPFormatter {

  /**
   * This is a constructor of this class.
   * This function will initilize all the properties of this class to zero.
   */
  constructor() {}

  /** This is the currency formatter. */
  public currencyFormatter(params) {
    return 'A\x24' + this.formatNumber(params.value);
  }

  /**
   * This will format the number.
   * @param number to be formatted.
   */
  public formatNumber(value: number) {
    return Math.floor(value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

}
