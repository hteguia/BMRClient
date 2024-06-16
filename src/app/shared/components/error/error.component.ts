import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `<div class="error"><ng-content/></div>`,
  styles: [`.error{color:#f87171; font-size:12px; margin-left:15px}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {

}
