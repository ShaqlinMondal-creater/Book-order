import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportAsService, ExportAsConfig, SupportedExtensions} from 'ngx-export-as';
import { Subject } from 'rxjs';
import { Userdetails } from '../models/userdetails';
import { UserregserviceService } from '../services/userregservice.service';
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  downloadAs: SupportedExtensions = 'png';

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'usertable', // the id of html/table element
  };

  
  constructor( public exportAsService: ExportAsService,public userobj:Userdetails,public userservice:UserregserviceService,public router:Router) { }
  allUser:Userdetails[]=[]
  dtOptions:DataTables.Settings={}
  dtTrigger:Subject<any>=new Subject<any>()
  ngOnInit(): void {
    this.dtOptions={
      pagingType:'numbers',
      lengthChange:false,
      pageLength: 10,
   
    }
    this.viewuser();
  } 

  viewuser(){
    this.userservice.viewuser()
    .subscribe((res:any)=>{
      console.log(res)
      if(res.length>0){
        this.allUser=res;
        this.dtTrigger.next(null);
      }
    })
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
  onDelete(deleteobj:any){
    this.userservice.deleteuser(deleteobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    })
    })
  }

 
}
