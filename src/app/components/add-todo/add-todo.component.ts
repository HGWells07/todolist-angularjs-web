import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  name: string;

  onSubmit() {
    const todo = {
      name: this.name,
    };

    this.addTodo.emit(todo);
  }

  constructor() {}

  ngOnInit(): void {}
}
