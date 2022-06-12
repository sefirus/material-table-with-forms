import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Procedure } from 'src/app/Procedure';
import { ProcedureService } from 'src/app/services/procedure.service';
import { SpecializationService } from 'src/app/services/specialization.service';
import { Specialization } from 'src/app/Specialization';
import { TableComponent } from '../table/table.component';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent implements OnInit {

  specializations: Specialization[] = [];
  selectedSpec: Specialization[] = [];
  isSelectionChanged: boolean = false;

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : Procedure,
    public dialogRef: MatDialogRef<TableComponent>,
    private procedureService : ProcedureService,
    private specService : SpecializationService) {  
      this.specializations = specService.getData();
    }

  form = new FormGroup({
    name: new FormControl("", Validators.minLength(5)),
    description: new FormControl("", Validators.minLength(5)),
    cost: new FormControl(0, Validators.min(1)),
    duration: new FormControl(0, Validators.min(1))
  });

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  onSaveForm(): void{
    this.data.name = this.form.value.name!;
    this.data.description = this.form.value.description!;
    this.data.cost = this.form.value.cost!;
    this.data.duration = this.form.value.duration!;
    this.data.specializations = this.selectedSpec;
    this.procedureService.updateProcedure(this.data).subscribe(() => this.dialogRef.close(true));
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onMultiSelectSubmit(event : any) : void{
    console.log(...event.data);
    this.selectedSpec = [...event.data ] as Specialization[];
    this.isSelectionChanged = event.isChanged;
  }

  isButtonEnabled(): boolean{
    return this.form.valid && (this.form.dirty || this.isSelectionChanged); 
  }
}
