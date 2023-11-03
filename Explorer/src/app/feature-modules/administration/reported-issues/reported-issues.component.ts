import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { ReportedIssue } from '../model/reported-issue.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'xp-reported-issues',
  templateUrl: './reported-issues.component.html',
  styleUrls: ['./reported-issues.component.css'],
  providers: [DatePipe]
})
export class ReportedIssuesComponent implements OnInit{

  reportedIssues: ReportedIssue[] = [];
  shouldRenderAllAgain: boolean = false;

  constructor(private service: AdministrationService) { }

  ngOnInit(): void{
    this.getReportedIssues();
  }
  getReportedIssues(): void{
    this.service.getReportedIssues().subscribe({
      next:(result:PagedResults<ReportedIssue>)=>{
        this.reportedIssues = result.results;
      },
      error: ()=>{

      }
    })
  }
  isUnresolvedAndOlderThan5Days(ri: ReportedIssue): boolean {
    if (ri.resolved) {
      return false; // Return false for resolved issues
    }
    const currentTime = new Date().getTime();
    const issueTime = new Date(ri.time).getTime();
    const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
    return currentTime - issueTime > fiveDaysInMillis;
  }
  
  
  
}
