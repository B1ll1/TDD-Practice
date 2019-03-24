import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JobsService {

  constructor(private httpClient: HttpClient) { }

  fetchAllJobs() {
    return this.httpClient.get('/assets/mock/jobs.json');
  }
}
