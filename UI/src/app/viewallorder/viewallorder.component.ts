import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions} from 'ngx-export-as';
import { Orderdetails } from '../models/orderdetails';
import { Subject } from 'rxjs';
import { OrderregserviceService } from '../services/orderregservice.service';
@Component({
  selector: 'app-viewallorder',
  templateUrl: './viewallorder.component.html',
  styleUrls: ['./viewallorder.component.css']
})
export class ViewallorderComponent implements OnInit {
  downloadAs: SupportedExtensions = 'png';
  allorder:Orderdetails[]=[]
  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'viewallorder', // the id of html/table element
  };
  constructor( public exportAsService: ExportAsService,public orderservice:OrderregserviceService) { }
  dtOptions:DataTables.Settings={}
  dtTrigger:Subject<any>=new Subject<any>()
  ngOnInit(): void {
    this.dtOptions={
      pagingType:'numbers',
      lengthChange:false,
      ordering:false
    }
    this.viewallOrders();
  }
  export() {
    this.exportAsConfig.type = this.downloadAs;
    this.exportAsService
      .save(this.exportAsConfig, 'Exported_File_Name')
      .subscribe(() => {
      });
   
    this.exportAsService.get(this.exportAsConfig).subscribe((content) => {
      console.log(content);
    });
  }

  viewallOrders(){
    this.orderservice.viewallorder()
    .subscribe((res:any)=>{
      if(res.length>0){
        this.allorder=res;
        this.dtTrigger.next(null);
      }
      
    })
  }
}
