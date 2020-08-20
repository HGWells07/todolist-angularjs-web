import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<String> = new EventEmitter();

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.done,
    };
    return classes;
  }

  onToggle(todo: Todo) {
    //Toggle UI
    todo.done = !todo.done;
    //Toggle in server
    this.todoService.toggleDone(todo).subscribe((todo) => {
      console.log(todo);
    });
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo.id);
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}
}
