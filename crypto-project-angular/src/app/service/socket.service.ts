import { Injectable } from '@angular/core';
import { Environment } from 'environment';
import { Observable } from 'rxjs';
import { connect, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;
  constructor() {
    this.socket = connect(Environment.shared.socketBaseUrl);
  }

  priceListener(): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on('priceList', (data) => subscribe.next(data));
    });
  }
}
