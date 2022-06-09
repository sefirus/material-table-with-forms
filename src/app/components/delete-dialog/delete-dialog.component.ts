import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcedureService } from 'src/app/services/procedure.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass']
})
export class DeleteDialogComponent implements OnInit {
  id: number;
  name: string

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : {id: number, name: string},
    public dialogRef: MatDialogRef<TableComponent>,
    private procedureService : ProcedureService) {
    this.id = data.id;
    this.name = data.name;
   }

  ngOnInit(): void {
  }

  onDeleteProcedure(): void{
    this.procedureService.deleteProcedureById(this.id).subscribe(() => this.dialogRef.close(true));
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
