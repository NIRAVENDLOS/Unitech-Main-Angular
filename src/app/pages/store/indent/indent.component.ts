import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { VenderService } from '../../../@service/purchase/vender/vender.service';
import { IndentService } from '../../../@service/store/indent.service';
import { ItemService } from '../../../@service/store/item.service';
import { ResponceService } from '../../../@service/store/responce.service';

@Component({
  selector: 'ngx-indent',
  templateUrl: './indent.component.html',
  styleUrls: ['./indent.component.scss']
})
export class IndentComponent implements OnInit {

  admin: boolean = false;
  maintanance: boolean = false;
  store: boolean = false;
  gm: boolean = false;
  account: boolean = false;

  NbDialogRef: any;
  NbDialogRef1: any;
  NbDialogRef2: any;
  NbDialogRef3: any;

  IndentForm: FormGroup;
  IndentOpenForm: FormGroup;
  IndentOpenSatatus: FormGroup;
  ResponceForm: FormGroup;

  statuschange: any;
  item: any;
  DataTransferVender = [];
  vendorDate: [];
  vendorDetails: any;
  tax: any;
  total: any;
  basicAmmount: number;

  ResponceSource: any = [];
  IndentSource: any = [];
  VPIndentSource: any = [];
  ADMINIndentSource: any = [];
  ACCOUNTIndentSource: any = [];
  REJECTIndentSource: any = [];
  DONEIndentSource: any = [];

  VPsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ADMINsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  VPONLYsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ADMINONLYsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ACCOUNTsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  ACCOUNTONLYsettings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  REJECTsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  DONEsettings = {
    actions: false,
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'Button',
          type: 'html',
          title: '<i class="nb-list" title="View"></i>',
        }],
      position: 'right'
    },
    columns: {
      indentId: {
        title: 'ID',
        type: 'number',
      },
      storeItem: {
        title: 'Item Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.itemName
        },
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
      },
      estimatedPrice: {
        title: 'Estimated Price',
        type: 'number',
      },
      paytax: {
        title: 'Tax %',
        type: 'number',
        valuePrepareFunction: (cell, row) => {
          return row.storeItem.paytax
        },
      },
      total: {
        title: 'Basic Ammount',
        type: 'number',
      },
      includingTax: {
        title: 'Total Ammount',
        type: 'number',
      },
      created: {
        title: 'Indent Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      indentStatus: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };
  Responcesettings = {
    actions: false,
    columns: {
      rid: {
        title: 'ID',
        type: 'number',
      },
      employe: {
        title: 'Employee Name',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.employe.username
        },
      },
      coments: {
        title: 'Comments',
        type: 'string',
      },
      remarks: {
        title: 'Remarks',
        type: 'string',
      },
      created: {
        title: 'Indent Responce Date',
        type: 'date',
        valuePrepareFunction: (cell, row) => {
          return new Date(cell).toLocaleString('en-IN');
        },
      },
      issueStatus: {
        title: 'Indent Status',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<span class="cell_right1">' + cell + '</span>';
        },
      }
    },
  };

  constructor(
    private dialogService: NbDialogService,
    private _auth: LoginService,
    private fb: FormBuilder,
    private post: IndentService,
    private postItem: ItemService,
    private postResponce: ResponceService,
    private toastrService: NbToastrService,
    private venderService: VenderService,
  ) { }

  ngOnInit(): void {
    let role = this._auth.user.roles.find((x => x));
    let role_id = this._auth.user.userId;
    if (role == 'ROLE_ADMIN') {
      this.admin = true;
    } else if (role == 'ROLE_MAINTENANCE') {
      this.maintanance = true;
    } else if (role == 'ROLE_STORE') {
      this.store = true;
    } else if (role == 'ROLE_GENERALMANAGER') {
      this.gm = true;
    } else if (role == 'ROLE_ACCOUNT') {
      this.account = true;
    }

    this.IndentForm = this.fb.group({
      storeItem: this.fb.group({
        itemId: [null, Validators.required]
      }),
      employee: this.fb.group({
        id: [role_id, Validators.required]
      }),
      issueItem: this.fb.group({
        issueId: [null]
      }),
      quantity: [null, Validators.required],
      estimatedPrice: [null, Validators.required],
      venderAdd: [null]
    })

    this.ResponceForm = this.fb.group({
      resStatus: ['INDENT'],
      pdiId: [null],
      issueStatus: [null],
      coments: [null, Validators.required],
      remarks: [null],
      indentRaised: [true], 
      poRaised: [false],
      doRaised: [false],
      employe: this.fb.group({
        id: [role_id]
      })
    })

    this.IndentOpenForm = this.fb.group({
      quantity: [null, Validators.required],
      coments: [null, Validators.required],
      remarks: [null],
      indentId: [null, Validators.required],
    })
    this.IndentOpenSatatus = this.fb.group({
      indentStatus: [null, Validators.required],
      // vendorDetails: this.fb.group({
      //   id: [null]
      // }),
    });

    if(this.admin) {
      this.IndentOpenForm.addControl("vendorSelect",this.fb.control([null, Validators.required]));
    }

    this.postItem.ViewItem().subscribe(data => {
      this.item = data.Data;
    });
    this.post.ViewIndent().subscribe(data => {
      this.IndentSource = data.Data;
    });
    this.post.ViewIndentStatus('GM').subscribe(data => {
      this.VPIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('ADMIN').subscribe(data => {
      this.ADMINIndentSource = data.Data;
      console.warn(this.ADMINIndentSource);
    });
    this.post.ViewIndentStatus('ACCOUNT').subscribe(data => {
      this.ACCOUNTIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('REJECT').subscribe(data => {
      this.REJECTIndentSource = data.Data;
    });
    this.post.ViewIndentStatus('DONE').subscribe(data => {
      this.DONEIndentSource = data.Data;
    });
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 9 && event.which != 8 && event.which != 190 && event.which != 46 && event.which != 37 && event.which != 39)) {
      event.preventDefault();
    }
  }

  createIndent(dialog: TemplateRef<any>) {
    this.NbDialogRef = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  ItemPriceTotal(event) {
    this.IndentForm.get('estimatedPrice').setValue(null);
    this.IndentForm.get('quantity').setValue(null);
    this.tax = null;
    this.total = null;
    this.postItem.FindByIdItem(event).subscribe((data: any) => {
      this.tax = data.Data.paytax;
      this.vendorDate = data.Data.vendorDate;
    })
  }

  changeVender(event) {
    console.warn(event);
    this.DataTransferVender.length = 0;
    for (let i = 0; i < event.length; i++) {
      this.DataTransferVender.push({ 'id': event[i] });
    }
  }

  taxToatal(event) {
    let price = event.target.value;
    let quantity = this.IndentForm.value.quantity;
    if (this.tax != null && price != null && quantity != null) {
      this.basicAmmount = quantity * price;
      this.total = (quantity * price * this.tax / 100) + quantity * price;
    }
  }
  taxToatalQantity(event) {
    let price = this.IndentForm.value.estimatedPrice;
    let quantity = event.target.value;
    if (this.tax != null && price != null && quantity != null) {
      this.basicAmmount = quantity * price;
      this.total = (quantity * price * this.tax / 100) + quantity * price;
    }
  }

  onIndentFormSubmit() {
    this.IndentForm.removeControl('venderAdd');
    this.IndentForm.addControl('dataVendorAndIndent', this.fb.control(this.DataTransferVender));
    console.warn(this.IndentForm.value);

    this.post.CreateIndent(this.IndentForm.value).subscribe((data: any) => {

      this.ResponceForm.get('coments').setValue("create indent");
      this.ResponceForm.get('remarks').setValue("create indent");
      this.ResponceForm.get('pdiId').setValue(data.Data.indentId);
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.allAlert('success', `Indent Created !`, 'Successfully Create Indent');
        this.NbDialogRef.close();
        this.ngOnInit();
      }, (error: any) => {
        this.ngOnInit();
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      })
    }, (error: any) => {
      this.ngOnInit();
      this.allAlert('danger', `Not Created !`, `${error.error.message}`);
    })
  }

  onChangeIndentStatus(event, dialog: TemplateRef<any>) {
    this.IndentOpenForm.reset();
    this.statuschange = event;
    this.IndentOpenForm.get('indentId').setValue(event.indentId);
    this.IndentOpenForm.get('quantity').setValue(event.quantity);
    this.NbDialogRef1 = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  onChangeIndentViewStatus(event, dialog: TemplateRef<any>) {
    this.postResponce.ViewByStatusResponce('INDENT', event.indentId).subscribe((data: any) => {
      this.ResponceSource = data.Data;
    })

    this.NbDialogRef2 = this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  ViewVendor(event, dialog: TemplateRef<any>) {
    this.venderService.ViewVenderById(event).subscribe((data: any) => {
      console.warn(data);
      this.vendorDetails = data.Data;
      this.NbDialogRef3 = this.dialogService.open(
        dialog,
        {
          closeOnBackdropClick: false,
        });
    })
  }

  indentOpen() {
    this.ResponceForm.get('coments').setValue(this.IndentOpenForm.value.coments);
    this.ResponceForm.get('remarks').setValue(this.IndentOpenForm.value.remarks);
    this.ResponceForm.get('pdiId').setValue(this.IndentOpenForm.value.indentId);

    this.IndentOpenSatatus.get('indentStatus').setValue(null);
    if (this.admin) {
      this.IndentOpenSatatus.get('indentStatus').setValue('ACCOUNT');
      this.IndentOpenSatatus.addControl('vendorData',this.fb.group({ id: [this.IndentOpenForm.value.vendorSelect]}));
      console.warn(this.IndentOpenSatatus.value);
      this.ResponceForm.get('issueStatus').setValue("ADMIN");
    }
    else if (this.gm) {
      this.IndentOpenSatatus.get('indentStatus').setValue('ADMIN');
      this.ResponceForm.get('issueStatus').setValue("GM");
    }
    else if (this.account) {
      this.IndentOpenSatatus.get('indentStatus').setValue('DONE');
      this.ResponceForm.get('issueStatus').setValue("ACCOUNT");
    }

    this.post.StatusUpdateIndent(this.IndentOpenForm.value.indentId, this.IndentOpenSatatus.value).subscribe((data: any) => {
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.allAlert('success', `Indent Approved !`, 'Successfully Indent Approved');
        this.NbDialogRef1.close();
        this.ngOnInit();
      }, (error: any) => {
        this.ngOnInit();
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      })
    }, (error: any) => {
      this.ngOnInit();
      this.allAlert('danger', `Not Created !`, `${error.error.message}`);
    });
  }

  indentReject() {
    this.ResponceForm.get('coments').setValue(this.IndentOpenForm.value.coments);
    this.ResponceForm.get('remarks').setValue(this.IndentOpenForm.value.remarks);
    this.ResponceForm.get('pdiId').setValue(this.IndentOpenForm.value.indentId);

    let Opendata = null;
    if (this.admin) {
      Opendata = {
        'indentStatus': 'REJECT'
      }
      this.ResponceForm.get('issueStatus').setValue("ADMIN");
    }
    else if (this.gm) {
      Opendata = {
        'indentStatus': 'REJECT'
      }
      this.ResponceForm.get('issueStatus').setValue("GM");
    }

    this.post.StatusUpdateIndent(this.IndentOpenForm.value.indentId, Opendata).subscribe((data: any) => {
      this.postResponce.CreateResponce(this.ResponceForm.value).subscribe((data: any) => {
        this.allAlert('success', `Indent Rejected !`, 'Successfully Indent Rejected');
        this.NbDialogRef1.close();
        this.ngOnInit();
      }, (error: any) => {
        this.allAlert('danger', `Not Created !`, `${error.error.message}`);
      })
    }, (error: any) => {
      this.allAlert('danger', `Not Created !`, `${error.error.message}`);
    });
  }

  allAlert(alertMsg, headMsg, msg) {
    const config = {
      status: alertMsg,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: false,
    };
    this.toastrService.show(
      `${msg}`,
      `${headMsg}`,
      config);
  }
}

