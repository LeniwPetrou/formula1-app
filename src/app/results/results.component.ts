import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ResultsService } from '../services/results.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  clicked: boolean = false;
  changedSeason: boolean = false;
  filterForm: FormGroup;
  race: any;
  circuitName: string;
  dateRound: string;
  season: any;  
  seasonsList: any[];
  racesList: any[];
  resultsList: any[] =[];
  displayedColumns: string[] = ['position','points', 'driverFirstName', 'driverLastName',  'constructorName'];
  dataSource = new MatTableDataSource<any[]>(this.resultsList);
  public page : number;

  public pageSize = [10, 15, 20];
  public pageIndex = 0;
  public length = 0;
  
  constructor(
    private resultsService: ResultsService,
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.filterForm = this.resultsService.initializeFilterForm();
    this.getSeasons();  
  }

  getSeasons(){
    this.resultsService.getSeasons().subscribe(
      {
        next: data => {
          this.seasonsList = data.MRData.SeasonTable.Seasons;
        },
        error: error => {
          this.snackBar.open('There was an error getting seasons.' , 'Close',{
            duration: 3000
          });
        }
      }
    )
  }

  changeSeason(event)
  {
    if (event.isUserInput) {    // ignore on deselection of the previous option
      this.season = event.source.value;
      this.changedSeason = true;
      this.resultsService.getRaces(this.season).subscribe(
        {
          next: data => {
            this.racesList = data.MRData.RaceTable.Races;
          },
          error: error => {
            this.snackBar.open('There was an error getting races.' , 'Close',{
              duration: 3000
            });
          }
        }
      ) 
    }
  }

  changeRace(event)
  {
    if (event.isUserInput) {  
      this.race = event.source.value;
    }
  }

  onChangePage(pe:PageEvent) {
    this.getResults(pe.pageSize, pe.pageIndex)
  } 

  getResults(pageSize, pageIndex){
    this.clicked = true;
    console.log('pageSize: ',pageSize);
    this.resultsService.getResults(this.season,this.race, pageSize, pageIndex).subscribe(
      {
        next: data => {
          var MRData = data.MRData;
          this.resultsList = MRData.RaceTable.Races[0].Results;
          this.circuitName = MRData.RaceTable.Races[0].Circuit.circuitName;
          this.dateRound = MRData.RaceTable.Races[0].date;
          this.dataSource = new MatTableDataSource<any[]>(this.resultsList);
          this.paginator.pageIndex = pageIndex;
          this.length = Number(MRData.total);
        },
        error: error => {
          this.snackBar.open('There was an error getting results.' , 'Close',{
            duration: 3000
          });
        }
      }
    ) 
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
