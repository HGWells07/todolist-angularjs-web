import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';
//import * as moment from 'moment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(id: String) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.todoService.deleteTodo(id).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }
}
