import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {ChurchService} from '../../../../shared/services/API/church.service';
import {finalize} from 'rxjs/operators';
import {ICreateChurch} from '../../../../shared/interfaces/church.interfaces';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../../../shared/animations';

@Component({
  selector: 'app-create-church-page',
  templateUrl: './create-church-page.component.html',
  styleUrls: ['./create-church-page.component.scss'],
  animations: [fadeInAnimation]
})
export class CreateChurchPageComponent {
  formGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    deanery: new FormControl(null, Validators.required),
    diocese: new FormControl(null, Validators.required),
    prior: new FormControl(null, Validators.required),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(12),
      Validators.maxLength(12)
    ]),
    description: new FormControl(null, Validators.required),
    // image: new FormControl(null)
  });

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly churchService: ChurchService,
    private readonly router: Router
  ) {
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  submit(): void {
    console.log(this.formGroup.value);

    if (this.formGroup.invalid) {
      return;
    }

    const body: ICreateChurch = this.formGroup.value;

    if (!body.phoneNumber.includes('+')) {
      body.phoneNumber = `+${body.phoneNumber}`
    }

    const snackbarRef = this.snackbarService.info('Триває додавання церкви...', false);

    this.churchService.create(body)
      .pipe(finalize(() => snackbarRef.close()))
      .subscribe(() => {
        this.snackbarService.success('Церква успішно додана. Редагувати цекву можна у вкладці \'Загальне\'');
        this.router.navigate(['', 'admin', 'overview']);
      });
  }
}
