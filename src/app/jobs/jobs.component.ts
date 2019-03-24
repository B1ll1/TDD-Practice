import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from './services/jobs.service';
import * as moment from 'moment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {

  jobDetails;
  jobs = [];
  title = 'Jobs List';
  allJobsSubscription;

  constructor(private jobsService: JobsService) { }

  formatDate(date) {
    return moment(date).format('lll')
  }

  setJobDetails(job) {
    this.jobDetails = job;
  }

  ngOnDestroy() {
    this.allJobsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setJobs();
  }

  private setJobs() {
    this.allJobsSubscription = this.jobsService.fetchAllJobs()
      .subscribe((jobsResponse: any) => this.jobs = jobsResponse.body)
  }
}
