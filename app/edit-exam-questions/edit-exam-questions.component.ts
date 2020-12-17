import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import { MatRadioChange } from "@angular/material/radio";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exam-questions',
  templateUrl: './edit-exam-questions.component.html',
  styleUrls: ['./edit-exam-questions.component.css']
})
export class EditExamQuestionsComponent implements OnInit {
  @ViewChild('mySelect') mySelect: MatSelect;
  @ViewChild('selectExam') selectExam: MatSelect;
  selected:any
  selectedExam:any
  remQue: boolean = false;
  examList: any = [];
  examQuestion
  answerDescription
  single_correct
  multiCorrect = []
  yesNO
  approSteps = []
  dropdownOptions=[0]
  addOptions=[]
  yNTopic
  question_type = 'Paid';
  yesNoArray = [
    {
      answer : "",
      correct_answer: false,
      _id: null,
      topic_id : null,
      answer_type:""
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
  topic_id 
  approriateSteps=[0]
  fillUps=[0]
  fill=[]

  constructor(private service: AdminService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getExamList();

    console.log("Question ID : ", this.route.snapshot.params.que_id)
    console.log("Topic ID : ", this.route.snapshot.params.topic_id)
    this.yNTopic = this.route.snapshot.params.topic_id
    this.service.getQuestionsByID(this.route.snapshot.params.que_id).subscribe(data => {
      console.log("Get Questions Data: ",data)
      //this.selectedExam = data.data.exam_id
      this.topic_id = data.data.topic_id
      this.examQuestion = data.data.question
      this.question_type = data.data.question_type
      this.mySelect.value = data.data.answer_type
      this.selected = data.data.answer_type
      this.Answer = data.data.answer
      this.approriateSteps = data.data.answer[0].appropriate_steps
      this.fillUps = data.data.answer[0].fill_ups
      this.dropdownOptions = data.data.answer[0].fillups_options
      this.answerDescription = data.data.answer_description
      this.approSteps = this.approriateSteps
      this.fill = this.fillUps
      this.addOptions = this.dropdownOptions
      console.log("Array of Appropriate : ", this.approSteps)
      console.log("Array of Fill Ups : ", this.fillUps)
      console.log("This Answer: ",this.Answer);
    })
  }

  onChangeExam(){
    //alert(this.selectExam.value)
    this.selectedExam = this.selectExam.value;
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

  yes_no(MatRadioChange, id){
    console.log(MatRadioChange.value)
    if(MatRadioChange.value == 'true'){
      this.yesNoArray.forEach((element) => {
          element.answer = 'Yes'
          element.correct_answer = MatRadioChange.value
          element._id = id
          element.topic_id = this.route.snapshot.params.topic_id
          element.answer_type = this.selected
      })
    }else if(MatRadioChange.value == 'false'){
      this.yesNoArray.forEach((element) => {
        element.answer = 'No'
        element.correct_answer = MatRadioChange.value
        element._id = id
        element.topic_id = this.route.snapshot.params.topic_id,
        element.answer_type = this.selected
    })
    }
    console.log("Yes No Array: ",this.yesNoArray);
    
  }

  getExamList() {
    this.service.examList().subscribe(data => {
      console.log(data);
      this.examList = data.data
      console.log("Data Array : ", this.examList);
    })
  }

  trackByFn(){
    return
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
    // console.log("Exam ID : ",this.selectedExam)
    // console.log("Exam ID : ",this.selected)
    // console.log("Exam Question: ",this.examQuestion);
    // console.log("Exam Answers 1 : ", this.Answer);
    // console.log("Yes No Answers : ", this.yesNoArray)
    // console.log("Answer Description : ",this.answerDescription)
      console.log(this.approSteps)
      console.log(this.addOptions);

      var formData = new FormData();
      formData.append('que_id', this.route.snapshot.params.que_id)
      formData.append('topic_id', this.route.snapshot.params.topic_id);
      formData.append('question', this.examQuestion);
      formData.append('answer_description', this.answerDescription);
      formData.append('answer_type', this.selected)
      formData.append('question_type', this.question_type)
      if(this.selected == 'Single' || this.selected == 'Multiple'){
        formData.append('answerArray', JSON.stringify(this.Answer))
      }else if(this.selected == 'Yes_No'){
        formData.append('answerArray', JSON.stringify(this.yesNoArray))
      }else if(this.selected == 'DragDrop'){
        formData.append('appropriate_steps', JSON.stringify(this.approSteps))
      }else if(this.selected == 'FillUp'){
        formData.append('fill_ups', JSON.stringify(this.fill))
        formData.append('fillups_options', JSON.stringify(this.addOptions))
      }

      this.service.updateQuestionAnswerOfTopic(formData).subscribe(data => {
        console.log("Add Questions Data : ", data);
        Swal.fire('Success..!', 'Successfully Updated!', 'success')
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
