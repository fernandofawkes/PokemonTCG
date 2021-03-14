import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  inputs$ = new Subject();
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.inputs$.pipe(debounceTime(350), distinctUntilChanged()).subscribe((query) => {
      this.router.navigate(['/results'], {queryParams: {q: query}});
    });
    
  }

  set query(val) {
    this.inputs$.next(val);
  } 
}
