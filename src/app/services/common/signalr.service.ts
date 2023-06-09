import { Inject, Injectable } from '@angular/core';
import { HubConnection,HubConnectionBuilder,HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string) { }

  // private _connection:HubConnection;
  // get connection():HubConnection // encapsulation.
  // {
  //   return this._connection;
  // }

  start(hubUrl:string)// bir hub olusturması için
  {
    hubUrl= this.baseSignalRUrl + hubUrl;
    // if(!this._connection || this._connection?.state == HubConnectionState.Disconnected)
    //{hub olusturulacak demek.asagida olusturuluyor.
      const builder:HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection:HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

      //baglantı saglanmazsa 2sn de bir baglanmaya calıs.
      hubConnection.start().then(()=>
          console.log("SignalR Connection started"))
        .catch(error=> setTimeout(()=> this.start(hubUrl),2000));
        // this.hub = hubConnection;
   //  }

    hubConnection.onreconnected(connectionId=> console.log("reconnected"));
    //asagıdaki fonksiyonlar kullanım örnegi.
    hubConnection.onreconnecting(error => console.log("reconnecting"));
    hubConnection.onclose(error=> console.log("Close reconnection"));//baglantıyı tekrar kurmaya calıstıgında gelen hatayı yakar.

    return hubConnection;

  }

  invoke(hubUrl:string,procedureName:string,message:any,successCallback?:(value)=>void,errorCallback?:()=>void){ // backendde olusturdugumuz fonksiyonu tetiklemek için

    this.start(hubUrl).invoke(procedureName,message).then(successCallback).catch(errorCallback);
  } //mesajları diğer clientlere göndermek için

  on(hubUrl:string,procedureName:string,callback?:(...message:any)=> void){
    this.start(hubUrl).on(procedureName,callback)
  } // gelecek mesajları runtime'da yakalamak için
}
