import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Currency } from 'src/app/interface/currency';
import { CurrenciesService } from 'src/app/service/currencies.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss'],
})
export class AddCurrencyComponent {
  addCurrencyModalVisibility: boolean = false;

  isLoadingRequest: boolean = false;

  currencyName: string = '';
  email: string = '';
  description: string = '';

  emailFieldError: boolean = false;
  nameFieldError: boolean = false;

  inputErrorMessages: string[] = [];

  reqResult: any;

  constructor(
    private messageService: MessageService,
    private currenciesService: CurrenciesService
  ) {}

  resetInputErrors(): void {
    // clear errors
    this.emailFieldError = false;
    this.nameFieldError = false;
    this.inputErrorMessages = [];
  }
  resetClassStateValue(): void {
    // set form values to null
    this.email = '';
    this.currencyName = '';
    this.description = '';

    // clear errors
    this.resetInputErrors();
  }

  addCurrencyBtnHandler(): void {
    // resetStateValues
    this.resetClassStateValue();

    // set modal visible
    this.addCurrencyModalVisibility = true;
  }

  formValidator(name: string, email: string): boolean {
    let error: boolean = true;

    // validation for name -> must between 3 and 15 characters
    const nameCheck = this.nameInputValidator(name);
    if (nameCheck !== true) {
      error = false;
      this.nameFieldError = true;
      this.inputErrorMessages.push(String(nameCheck));
    }

    // email validator
    const emailCheck = this.emailInputValidator(email);
    if (emailCheck !== true) {
      error = false;
      this.emailFieldError = true;
      this.inputErrorMessages.push(String(emailCheck));
    }

    return error;
  }

  emailInputValidator(email: string): string | boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ? true
      : 'Wrong Email';
  }

  nameInputValidator(name: string): string | boolean {
    return name.length < 3 || name.length > 15
      ? 'Name Must Between 3 - 10 characters'
      : true;
  }

  submitFormHandler(): void {
    this.resetInputErrors();
    const validation = this.formValidator(this.currencyName, this.email);

    if (validation) {
      this.currenciesService
        .insertCurrency({
          name: this.currencyName,
          email: this.email,
          description: this.description,
        })
        .subscribe({
          next: (data) => this.requestMiddlewareHandler(data),
          error: (e) => this.onFailRequestHandler(e),
          complete: () => this.onSuccessRequestHandler(),
        });
    }
  }

  requestMiddlewareHandler(data: any) {
    this.addCurrencyModalVisibility = false;
    this.reqResult = data;
  }

  onSuccessRequestHandler() {
    this.messageService.add({
      severity: 'success',
      summary: 'Currency Added',
      detail: `${this.reqResult?.name} Added Successfully`,
    });
  }

  onFailRequestHandler(error: any) {
    switch (error.status) {
      case 409:
        this.messageService.add({
          severity: 'error',
          summary: 'Duplicate',
          detail: `Currency added Before`,
        });
        break;
      default:
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: error.statusText,
        });
        break;
    }
  }
}
