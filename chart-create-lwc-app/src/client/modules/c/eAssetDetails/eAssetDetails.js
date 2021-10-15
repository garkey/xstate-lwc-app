import { LightningElement } from 'lwc';

export default class EAssetDetails extends LightningElement {

  loading = false;

  asset_identification = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };
  asset_configuration = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };
  asset_coverage = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };
  asset_service = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };
  asset_lifecycle = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };
  asset_order = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };
  asset_invetory = {
    form: [
      { key: 0,label: 'fee', data: 'fi' },
      { key: 1,label: 'fee', data: 'fi' },
      { key: 2,label: 'fee', data: 'fi' },
    ]
  };

  produc_details = {
    model_no: 'model_no',
    title: 'title',
    description: 'description',
    image: 'image',
    keysight_care_url: 'keysight_care_url',
  }

  details_label= {
    DCX_Asset_Search_All_Asset_Details: 'DCX_Asset_Search_All_Asset_Details',
    DCX_AssetGrid_Sections: 'DCX_AssetGrid_Sections',
    DCX_Asset_Grid_Expand: 'DCX_Asset_Grid_Expand',
    DCX_Asset_Grid_Expand: 'DCX_Asset_Grid_Expand',
    DCX_Asset_Grid_Restore: 'DCX_Asset_Grid_Restore',
    DCX_Asset_Grid_Restore: 'DCX_Asset_Grid_Restore',
    DCX_AssetGrid_Learn_More: 'DCX_AssetGrid_Learn_More',
    DCX_AssetGrid_AddAsset_navigationItem_Identification: 'DCX_AssetGrid_AddAsset_navigationItem_Identification',
    DCX_AssetGrid_AddAsset_navigationItem_Configuration: 'DCX_AssetGrid_AddAsset_navigationItem_Configuration',
    DCX_AssetGrid_AddAsset_Field_Installed_Options: 'DCX_AssetGrid_AddAsset_Field_Installed_Options',
    DCX_Asset_Latest_Firmware_Software: 'DCX_Asset_Latest_Firmware_Software',
    DCX_AssetGrid_Column_Installed_Licenses: 'DCX_AssetGrid_Column_Installed_Licenses',
    DCX_Asset_Coverage: 'DCX_Asset_Coverage',
    dcx_Agreements: 'dcx_Agreements',
    DCX_Asset_Coverage: 'DCX_Asset_Coverage',
    DCX_AssetGrid_AddAsset_navigationItem_Service: 'DCX_AssetGrid_AddAsset_navigationItem_Service',
    DCX_AssetGrid_Open_Service_Orders: 'DCX_AssetGrid_Open_Service_Orders',
    DCX_SupportGrid_History: 'DCX_SupportGrid_History',
    DCX_AssetGrid_AddAsset_navigationItem_Service_History: 'DCX_AssetGrid_AddAsset_navigationItem_Service_History',
    DCX_ProductLifeCycle_ServiceNotes: 'DCX_ProductLifeCycle_ServiceNotes',
    DCX_AssetGrid_Notes: 'DCX_AssetGrid_Notes',
    DCX_No_Applicable_Service_Notes_Found: 'DCX_No_Applicable_Service_Notes_Found',
    DCX_AssetGrid_AddAsset_navigationItem_Lifecycle: 'DCX_AssetGrid_AddAsset_navigationItem_Lifecycle',
    DCX_AssetGrid_AddAsset_navigationItem_Ordering: 'DCX_AssetGrid_AddAsset_navigationItem_Ordering',
    DCX_AssetGrid_AddAsset_navigationItem_Inventory: 'DCX_AssetGrid_AddAsset_navigationItem_Inventory',
    DCX_Asset_Grid_Audit: 'DCX_Asset_Grid_Audit',
    DCX_Asset_Grid_Audit: 'DCX_Asset_Grid_Audit',
  }
}
