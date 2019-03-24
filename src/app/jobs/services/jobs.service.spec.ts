import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import * as jobsData from '../../../assets/mock/jobs.json';

import { JobsService } from './jobs.service';

describe('JobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ JobsService ],
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: JobsService = TestBed.get(JobsService);
    expect(service).toBeTruthy();
  });

  describe('service methods', () => {

    function setup() {
      const jobsService = TestBed.get(JobsService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { jobsService, httpTestingController };
    }

    it('should fetch all jobs', () => {
      const { jobsService, httpTestingController } = setup();

      jobsService.fetchAllJobs().subscribe(jobsResponse => {
        expect(jobsResponse).toEqual(jobsData);
      });

      const req = httpTestingController.expectOne('/assets/mock/jobs.json');

      expect(req.request.method).toBe('GET');

      req.flush(jobsData);
    });

    afterEach(() => {
      const { httpTestingController } = setup();
      httpTestingController.verify();
    });
  });

});
