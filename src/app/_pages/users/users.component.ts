import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { UsersState, selectUserState } from '../../_state/users/users-store';
import { Data, UsersActions, selectAllUsers } from '@app/_state/users/users-store';
import { DataService } from '../../_pages/users/data.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // @Input()
  // initUsers$!: Observable<Data[]>;
  userList$: Observable<Data[]> 
  user: Data;
  
  constructor(private api: DataService, private store: Store) { 
    this.userList$ = this.store.pipe(select(selectAllUsers));
  }
  ngOnInit(): void {
    this.store.dispatch(UsersActions.init())
  }

  toggle(o:Data,ev:Event) {
    ev.stopPropagation();
    const finalObject = {
      ...o,
      show:true
    }
    this.store.dispatch(UsersActions.updateUser({data:finalObject}))
  }
  valueChange(o: Data, ev: any) {
    ev.stopPropagation();
    const updatedValue = ev.target.value; 
    const name = ev.target.name; 
    this.user = {
      ...o,
      [name]: updatedValue,
    };
   this.store.dispatch(UsersActions.updateUser({data:this.user}))
    
  }

  save(o: Data, ev: Event) {
    ev.stopPropagation();
    const finalObject = {
      ...o,
      show:false
    }
    this.store.dispatch(UsersActions.updateUser({data:finalObject}))
  }

}
