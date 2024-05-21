import { Component } from '@angular/core';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css']
})
export class VoyageListComponent {

  isFilterVisible = true;
  toggleFilterVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }
}
