import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Replace } from './../shared';
import { AppBreadcrumbService } from './app-breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs | async" let-last = last>
      <li class="breadcrumb-item"
          *ngIf="breadcrumb.label.title && (breadcrumb.url.slice(-1) == '/' || last)"
          [ngClass]="{active: (last || breadcrumb.label.noLink)}">
        <a *ngIf="!last && !breadcrumb.label.noLink" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
        <span *ngIf="last || breadcrumb.label.noLink" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
      </li>
    </ng-template>
  `
})
export class AppBreadcrumbComponent implements OnInit, OnDestroy {
  @Input() fixed: boolean;
  public breadcrumbs;

  constructor(public service: AppBreadcrumbService, public el: ElementRef) { }

  public ngOnInit(): void {
    Replace(this.el);
    this.isFixed(this.fixed);
    this.breadcrumbs = this.service.breadcrumbs;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('breadcrumb-fixed');
  }

  isFixed(fixed: boolean): void {
    if (this.fixed) { document.querySelector('body').classList.add('breadcrumb-fixed'); }
  }
}
