import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  listado = [];
  item : any;
  private urlBaseApi = 'https://jsonplaceholder.typicode.com/';
  constructor(private httpClient: HttpClient) { }

  getUsers()
  {
    let url = this.urlBaseApi + 'users';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }
  getUser(id: string)
  {
    let url = this.urlBaseApi + 'users';
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data: any) =>
      {
        resolve(data);
        this.item = data;
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

}
