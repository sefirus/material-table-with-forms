import { Component, OnInit } from '@angular/core';
import { Procedure } from 'src/app/Procedure';
import { ProcedureService } from 'src/app/services/procedure.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<Procedure> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'cost', 'description', 'duration', 'delete', 'edit'];

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private procedureService: ProcedureService,
    private matDialog: MatDialog) {
      this.updateList();
     }

  private updateList(): void {
    this.procedureService.getProcedures().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort!;
    });
  }

  ngOnInit(): void {
    this.updateList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  onDeleteProcedure(element:any){
    const procedure :Procedure = element as Procedure;

    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
      autoFocus: false,
      data:{
        name: procedure.name,
        id: procedure.id 
      }
    });

    dialogRef.afterClosed().subscribe((reuireReload: boolean) => {if(reuireReload) this.updateList()});
  }

  onEditProcedure(element: any){
    const procedure: Procedure = element as Procedure;
    const dialogRef = this.matDialog.open(EditDialogComponent, {
      data: procedure
    });

    dialogRef.afterClosed().subscribe((reuireReload: boolean) => {if(reuireReload) this.updateList()});
  }

  onNewProcedure(){
    const dialogRef = this.matDialog.open(NewDialogComponent);

    dialogRef.afterClosed().subscribe((reuireReload: boolean) => {if(reuireReload) this.updateList()});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}