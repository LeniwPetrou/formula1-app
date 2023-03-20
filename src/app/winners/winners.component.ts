import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResultsService } from '../services/results.service';
import { WinnersService } from '../services/winners.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html'
})
export class WinnersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['position','points', 'driverFirstName', 'driverLastName',  'constructorName'];
  public pageSize = 10;
  public pageIndex = 0;
  public length = 0;
  public array: any;
  seasonsList: any[];
  driverStandingsList: any[] = [];
  season: string;
  dataSource = new MatTableDataSource<any[]>(this.driverStandingsList);
  filterForm: FormGroup;
  clicked: boolean = false;
  data: any;

  constructor(
    private resultsService: ResultsService,
    private winnersService: WinnersService,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit(): void {
    this.filterForm = this.resultsService.initializeFilterForm();
    this.getSeasons();
  }

  onChangePage(pe:PageEvent) {
    this.getDriverStandings(pe.pageSize, pe.pageIndex)
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
      this.clicked = true;
      this.season = event.source.value;
      this.getDriverStandings(this.pageSize, this.pageIndex);
    }  
  }

  getDriverStandings(pageSize, pageIndex){
    this.winnersService.getDriverStandings(pageSize, pageIndex, this.season).subscribe(
      {
        next: data => {
          var MRData = data.MRData;
          this.driverStandingsList = MRData.StandingsTable.StandingsLists[0].DriverStandings;
          this.dataSource = new MatTableDataSource<any[]>(this.driverStandingsList);
          this.paginator.pageIndex = pageIndex;
          this.length = Number(MRData.total);
        },
        error: error => {
          this.snackBar.open('There was an error getting driver standings.' , 'Close',{
            duration: 3000
          });
        }
      }
    ) 
  }
}
  
