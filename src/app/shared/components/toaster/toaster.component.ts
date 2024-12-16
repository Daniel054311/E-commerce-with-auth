import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { Toast, ToastType } from '../../../features/models/types';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
@Injectable({
  providedIn: 'root',
})
export class ToasterComponent {
  public show: boolean = false;
  public message: string = '';
  public type: ToastType = 'info';
  private hideTimeout: number | null = null;
  private readonly defaultDuration = 3000;
  private remainingTime: number | null = null;
  private startTime!: number;

  constructor() {}

  public showToast(toast: Toast) {
    this.message = toast.message;
    this.type = toast.type;
    this.show = true;
    this.startTime = Date.now();
    this.setHideTimeout(toast.duration ?? this.defaultDuration);
  }

  private setHideTimeout(duration: number): void {
    this.clearHideTimeout();
    this.hideTimeout = window.setTimeout(() => {
      this.hideToast();
    }, duration);
  }

  private clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  public hideToast() {
    this.show = false;
  }

  public onMouseEnter() {
    this.clearHideTimeout();
    const elapsedTime = Date.now() - this.startTime;
    this.remainingTime! -= elapsedTime;
  }

  public onMouseLeave() {
    this.startTime = Date.now();
    this.setHideTimeout(this.remainingTime!);
  }

  public onCloseClick() {
    this.clearHideTimeout();
    this.hideToast();
  }
}
