import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
})
export class LoadingSkeletonComponent {
  @Input() visibility: boolean = true;
}
