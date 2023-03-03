import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'crypto-project-angular';

  onButtonClick(e: any) {
    console.log(e.target.value);
  }
}
