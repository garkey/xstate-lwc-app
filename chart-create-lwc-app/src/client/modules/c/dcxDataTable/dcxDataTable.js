import LightningDatatable from 'lightning/datatable';
import editButtonTemplate from './editButtonTemplate.html';

export default class DcxDataTable extends LightningDatatable {
    static customTypes = {
        editinform: {
            template: editButtonTemplate,
            // editTemplate:
            standardCellLayout: false,
            typeAttributes: ['rowid'],
        },
    };
}
