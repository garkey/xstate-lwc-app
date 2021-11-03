import { LightningElement, api } from 'lwc';

export default class DetailsTable extends LightningElement {
    @api tabledata;
    @api columns;
    hidecheckboxcolumn = true;
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
        const cloneData = [...this.tabledata];
        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.tabledata = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
}
