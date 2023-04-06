import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParameter: Partial<RequestParamaters>): string {
    return `${
      requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl
    }/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ''
    }`;
  }

  get<T>(requestParameter: RequestParamaters, id?: string): Observable<T> {
    let url: string = '';

    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}${id ? `/${id}` : ''}`;

    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }

  post<T>(requestParameter: RequestParamaters, body: Partial<T>) : Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}`;

   return  this.httpClient.post<T>(url, body, { headers: requestParameter.headers });
  }

  put<T>(requestParameter: RequestParamaters,body:Partial<T>) : Observable<T>
  {
    let url: string ='';
    if(requestParameter.fullEndPoint)
      url = requestParameter.fullEndPoint
    else url = `${this.url(requestParameter)}`;
   return this.httpClient.put<T>(url,body,{headers:requestParameter.headers});
  }

  delete<T>(requestParameter:RequestParamaters,id:string) : Observable<T>
  {
    let url:string ='';
    if (requestParameter.fullEndPoint)
      url= requestParameter.fullEndPoint
    else url = `${this.url(requestParameter)}/${id}`;
   return this.httpClient.delete<T>(url,{headers:requestParameter.headers});
  }

}



export class RequestParamaters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
