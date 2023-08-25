import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { CandidateSearchType } from '../../enums/condidate-search-type.enum';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
}[];

searchCtrl!: FormControl;
searchTypeCtrl!: FormControl;

  constructor(private candidateService: CandidatesService, private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.initObservables();
    this.candidateService.getCandidatesFromServer();
  }

  private initObservables(){
    this.initForm();
    this.loading$ = this.candidateService.loading$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
  );
  const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
  );
  
  this.candidates$ = combineLatest([
    search$,
    searchType$,
    this.candidateService.candidates$
    ]
).pipe(
    map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
    )
);
    //this.candidates$ = this.candidateService.candidates$;
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
        { value: CandidateSearchType.LASTNAME, label: 'Nom' },
        { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
        { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
    ];
}

}
