import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChurchService} from "../../../../../../shared/services/API/church.service";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, Observable, startWith, Subject, switchMap, tap} from "rxjs";
import {EEmailValidation} from "../../../../../../shared/enums/form-validation.enums";
import {HttpLoadingService} from "../../../../../../shared/services/local/http-loading.service";
import {ErrorMessageService} from "../../../../../../shared/services/local/error-message.service";
import {LayoutBreakpointsService} from "../../../../../../shared/services/local/layout-breakpoints.service";
import {IUpdateChurch} from "../../../../../../shared/interfaces/church.interfaces";
import {IImage} from "../../../../../../shared/interfaces/image.interfaces";
import {ELocalStorage} from "../../../../../../shared/enums/local-storage.enums";

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
  providers: [ErrorMessageService]
})
export class AdminOverviewComponent implements OnInit {
  private churchId!: string;

  images: IImage[] = [];

  readonly formGroup = new FormGroup({
    prior: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[0-9]{10}/),
    ]),
    email: new FormControl(null, [
      Validators.email,
      Validators.required,
      Validators.minLength(EEmailValidation.MIN),
    ]),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    diocese: new FormControl(null, Validators.required),
    deanery: new FormControl(null, Validators.required)
  });

  readonly reload$ = new Subject<void>();

  constructor(
    public readonly layoutBreakpointsService: LayoutBreakpointsService,
    public readonly errorMessageService: ErrorMessageService,
    private readonly churchService: ChurchService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      (this.route.parent as ActivatedRoute).params,
      this.reload$.pipe(startWith(null))
    ])
      .pipe(
        tap(() => this.formGroup.disable()),
        switchMap(([params]) => {
          this.churchId = params['id'];
          return this.churchService.getById(params['id'])
        }),
        tap(() => this.formGroup.enable()),
      )
      .subscribe(value => {
        this.images = value.images;

        this.formGroup.patchValue(value);
        this.formGroup.markAsPristine();
      });
  }

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  get phoneNumberFormControl(): FormControl {
    return this.formGroup.get('phoneNumber') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  reloadInformation(): void {
    this.reload$.next();
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    const body: IUpdateChurch = {
      id: this.churchId,
      userId: localStorage.getItem(ELocalStorage.USER_ID),
      ...this.formGroup.value
    }

    this.errorMessageService.hideErrorMessage();

    this.churchService.updateById(body)
      .subscribe({
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      })
  }

  handleFileUpload(files: FileList): void {
    this.errorMessageService.hideErrorMessage();

    this.churchService.uploadImage(this.churchId, files)
      .subscribe({
        next: value => this.images = value,
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      })
  }

  deleteImage(id: number): void {
    this.errorMessageService.hideErrorMessage();

    this.churchService.removeImageById(id)
      .subscribe({
        next: value => this.images = this.images.filter(el => el.id !== id),
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      })
  }
}
