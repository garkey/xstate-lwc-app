import LightningDatatable from 'lightning/datatable';
import editButtonTemplate from './editButtonTemplate.html';
import downloadCellTemplate from "./downloadCellTemplate.html";

export default class DcxDataTable extends LightningDatatable {
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
}
