import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/user.actions';
import { selectAllUsers, selectError } from '../store/user.selectors';
import { UserState } from '../store/user.reducers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  
  users: User[] = [];
  public usersForm!: FormGroup;
  editIndex!: number | null;
  error$ = this.store.select(selectError);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private store: Store<{ users: UserState }>
    ) {}

  ngOnInit(): void {

    this.initializeForm();
    // this.userService.getUsers().subscribe({
    //   next: (users: User[]) => this.users = users,
    //   error: (e) => console.error(e)
    // });
    this.store.dispatch(UserActions.loadUsers());
    this.store.select(selectAllUsers).subscribe(users => this.users = users);
  }

  initializeForm() {
    this.usersForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: ['']
    });    
  }

  editUser(i: number, user: User) {
    this.editIndex = i;
    this.usersForm.patchValue({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    });  
  }

  saveUser() {
    if (this.editIndex !== null) {
      const updatedUser = this.usersForm.value;
      // this.userService.updateUser(updatedUser).subscribe({
      //   next: (user: User) => {
      //     this.users[this.editIndex!] = user;
      //     this.editIndex = null;
      //   },
      //   error: (e) => console.error(e)
      // });
      this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
      this.editIndex = null;
    }
  }
}
