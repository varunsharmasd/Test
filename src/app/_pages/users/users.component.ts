import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UsersState } from '../../_state/users/users-store';
import { Data, UsersActions } from '@app/_state/users/users-store';
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
  public dataLoad$: Data[] = [];
  updated$:Data[] = []
  constructor(private api:DataService) { }
  ngOnInit(): void {
    this.load();
  }
  load():void {
    this.api.loadData()
      .subscribe(res => {
      this.dataLoad$ = res.users;
  })

  }
  toggle(o:Data,ev:Event) {
    ev.stopPropagation();
    console.log(o.show)
    this.dataLoad$ = this.dataLoad$.map(x => ({ ...x, show: x.id === o.id ? !o.show : x.show }))
  }
  valueChange(o: Data, ev: any) {
    this.updated$ = this.dataLoad$.map(x => ({
      ...x,
      firstName: x.id === o.id ? ev.target.value : x.firstName,
      show:false
    }));
    
  }
  valueCatChange(o: Data, ev: any) {
    this.updated$ = this.dataLoad$.map(x => ({
      ...x,
      show:false,
      lastName: x.id === o.id ? ev.target.value : x.lastName
    }));
  }

  save(o: Data, ev: Event) {
    this.toggle(o, ev);
    this.dataLoad$ = this.updated$.length === 0 ? this.dataLoad$:this.updated$
  }

}
