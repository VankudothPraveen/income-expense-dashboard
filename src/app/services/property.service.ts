import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Property } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {

  private api = 'http://localhost:3000/properties';

  // 0 = All properties
  private selectedPropertyIdSubject = new BehaviorSubject<number>(0);
  readonly selectedPropertyId$ = this.selectedPropertyIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(this.api);
  }

  // ✅ PRIMARY METHOD (used everywhere)
  setSelectedPropertyId(id: number): void {
    this.selectedPropertyIdSubject.next(id);
  }

  // ✅ ALIAS (used by navbar)
  setProperty(id: number): void {
    this.setSelectedPropertyId(id);
  }

  getSelectedPropertyId(): number {
    return this.selectedPropertyIdSubject.value;
  }
}
