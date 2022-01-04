import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../../../../shared/services/local/snackbar.service';
import {fadeInAnimation} from '../../../../shared/animations';
import {ChurchService} from '../../../../shared/services/API/church.service';
import {concatMap, filter, finalize, map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {IChurch, IChurchItem, IUpdateChurch} from '../../../../shared/interfaces/church.interfaces';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-edit-overview-page',
  templateUrl: './edit-overview-page.component.html',
  styleUrls: ['./edit-overview-page.component.scss'],
  animations: [fadeInAnimation]
})
export class EditOverviewPageComponent implements OnInit {
  churchInfo!: IChurchItem;

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
    images: new FormControl(null)
  });

  constructor(
    private readonly snackbarService: SnackbarService,
    private readonly churchService: ChurchService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);

    const snackbarRef = this.snackbarService.info('Завантаження інформації про церкву...', false);

    this.route.params
      .pipe(
        mergeMap(param => this.churchService
          .getById(param.id)
          .pipe(finalize(() => snackbarRef.close()))),
        filter(response => !!response),
        map(response => {
          response.phoneNumber = response.phoneNumber.substring(1);
          return response;
        })
      )
      .subscribe(
        response => this.formGroup.patchValue(response),
        () => this.snackbarService.error('Не вдалося завантажити інформацію про церкву. Переконайтеся що у вас є доступ до інтернету')
      );
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const {name, location, deanery, diocese, prior, email, phoneNumber, description, images} = this.formGroup.value;

    const body: IUpdateChurch = {
      id: this.churchInfo.id as number,
      name,
      location,
      deanery,
      diocese,
      prior,
      email,
      phoneNumber,
      description
    };

    if (!body.phoneNumber.includes('+')) {
      body.phoneNumber = `+${body.phoneNumber}`;
    }

    const snackbarRef = this.snackbarService.info('Триває оновлення даних церкви...', false);

    this.churchService.updateById(body)
      .pipe(
        concatMap(() => !!images ? this.churchService.uploadImage(this.churchInfo.id.toString(), images) : of(null)),
        finalize(() => snackbarRef.close())
      )
      .subscribe(() => {
        this.snackbarService.success('Церкву успішно оновлено!');
        this.router.navigate(['', 'admin', 'overview', this.churchInfo.id]);
      });
  }
}
