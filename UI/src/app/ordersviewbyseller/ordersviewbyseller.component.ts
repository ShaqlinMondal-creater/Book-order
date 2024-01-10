import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions} from 'ngx-export-as';
import { Subject } from 'rxjs';
import { Orderdetails } from '../models/orderdetails';
import { OrderregserviceService } from '../services/orderregservice.service';
@Component({
  selector: 'app-ordersviewbyseller',
  templateUrl: './ordersviewbyseller.component.html',
  styleUrls: ['./ordersviewbyseller.component.css']
})
export class OrdersviewbysellerComponent implements OnInit {
  downloadAs: SupportedExtensions = 'png';
  allorder:Orderdetails[]=[]
  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'viewallorder', // the id of html/table element
  };
  constructor( public exportAsService: ExportAsService,public orderservice:OrderregserviceService) { }
  dtOptions:DataTables.Settings={}
  dtTrigger:Subject<any>=new Subject<any>()
  sellerid!:string
  ngOnInit(): void {
    this.dtOptions={
      pagingType:'numbers',
      lengthChange:false,
      ordering:false
    }
    let sellerdata=JSON.parse(sessionStorage['sellerdetails'])
    this.sellerid=sellerdata.sellerId
    this.viewOrders();
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

  viewOrders(){
    console.log(this.sellerid)
    this.orderservice.vieworderbyseller(this.sellerid)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.length>0){
        console.log(res)
        this.allorder=res;
        
      }
      else{
        this.dtTrigger.next(null);
      }
      
    })
  }

}
