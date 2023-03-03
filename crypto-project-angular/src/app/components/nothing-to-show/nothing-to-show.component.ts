import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nothing-to-show',
  templateUrl: './nothing-to-show.component.html',
})
export class NothingToShowComponent {
  @Input() visibility: boolean = false;
}
