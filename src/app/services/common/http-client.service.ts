import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,@Inject("baseUrl") private baseUrl:string) { }

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ''}`;
  }

  get<T>(requestParameter:RequestParameters,id?:string) : Observable<T>
  {
    let url:string ="";
    if(requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint;
    else
      url = `${this.url(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

    return this.httpClient.get<T>(url,{headers:requestParameter.headers,responseType:requestParameter.responseType as "json"});
  }

  post<T>(requestParameter:RequestParameters,body:Partial<T>) : Observable<T>
  {
    let url:string ="";
    if(requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint;
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`

     return this.httpClient.post<T>(url,body,{headers:requestParameter.headers,responseType:requestParameter.responseType as "json"});
  }

  put<T>(requestParameter: RequestParameters,body:Partial<T>) : Observable<T>
  {
    let url: string ='';
    if(requestParameter.fullEndpoint)
      url = requestParameter.fullEndpoint
    else
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

      return this.httpClient.put<T>(url,body,{headers:requestParameter.headers,responseType:requestParameter.responseType as "json"});
  }

  delete<T>(requestParameter:RequestParameters,id:string) : Observable<T>
  {
    let url:string ='';
    if (requestParameter.fullEndpoint)
      url= requestParameter.fullEndpoint
    else
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

      return this.httpClient.delete<T>(url,{headers:requestParameter.headers,responseType:requestParameter.responseType as "json"});
  }
}


export class RequestParameters {
  controller?: string;
  action?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndpoint?:string;
  queryString?:string;
  responseType?:string="json";
}
