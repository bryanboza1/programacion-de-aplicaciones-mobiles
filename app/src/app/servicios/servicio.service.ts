import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private objectSource = new BehaviorSubject<{}>({});
  private listSource = new BehaviorSubject<any[]>([]);

  $getObjectSource = this.objectSource.asObservable();
  $getListSource = this.listSource.asObservable();

  constructor() { }

  sendobjectsource(data:any){
    this.objectSource.next(data);
  }
}
