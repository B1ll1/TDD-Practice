import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as moment from 'moment';
import { of } from 'rxjs';

import * as jobsData from '../../assets/mock/jobs.json';
import { JobsComponent } from './jobs.component';
import { JobsService } from './services/jobs.service';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let jobsService: JobsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [ JobsComponent ],
      providers: [ JobsService ]
    })
      .compileComponents();
  }));

  beforeEach(inject([JobsService], service => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    jobsService = service;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Jobs List'`, () => {
    fixture = TestBed.createComponent(JobsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Jobs List');
  });

  it('should render title in a mat-toolbar-row span tag', () => {
    fixture = TestBed.createComponent(JobsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar-row span').textContent).toContain('Welcome to Jobs List!');
  });

  it('should return date in moment format lll', () => {
    const date = new Date();
    const expectedDate = moment(date).format('lll');
    const dateReturned = component.formatDate(date);

    expect(dateReturned).toBe(expectedDate);
  });

  it('should set jobDetails', () => {
    const jobsList: any = jobsData;

    component.setJobDetails(jobsList.default.body[0]);

    expect(component.jobDetails).toEqual(jobsList.default.body[0]);
  });

  it('should call fetch jobs method and set the jobs variable', async(async() => {
    const result: any = jobsData;
    spyOn(jobsService, 'fetchAllJobs').and.returnValue(of(result));

    component.ngOnInit();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.jobs).toEqual(result.default.body);
  }));

  it('should render a job list', async(async() => {
    const jobsListJson: any = jobsData;
    spyOn(jobsService, 'fetchAllJobs').and.returnValue(of(jobsListJson));
    component.jobs = jobsListJson.default.body;
    component.ngOnInit();

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const jobsList = compiled.querySelectorAll('mat-list-item.job-list-item-test');

    expect(jobsList.length).toEqual(jobsListJson.default.body.length);
  }));

  it('should render the job details', async(async() => {
    const jobsListJson: any = jobsData;
    component.jobs = jobsListJson.default.body;
    component.setJobDetails(component.jobs[0]);

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const jobDetails = compiled.querySelectorAll('mat-list-item.job-details-list-item-test');

    expect(jobDetails.length).toBeDefined();
  }));

  it('should change the job details if it is updated', async(async() => {
    const jobsListJson: any = jobsData;
    component.jobs = jobsListJson.default.body;
    component.setJobDetails(component.jobs[0]);
    const firstJobDetails = component.jobDetails;

    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    const jobDetailsOne = compiled.querySelectorAll('mat-list-item.job-details-list-item-test');

    component.setJobDetails(component.jobs[1]);
    const secondJobDetails = component.jobDetails;

    await fixture.whenStable();
    fixture.detectChanges();

    const jobDetailsTwo = compiled.querySelectorAll('mat-list-item.job-details-list-item-test');

    expect(jobDetailsTwo).not.toBe(jobDetailsOne);
    expect(firstJobDetails).not.toBe(secondJobDetails);
  }));
});
