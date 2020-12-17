import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as Rx from "rxjs/Rx";
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

const token = 'Bearer,' + localStorage.getItem('token')
const httpOptions: any = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  apiUrl = environment.endPoint
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {
    console.log(httpOptions);
    // console.log(JSON.parse(localStorage.getItem('token')));
    console.log(token);

  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage;
    let obj = {};
    if (error.error instanceof ErrorEvent) {
      obj = {
        message: error.error.message,
        status: error.status,
      }
      errorMessage = obj;
    } else {
      obj = {
        message: error.error.message,
        status: error.status,
      }
      errorMessage = obj;
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  ////Edit profile
  createTask(data): Observable<any> {
    let API_URL = `${this.apiUrl}/create-task`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getUserListing(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}getUserListing?page=` + offset + `&limit=` + limit;
    console.log(API_URL)
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  approveUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}approveUser`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteUser`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  filterUser(data): Observable<any> {
    let API_URL = `${this.apiUrl}filterUser`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addExam(data): Observable<any> {
    let API_URL = `${this.apiUrl}create_Exam_Details`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getExamList(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}get_all_exams?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getExam(id): Observable<any> {
    var obj = {
      id: id
    }
    let API_URL = `${this.apiUrl}getExam`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteExam(data): Observable<any> {
    let API_URL = `${this.apiUrl}delExam`;
    var obj = {
      id: data
    }
    console.log(API_URL)
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  editExam(data): Observable<any> {
    let API_URL = `${this.apiUrl}editExam`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  createFaq(data): Observable<any> {
    let API_URL = `${this.apiUrl}create_faq`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getFaqAllList(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}getFaqs?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getFaq(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getFaqById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  editFaqs(data): Observable<any> {
    let API_URL = `${this.apiUrl}editFaqs`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteFaq(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteFaq`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  createTestimonials(data): Observable<any> {
    let API_URL = `${this.apiUrl}addTestimonial`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addHomeBanner(data): Observable<any> {
    let API_URL = `${this.apiUrl}addHomeBanner`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }


  getAllTestimonials(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}getTestimonial?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getHomeBanners(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}getHomeBanners?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getTestimonialById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getTestimonialById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateTestimonials(data): Observable<any> {
    let API_URL = `${this.apiUrl}updateTestimonial`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteTestimonials(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteTestimonial`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteHomeBanner(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteHomeBanner`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getHomeBannerById(data): Observable<any> {
    let API_URL = `${this.apiUrl}getHomeBannerById`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  editBanner(data): Observable<any> {
    let API_URL = `${this.apiUrl}editHomeBanner`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }
  examList(): Observable<any> {
    let API_URL = `${this.apiUrl}getExamList`
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addExamQuestionAns(data): Observable<any> {
    let API_URL = `${this.apiUrl}addExamQuestionAns`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getExamQuestions(data): Observable<any> {
    var obj = {
      exam_id: data
    }
    let API_URL = `${this.apiUrl}getExamQuestions`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addBookCategory(data): Observable<any> {
    let API_URL = `${this.apiUrl}addBookCategory`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  editBookCategory(data): Observable<any> {
    let API_URL = `${this.apiUrl}editBookCategory`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteBookCategory(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteBookCategory`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getBookcategoryById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getBookcategoryById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getBookCategory(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}getBookCategory?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getAllBookCategory(): Observable<any> {
    let API_URL = `${this.apiUrl}getAllBookCategory`
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addBook(data): Observable<any> {
    let API_URL = `${this.apiUrl}addBook`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  editBook(data): Observable<any> {
    let API_URL = `${this.apiUrl}editBookCategory`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getBookByCategoryId(data): Observable<any> {
    var obj = {
      book_category_id: data
    }
    let API_URL = `${this.apiUrl}getBookByCategoryId`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getGeneralManagement(obj): Observable<any> {
    let API_URL = `${this.apiUrl}getGeneralManagement`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateGeneralManagement(obj): Observable<any> {
    let API_URL = `${this.apiUrl}updateGeneralManagement`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }


  delBook(data): Observable<any> {
    let API_URL = `${this.apiUrl}delBook`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getBookById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getBookById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateBook(data): Observable<any> {
    let API_URL = `${this.apiUrl}editBook`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addChapter(data): Observable<any> {
    let API_URL = `${this.apiUrl}addChapter`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  allChapter(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}allChapter?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getChapterByExamId(limit, offset, exam_id): Observable<any> {
    var obj = {
      exam_id: exam_id
    }
    let API_URL = `${this.apiUrl}getChapterByExamId?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getChapterById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getChapterById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateChapter(data): Observable<any> {
    let API_URL = `${this.apiUrl}updateChapter`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteChapter(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteChapter`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addTopics(data): Observable<any> {
    let API_URL = `${this.apiUrl}addTopics`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateAdminProfile (data): Observable<any> {
   let API_URL = `${this.apiUrl}admin/updateAdminProfile`;
    console.log(API_URL);
    return this.httpClient.post(API_URL,data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getAllTopic(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}allTopic?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getTopicById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getTopicById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateTopic(data): Observable<any> {
    let API_URL = `${this.apiUrl}updateTopic`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteTopic(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteTopic`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  addStudyMaterial(data): Observable<any> {
    let API_URL = `${this.apiUrl}addStudyMaterial`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getAllStudyMaterial(limit, offset): Observable<any> {
    let API_URL = `${this.apiUrl}getAllStudyMaterial?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getStudyMaterialById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getStudyMaterialById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateStudyMaterial(data): Observable<any> {
    let API_URL = `${this.apiUrl}updateStudyMaterial`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteStudyMaterial(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteStudyMaterial`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getQuestionAnswersById(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getQuestionAnswersById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateExamQuestionAns(data): Observable<any> {
    let API_URL = `${this.apiUrl}updateExamQuestionAns`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteQuestions(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteQuestions`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }
  
  addQuestion(data): Observable<any>{
    let API_URL = `${this.apiUrl}addQuestion`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getQuestionsByTopicID(limit, offset, topic_id): Observable<any>{
    var obj = {
      topic_id: topic_id
    }
    let API_URL = `${this.apiUrl}getQuestionsByTopicID?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getQuestionsByID(data): Observable<any> {
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getQuestionsByID`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateQuestionAnswerOfTopic(data): Observable<any>{
    let API_URL = `${this.apiUrl}updateQuestionAnswerOfTopic`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteQuestionAnswerOfTopic(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteQuestionAnswerOfTopic`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getFaqsByExamID(limit, offset, exam_id): Observable<any>{
    var obj = {
      exam_id: exam_id
    }
    let API_URL = `${this.apiUrl}getFaqsByExamID?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getTopicsByChapterID(limit, offset, chapter_id): Observable<any>{
    var obj = {
      chapter_id: chapter_id
    }
    let API_URL = `${this.apiUrl}getTopicsByChapterID?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
    .pipe(
      map(res => {
        return res
      }),
      catchError(this.error)
    )
  }

  getStudyMaterialByTopicID(limit, offset, topic_id): Observable<any>{
    var obj = {
      topic_id : topic_id
    }
    let API_URL = `${this.apiUrl}getStudyMaterialByTopicID?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
    .pipe(
      map(res => {
        return res
      }), 
      catchError(this.error)
    )
  }

  addCart(data):Observable<any>{
    let API_URL = `${this.apiUrl}addCart`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getAllCarts(limit, offset): Observable<any>{
   let API_URL = `${this.apiUrl}getAllCarts?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getCartById(data):Observable<any>{
    var obj = {
      id: data
    }
    let API_URL = `${this.apiUrl}getCartById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  updateCart(data):Observable<any>{
    let API_URL = `${this.apiUrl}updateCart`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  deleteCart(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteCart`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }

  getAdminProfileById():Observable<any>{
    
    let API_URL = `${this.apiUrl}admin/getAdminProfileList`;
    console.log(API_URL);
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
    }

    
  adminLogin(data): Observable<any> {
    let API_URL = `${this.apiUrl}admin/adminLogin`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res
        })
      )
  }
  
  userListing(limit, offset): Observable<any>{
    let API_URL = `${this.apiUrl}admin/users/list?page=` + offset + `&limit=` + limit;
    console.log(API_URL);
    return this.httpClient.post(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }
  getUserById(data): Observable<any> {
    // var obj = {
    //   id: id
    // }
    let API_URL = `${this.apiUrl}getUserById`;
    console.log(API_URL);
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }
  updateUserList(data): Observable<any> {
    let API_URL = `${this.apiUrl}updateUser `;
     console.log(API_URL);
     return this.httpClient.post(API_URL,data, httpOptions)
       .pipe(
         map(res => {
           return res
         }),
         catchError(this.error)
       )
   }
  
   deleteUserList(data): Observable<any> {
    let API_URL = `${this.apiUrl}deleteUser`;
    var obj = {
      id: data
    }
    console.log(API_URL);
    return this.httpClient.post(API_URL, obj, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  } 
  filterUserList(data): Observable<any> {
    let API_URL = `${this.apiUrl}filterUser`;
    console.log(API_URL)
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      )
  }
}
