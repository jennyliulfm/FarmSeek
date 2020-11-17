import { Component, OnInit } from "@angular/core";
import { City } from "../../models/model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  
  public cities: Array<City> = [];

  constructor() {}

  ngOnInit() {
    this.getCities();
  }

  /**
   * Get City Filter
   */
  getCities() {
    this.cities = [
      {
        id: 1,
        name: "Hobart",
      },
      {
        id: 2,
        name: "Launcston",
      },
      {
        id: 3,
        name: "Devenport",
      },
    ];
  }
}
