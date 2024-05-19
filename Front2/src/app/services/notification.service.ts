import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor() { 
  }

  private notificationsSource = new BehaviorSubject<any[]>([]);  
  public notifications = this.notificationsSource.asObservable();

  addNotification(notification: any) {
    let currentNotifications = this.notificationsSource.getValue();
    if (currentNotifications.length >= 4) {
      currentNotifications = currentNotifications.slice(1);
    }
    this.notificationsSource.next([notification, ...currentNotifications]);
    setTimeout(() => {
      this.removeNotification(notification);
    }, 6000);
  }
  
  removeNotification(notification: any) {
    const currentNotifications = this.notificationsSource.getValue();
    const index = currentNotifications.indexOf(notification);
    if (index !== -1) {
      currentNotifications.splice(index, 1);
      this.notificationsSource.next(currentNotifications);
    }
  }
}
