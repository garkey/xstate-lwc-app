import LightningDatatable from 'lightning/datatable';
import editButtonTemplate from './editButtonTemplate.html';
import downloadCellTemplate from './downloadCellTemplate.html';
import datatable from './datatable.html';

export default class DcxDataTable extends LightningDatatable {
    connectedCallback() {
        super.connectedCallback();
        console.log('this.state', JSON.parse(JSON.stringify(this.state)));
    }
    static customTypes = {
        editinform: {
            template: editButtonTemplate,
            // editTemplate:
            standardCellLayout: false,
            typeAttributes: ['rowid'],
        },
        download: {
            template: downloadCellTemplate,
            standardCellLayout: false,
        },
    };

    render() {
      return datatable;
    }
}
