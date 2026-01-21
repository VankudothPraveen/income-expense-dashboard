import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-selector.html',
  styleUrl: './property-selector.css'
})
export class PropertySelectorComponent {

  properties: Property[] = [];
  selectedId = 0;

  constructor(private propertyService: PropertyService) {
    this.propertyService.getAll().subscribe(props => {
      this.properties = props;
    });

    this.propertyService.selectedPropertyId$.subscribe(id => {
      this.selectedId = id;
    });
  }

  select(property: Property): void {
    this.propertyService.setSelectedPropertyId(property.id);
  }
}
