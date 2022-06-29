import { Injectable } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Refresh',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'warn',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'refresh'
    }
  };
  
  constructor() { }
}