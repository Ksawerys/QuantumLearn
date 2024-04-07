import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { NotificationsService } from '../../../services/notifications.service';
import { trigger, transition, style, animate, query, stagger, group } from '@angular/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatIcon],
  animations: [
    trigger('notificationAnimation', [
      transition(':leave', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'translateY(-100%)' }))
      ])
    ])
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent  {

  constructor(private notificationService: NotificationsService) {
    this.notificationService.notifications.subscribe(notifications => {
      console.log('Adding notificatisadasdon',notifications);
      this.notifications = notifications;
    });
  }
  
  showAdditionalInfo = false;
  notifications: any[] = [];


  @Input() warning: boolean = true;
  @Input() title!: string;
  @Input() message!: string;
  @Input() additionalInfo?: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
