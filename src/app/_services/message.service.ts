import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { MessageType } from '../_models/message.model';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    sendMessage(type: MessageType, message: any) {
        this.subject.next({type: type, text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
