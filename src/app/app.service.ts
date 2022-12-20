import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class AppService {

   constructor(private http: HttpClient) { }

   // Функция для отправки запроса на Бэк.
   sendQuery(data: any) {
      return this.http.post('https://testologia.site/intensive-price', data)
   }

   // Функция запроса данных по авто с сервера
   getData(category: any) {
      return this.http.get('https://testologia.site/intensive-data', {params: {category: category}});
   }


}
