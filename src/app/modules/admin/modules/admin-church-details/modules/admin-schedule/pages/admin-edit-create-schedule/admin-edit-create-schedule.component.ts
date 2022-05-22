import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LayoutBreakpointsService} from "../../../../../../../../shared/services/local/layout-breakpoints.service";
import {ErrorMessageService} from "../../../../../../../../shared/services/local/error-message.service";
import {filter, Observable, switchMap} from "rxjs";
import {HttpLoadingService} from "../../../../../../../../shared/services/local/http-loading.service";
import {ScheduleEventService} from "../../../../../../../../shared/services/API/schedule-event.service";
import {
  ICreateScheduleEvent,
  IUpdateScheduleEvent
} from "../../../../../../../../shared/interfaces/schedule-event.interfaces";

@Component({
  selector: 'app-admin-edit-create-schedule',
  templateUrl: './admin-edit-create-schedule.component.html',
  styleUrls: ['./admin-edit-create-schedule.component.scss'],
  providers: [ErrorMessageService]
})
export class AdminEditCreateScheduleComponent implements OnInit {
  churchId!: number;
  private scheduleEventId?: number;

  readonly formGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(4)
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ]),
    date: new FormControl(new Date(), Validators.required),
    startTime: new FormControl("11:22", Validators.required),
    endTime: new FormControl("11:22", Validators.required),
  });

  constructor(
    public readonly layoutBreakpointsService: LayoutBreakpointsService,
    public readonly errorMessageService: ErrorMessageService,
    private readonly scheduleEventService: ScheduleEventService,
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
          this.scheduleEventId = +params['scheduleEventId'];
          return this.scheduleEventService.getById(params['scheduleEventId']);
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

    const body: IUpdateScheduleEvent | ICreateScheduleEvent = {
      ...this.formGroup.value,
      churchId: this.churchId
    };

    const observable = !!this.scheduleEventId
      ? this.scheduleEventService.update({...body, id: this.scheduleEventId})
      : this.scheduleEventService.create(body);

    observable
      .subscribe({
        next: () => this.router.navigate(['', 'admin', 'church', 'details', this.churchId, 'schedule', 'list']),
        error: error => {
          this.errorMessageService.errorMessage = error.message;
          this.errorMessageService.showErrorMessage()
        }
      });
  }
}
