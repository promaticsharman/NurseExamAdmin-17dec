import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam-questions',
  templateUrl: './add-exam-questions.component.html',
  styleUrls: ['./add-exam-questions.component.css']
})
export class AddExamQuestionsComponent implements OnInit {
  @ViewChild('mySelect') mySelect: MatSelect;
  @ViewChild('selectExam') selectExam: MatSelect;
  selected:any
  topic_id:any
  remQue: boolean = false;
  examList: any = [];
  examQuestion
  answerDescription
  single_correct
  multiCorrect = []
  approriateSteps = [0]
  approSteps = []
  fillUps=[0]
  fill=[]
  dropdownOptions=[0]
  addOptions=[]
  question_type = 'Paid';
  // questionAnswer = {
  //   answerOne : {
  //     answer : "",
  //     correct_answer : false
  //   },
  //   answerTwo : {
  //     answer : "",
  //     correct_answer : false
  //   },
  //   answerThree : {
  //     answer : "",
  //     correct_answer : false
  //   },
  //   answerFour : {
  //     answer : "",
  //     correct_answer : false
  //   },
  //   answerFive : {
  //     answer : "",
  //     correct_answer : false
  //   }
  // }

  yesNoArray = [
    {
      answer : "",
      correct_answer: false
    }
  ]

  Answer = [
    {
      answer : "",
      correct_answer : false
    },
    {
      answer : "",
      correct_answer : false
    },
    {
      answer : "",
      correct_answer : false
    },
    {
      answer : "",
      correct_answer : false
    },
    {
      answer : "",
      correct_answer : false
    }
  ]

  constructor(private fb: FormBuilder,private service: AdminService, private route: ActivatedRoute, private router: Router) {}

  questionForm = new FormGroup({
    question : new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.getExamList();
  }

  onChange(){
    //alert(this.mySelect.value)
    this.selected = this.mySelect.value;
  }

  singleCorrect(event){
    console.log(event)
    var index_value = parseInt(event.value)
    // this.Answer[index].correct_answer = true
    this.Answer.forEach((element,index) => {
      if(index == index_value){
        element.correct_answer = true
      }else{
        element.correct_answer = false
      }
    });
    console.log(this.Answer)
  }

  yes_no(event){
    console.log(event.value)
    if(event.value == 'true'){
      this.yesNoArray.forEach((element) => {
          element.answer = 'Yes'
          element.correct_answer = event.value
      })
    }else{
      this.yesNoArray.forEach((element) => {
        element.answer = 'No'
        element.correct_answer = event.value
    })
    }
    console.log(this.yesNoArray);
    
  }

  getExamList() {
    this.service.examList().subscribe(data => {
      console.log(data);
      this.examList = data.data
      console.log("Data Array : ", this.examList);
    })
  }

  toggle(MatCheckboxChange, ind){
    if(MatCheckboxChange.checked ==  true){
      this.multiCorrect.push(ind)
      console.log(this.multiCorrect)
      this.Answer.forEach((element, index) => {
        if(index == ind){
          element.correct_answer = true
        }
      })
      console.log("Answer : ", this.Answer)
    }else{
      this.multiCorrect.pop()
      this.Answer.forEach((element, index) => {
        if(index == ind){
          element.correct_answer = false
        }
      })
      console.log(this.Answer);
    }
  }

  addAppropriateSteps(i){
    this.approriateSteps.push(i)
  }

  addFillUps(i){
    this.fillUps.push(i)
  }

  addDropdownOption(i){
    this.dropdownOptions.push(i)
  }

  questionType(MatCheckboxChange, ind){
    if(MatCheckboxChange.checked == true){
      console.log(ind)
      this.question_type = ind
    }else{
      console.log(MatCheckboxChange.source.value)
      this.question_type = MatCheckboxChange.source.value
    }
  }

 

  submitData() {
    //console.log("Exam ID : ",this.selectedExam)
    //console.log("Type : ",this.selected)
    //console.log("Exam Question: ",this.examQuestion);
    //console.log("Exam Answers 1 : ", this.Answer);
    //console.log("Yes No Answers : ", this.yesNoArray)
    //console.log("Answer Description : ",this.answerDescription)

      console.log(this.approSteps)
      console.log(this.fill)
      console.log(this.addOptions);
      
      this.topic_id = this.route.snapshot.params.topic_id
      var formData = new FormData();

      formData.append('topic_id', this.topic_id);
      formData.append('question', this.examQuestion);
      formData.append('answer_description', this.answerDescription);
      formData.append('answer_type', this.selected)
      formData.append('question_type', this.question_type)
      if(this.selected == 'Single'){
        formData.append('answerArray', JSON.stringify(this.Answer))
      }else if(this.selected == 'Multiple'){
        formData.append('answerArray', JSON.stringify(this.Answer))
      }else if(this.selected == 'Yes_No'){
        formData.append('answerArray', JSON.stringify(this.yesNoArray))
      }else if(this.selected == 'DragDrop'){
        formData.append('appropriate_steps', JSON.stringify(this.approSteps))
      }else if(this.selected == 'FillUp'){
        formData.append('fill_ups', JSON.stringify(this.fill))
        formData.append('fillups_options', JSON.stringify(this.addOptions))
      }

      this.service.addQuestion(formData).subscribe(data => {
        console.log("Add Questions Data : ", data);
        Swal.fire('Success..!', 'Successfully Created!', 'success')
        this.router.navigate(['questions-list/'+this.topic_id+'/'+this.route.snapshot.params.topic_name])
      }, err => {
        if(err.status >= 400){
          console.log('Invalid Credential!!!');
        }else{
          console.log('Internet Connection Error');
        }
      })
    }
  }
