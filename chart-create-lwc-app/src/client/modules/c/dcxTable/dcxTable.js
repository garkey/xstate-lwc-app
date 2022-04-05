import { LightningElement, api } from 'lwc';

export default class DcxTable extends LightningElement {
    @api tabledata;
    @api columns;
    @api hideCheckboxColumn = false;
    @api isLoading;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };
        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    doSorting(e) {
        const { fieldName: sortedBy, sortDirection } = e.detail;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;

        console.log('sortedBy', sortedBy);
        console.log('sortDirection', sortDirection);
        console.log('need to refetch sorted data');
    }
}
