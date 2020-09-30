import { Component, OnInit, } from '@angular/core';
import { Todo } from '../todoClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos: any = [];
  todoshow: Todo[] = [];
  todo = new Todo();
  todoTitle: string = "";
  status = "";
  titelTemp = '';

  constructor(private http: HttpClient) {
    this.getTodo();
  }
  
  getTodo() {
    this.http
      .get("http://localhost:3000/todos")
      .subscribe(
        x => {
          this.todos = x;
          this.todoshow = this.todos;
        });
  }

  ngOnInit() {

  }

  addtodo() {
    if (this.todoTitle.length > 2) {
      this.todo = new Todo();
      this.todo.title = this.todoTitle;
      this.todo.completed = false;
      this.todo.editing = false;
      this.AddTodoAPI(this.todo);
    }
    this.todoTitle = "";
  }

  clearcompleted() {
    for (let index = 0; index < this.todos.length; index++) {
     if( this.todos[index].completed == true)
      this.deleteTodo(this.todos[index]._id);
    }
  }

  editTodo(todo: Todo) {
    if (!todo.completed) {
      this.titelTemp = todo.title;
      todo.editing = true;
    }
  }

  doneEditing(todo: Todo) {
    if (todo.title == "") {
      this.dontedit(todo);
    }
    else {
      todo.editing = false;
      this.EditTodoAPI(todo);
    }
  }

  uncompleted() {
    return this.todos.filter(todo => todo.completed == false).length;
  }

  FilterActive() {
    this.todoshow = this.todos;
    this.todoshow = this.todos.filter(todo => todo.completed == false);
  }

  Filtercompleted() {
    this.todoshow = this.todos;
    this.todoshow = this.todos.filter(todo => todo.completed !== false);
  }

  dontedit(todo: Todo) {
    todo.title = this.titelTemp;
    todo.editing = false;
  }


  EditTodoAPI(iTodo: Todo) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.http.put
      (
        "http://localhost:3000/todos/" + iTodo._id,
        { "title": iTodo.title, "completed": iTodo.completed, "editing": iTodo.editing },
        options
      )
      .subscribe(() => {
        this.getTodo();
      })
  }

  AddTodoAPI(iTodo: Todo) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    console.log(iTodo)
    this.http.post
      (
        "http://localhost:3000/todos",
        { "title": iTodo.title, "completed": iTodo.completed, "editing": iTodo.editing },
        options
      )
      .subscribe(() => {
        this.getTodo();
      })
  }

  deleteTodo(id: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.http.delete
      (
        'http://localhost:3000/todos/' + id,
        options
      )
      .subscribe(() => {
        this.getTodo();
      });
  }
}


