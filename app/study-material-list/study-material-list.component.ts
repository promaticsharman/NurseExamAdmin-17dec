import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'sanitizeHtml'
})
@Component({
  selector: 'app-study-material-list',
  templateUrl: './study-material-list.component.html',
  styleUrls: ['./study-material-list.component.css']
})
export class StudyMaterialListComponent implements OnInit {
  checked = false;
	indeterminate = false;
	labelPosition: 'before' | 'after' = 'after';
	disabled = false;
	tableData
	backUpTableData
	showLoader
	reqData
	getData
	datamodel
	length
	timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	filterValue
	responseData = []
  displayedColumns : string[] = ['position', 'content', 'type', 'Action']
  dataSource:any
  element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	topic_id
	topicName
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private _sanitizer:DomSanitizer,private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService) { }

  
  
  ngOnInit(): void {
		this.topic_id = this.route.snapshot.params.topic_id
	  	this.topicName = this.route.snapshot.params.topic_name
    	this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
    this.datamodel = {}
    this.getAllStudyMaterial(this.reqData.limit, this.reqData.offset)
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }

  ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}

  getAllStudyMaterial(limit, offset){
    this.service.getStudyMaterialByTopicID(limit, offset, this.topic_id).subscribe(data => {
			console.log(data);
			if(data){
				this.length = data.count;
				this.dataSource = new MatTableDataSource(data.data);
				this.dataSource.paginator = this.paginator;
				console.log(this.dataSource);
			}
		},err => {
			console.log(err);
        	if(err.status >= 400){
          		console.log('Invalid Credential!!!');
        	}else{
          		console.log('Internet Connection Error');
        	}
		})
  }

  deleteStudyMaterial(id){
		Swal.fire({
		  title: 'Are you sure want to remove?',
		  text: 'You will not be able to recover this Study Material!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
			this.service.deleteStudyMaterial(id).subscribe(data => {
				console.log(data);
				Swal.fire(
					'Deleted!',
					'This Study Material has been deleted.',
					'success'
				)
				this.ngOnInit();
      });
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'This Study Material is safe :)',
			  'error'
			)
		  }
		})
    }
    
    getPageSizeOptions() {
      return [5,10, 20, 30];
    }
  
    paginationOptionChange(evt) {
      console.log(evt)
      this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
      this.reqData.limit = evt.pageSize
      console.log(this.reqData)
      this.service.getFaqAllList(this.reqData.limit, this.reqData.offset).subscribe(data => {
        console.log(data)
        if (data) {
          this.responseData = data.data
          this.length = data.count
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.sort = this.sort;
          console.log(this.dataSource)
          if (this.filterValue) {
            this.dataSource.filter = this.filterValue
          }
        }
      }, err => {
        console.log(err)
        if (err.status >= 400) {
          // this.toastr.error('Internal Error', 'Error')
        } else {
          // this.toastr.error('Internet Connection Error', 'Error')
          console.log('Internet Connection Error')
        }
      })
      }

}
