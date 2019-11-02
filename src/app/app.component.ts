import {Store, select} from '@ngrx/store';
import {OnInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoListModule} from './store/actions/todo-list.action';
import {AppState} from './store';
import {Todo} from './models/todo';
import {selectTodos$} from './store/selectors/todo-list.selector';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  todos$: Observable<Todo[]>;
  public todoForm: FormGroup;
  private todoslength: number;

  constructor(
    private  store: Store<AppState>,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.todos$ = store.pipe(select(selectTodos$));
    this.todoForm = fb.group({
      title: ['', Validators.required],
      completed: [false, Validators]
    });
    this.todos$ = store
      .pipe(
        select(selectTodos$),
        tap((todos) => {
          this.todoslength = todos.length;
        })
      );
  }

  createTodo(todo: Todo) {
    const payload = {
      ...todo,
      userId: 1,
      id: this.todoslength + 1
    };

    this.store.dispatch(new TodoListModule.CreateTodo(payload));
    this.todoForm.reset();
  }

  ngOnInit() {
    this.store.dispatch(new TodoListModule.InitTodos());
  }

  deleteTodo(id: number) {
    this.store.dispatch(new TodoListModule.DeleteTodo(id));
  }
}
