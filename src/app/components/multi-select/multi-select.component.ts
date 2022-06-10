import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Specialization } from 'src/app/Specialization';
import { Named } from 'src/app/NamedEntity'

interface ItemData {
  item : Named,
  selected: boolean;
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.sass']
})
export class MultiSelectComponent implements OnInit {

  @Output() result = new EventEmitter<{ key: string, data: Array<Named>, isChanged: boolean}>();
  
  @Input() placeholder: string = 'Select specializations';
  @Input() data: Array<Named> = [];
  @Input() alreadySelected: Array<Named> = [];
  @Input() key: string = '';
  
  selectControl = new FormControl();
  
  rawData: Array<ItemData> = [];
  selectData: Array<ItemData> = [];
  
  filteredData: Observable<Array<ItemData>>;
  filterString: string = '';

  constructor() {
    this.filteredData = this.selectControl.valueChanges.pipe(
      startWith<string>(''),
      map(value => typeof value === 'string' ? value : this.filterString),
      map(filter => this.filter(filter))
    );    
  }

  //this.rawData.push({ item, selected: this.alreadySelected.includes(item) }
  ngOnInit(): void {
    if(this.alreadySelected == undefined) this.alreadySelected = [];
    this.data.forEach((item: Specialization) => {
      this.rawData.push({ item, selected: false });
      if(this.alreadySelected.length > 0 && this.alreadySelected.find((as) => as.id === item.id)){
        this.toggleSelection(this.rawData[this.rawData.length - 1], true);
      }
    });
  }

  ngAfterViewInit(): void{
  }

  filter(filter: string): Array<ItemData>{
    this.filterString = filter;
    if (filter.length > 0) {
      return this.rawData.filter(option => {
        return option.item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.rawData.slice();
    }
  };
  
  displayFn = (): string => '';

  optionClicked = (event: Event, data: ItemData): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };

  toggleSelection(data: ItemData, initializing: boolean = false): void {
    data.selected = !data.selected;
  
    if (data.selected === true) {
      this.selectData.push(data);
    } else {
      const i = this.selectData.findIndex(value => value.item === data.item);
      this.selectData.splice(i, 1);
    }
  
    this.selectControl.setValue(this.selectData);
    if(!initializing) this.emitAdjustedData();
  };

  emitAdjustedData = (): void => {
    const results: Array<Named> = []
    this.selectData.forEach((data: ItemData) => {
      results.push(data.item);
    });
    this.result.emit({ key: this.key, data: results, isChanged: true });
  };

  removeChip = (data: ItemData): void => {
    this.toggleSelection(data);
  };

}
