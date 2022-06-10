import { SafeCall } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { sample } from 'rxjs';
import { Specialization } from '../Specialization';

const SAMPLE_DATA: Specialization[] =  [
  {
    "id" :  1,
    "name" : "first spec"
  },
  {
    "id" :  2,
    "name" : "second spec"
  },
  {
    "id" :  3,
    "name" : "third spec"
  },
  {
    "id" :  4,
    "name" : "fouth spec"
  },
  {
    "id" :  5,
    "name" : "fifth spec"
  },
  {
    "id" :  6,
    "name" : "six spec"
  },
  {
    "id" :  7,
    "name" : "sevens spec"
  }
]


@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor() { }

  getData(): Specialization[] {
    return SAMPLE_DATA;
  }
}
