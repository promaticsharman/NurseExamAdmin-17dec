import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Pipe({
	name: 'sanitizeHtml'
})

@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

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
	displayedColumns: string[] = ['position', 'question', 'question_type','answer_type', 'answers', 'correctanswers', 'Action']
	dataSource: any
	element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	topicName
	top_id

	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private _sanitizer: DomSanitizer, private route: ActivatedRoute, private service: AdminService) { }

	ngOnInit(): void {
		this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
		//console.log(this.route.snapshot.params.topic_id);
		this.topicName = this.route.snapshot.params.topic_name
		this.top_id = this.route.snapshot.params.topic_id
		console.log("Topic ID: ", this.top_id);

		this.getQuestion()

	}

	transform(v: string): SafeHtml {
		return this._sanitizer.bypassSecurityTrustHtml(v);
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}

	getQuestion() {
		this.service.getQuestionsByTopicID(this.reqData.limit, this.reqData.offset, this.top_id).subscribe(data => {
			console.log("Topic Questions : ", data);
			if (data) {
				this.length = data.count;
				this.dataSource = new MatTableDataSource(data.data);
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator;

				console.log(this.dataSource);
			}
		}, err => {
			console.log(err);
			if (err.status >= 400) {
				console.log('Invalid Credential!!!');
			} else {
				console.log('Internet Connection Error');
			}
		});
	}

	getPageSizeOptions() {
		return [5, 10, 20, 30];
	}

	paginationOptionChange(evt) {
		console.log(evt)
		this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
		this.reqData.limit = evt.pageSize
		console.log(this.reqData)
		this.service.getQuestionsByTopicID(this.reqData.limit, this.reqData.offset, this.top_id).subscribe(data => {
			console.log(data)
			if (data) {
				this.responseData = data.data
				this.length = data.count
				this.dataSource = new MatTableDataSource(data.data);
				this.dataSource.sort = this.sort;
			//	this.dataSource.paginator = this.paginator;

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

	deleteQuestion(id) {
		Swal.fire({
			title: 'Are you sure want to remove?',
			text: 'You will not be able to recover this Question!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				this.service.deleteQuestionAnswerOfTopic(id).subscribe(data => {
					console.log(data);
					Swal.fire(
						'Deleted!',
						'This Question has been deleted.',
						'success'
					)
					this.ngOnInit();
				});
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'This Question is safe :)',
					'error'
				)
			}
		})
	}

}
