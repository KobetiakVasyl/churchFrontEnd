import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnnouncementService} from "../../../../../../../../shared/services/API/announcement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LayoutBreakpointsService} from "../../../../../../../../shared/services/local/layout-breakpoints.service";
import {ErrorMessageService} from "../../../../../../../../shared/services/local/error-message.service";
import {concat, filter, Observable, of, switchMap, take, withLatestFrom} from "rxjs";
import {HttpLoadingService} from "../../../../../../../../shared/services/local/http-loading.service";
import {IImageChangeEvent} from "../../../../../../../../shared/interfaces/image.interfaces";
import {
  ICreateAnnouncement,
  IUpdateAnnouncement
} from "../../../../../../../../shared/interfaces/announcement.interfaces";

@Component({
  selector: 'app-admin-edit-create-announcement',
  templateUrl: './admin-edit-create-announcement.component.html',
  styleUrls: ['./admin-edit-create-announcement.component.scss'],
  providers: [ErrorMessageService]
})
export class AdminEditCreateAnnouncementComponent implements OnInit {
  churchId!: number;
  private announcementId?: number;

  readonly formGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(4)
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ]),
    images: new FormControl([])
  });

  constructor(
    public readonly layoutBreakpointsService: LayoutBreakpointsService,
    public readonly errorMessageService: ErrorMessageService,
    private readonly announcementService: AnnouncementService,
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    (((this.activatedRoute.parent as ActivatedRoute).parent as ActivatedRoute).parent as ActivatedRoute).params
      .subscribe(params => this.churchId = +params['id']);

    this.activatedRoute.params
      .pipe(
        filter(params => !!params?.['announcementId']),
        switchMap(params => {
          this.announcementId = +params['announcementId'];
          return this.announcementService.getById(params['announcementId']);
        })
      )
      .subscribe(value => {
        this.formGroup.patchValue(value);
        this.formGroup.markAsPristine();
      })
  }

  get showLoading$(): Observable<boolean> {
    return HttpLoadingService.showLoading$;
  }

  get nameFormControl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get descriptionFormControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  submit(): void {
    if (this.formGroup.invalid) return;

    this.errorMessageService.hideErrorMessage();

    const {name, description, images} = this.formGroup.value;
    console.log(this.churchId, this.announcementId);
    console.log({name, description, images})
    !!this.announcementId
      ? this.update({id: this.announcementId, name, description}, images)
      : this.create({churchId: this.churchId, name, description}, images);
  }

  private update(body: IUpdateAnnouncement, images: IImageChangeEvent): void {
    const {uploaded, removed} = images as IImageChangeEvent;

    const removeImages$ = !!removed.length
      ? concat(...removed.map(el => this.announcementService.removeImageById(el)))
      : of(null).pipe(take(1));

    const uploadImages$ = !!uploaded.length
      ? this.announcementService.uploadImages(this.churchId, this.announcementId as number, uploaded)
      : of(null).pipe(take(1))

    concat(this.announcementService.update(body), removeImages$, uploadImages$)
      .subscribe({
        next: () => this.router.navigate(['', 'admin', 'church', 'details', this.churchId, 'announcements', 'list']),
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      });
  }

  private create(body: ICreateAnnouncement, images: IImageChangeEvent): void {
    const {uploaded, removed} = images as IImageChangeEvent;

    this.announcementService.create(body)
      .pipe(
        switchMap(value => {
          this.announcementId = value.id;

          const removeImages$ = !!removed.length
            ? concat(...removed.map(el => this.announcementService.removeImageById(el)))
            : of(null).pipe(take(1));

          const uploadImages$ = !!uploaded.length
            ? this.announcementService.uploadImages(this.churchId, this.announcementId as number, uploaded)
            : of(null).pipe(take(1))

          return concat(removeImages$, uploadImages$);
        })
      )
      .subscribe({
        next: () => this.router.navigate(['', 'admin', 'church', 'details', this.churchId, 'announcements', 'list']),
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      });
  }
}
