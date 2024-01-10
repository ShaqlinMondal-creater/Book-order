import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExportAsService, ExportAsConfig, SupportedExtensions} from 'ngx-export-as';
import { Bookdetails } from '../models/bookdetails';
import { BookregService } from '../services/bookreg.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-viewallbooks',
  templateUrl: './viewallbooks.component.html',
  styleUrls: ['./viewallbooks.component.css']
})
export class ViewallbooksComponent implements OnInit {
  downloadAs: SupportedExtensions = 'png';

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx', // the type you want to download
    elementIdOrContent: 'viewallbook', // the id of html/table element
  };

  constructor( public exportAsService: ExportAsService,public bookservice:BookregService,public router:Router,) { }
  
  allbooks:Bookdetails[]=[];
  dtOptions:DataTables.Settings={}
  dtTrigger:Subject<any>=new Subject<any>()
  ngOnInit(): void {
    this.dtOptions={
      pagingType:'numbers',
      lengthChange:false,
      ordering:false
    }
  this.viewAllBooks();

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

  viewAllBooks(){
    this.bookservice.viewBooks()
    .subscribe((res:any)=>{
      if(res.length>0){
        this.allbooks=res;
        this.dtTrigger.next(null)
      }
      else{
        console.log("No record Found");
      }
    })
  }

  onDelete(deleteobj:any){
    this.bookservice.removeBook(deleteobj)
    .subscribe((res:any)=>{
      console.log(res);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    })
    })
  }


}

