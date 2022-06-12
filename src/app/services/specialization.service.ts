import { SafeCall } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { sample } from 'rxjs';
import { Specialization } from '../Specialization';

const SAMPLE_DATA: Specialization[] =  [
  {
    "id" :  1,
    "name" : "first spec",
    "param" : 10
  },
  {
    "id" :  2,
    "name" : "second spec",
    "param" : 10
  },
  {
    "id" :  3,
    "name" : "third spec",
    "param" : 10
  },
  {
    "id" :  4,
    "name" : "fouth spec",
    "param" : 10
  },
  {
    "id" :  5,
    "name" : "fifth spec",
    "param" : 10
  },
  {
    "id" :  6,
    "name" : "six spec",
    "param" : 10
  },
  {
    "id" :  7,
    "name" : "sevens spec",
    "param" : 10
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
