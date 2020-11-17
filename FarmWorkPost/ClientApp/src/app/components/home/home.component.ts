import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { Job } from "../..//models/model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public jobs: Array<Job> = [];
  public activePage: number = 4;
  public activePages: Array<number> = new Array<number>(7);

  constructor() {}

  ngOnInit() {
    this.getJobs();
    this.getActivePages();
  }

  /**
   * get jobs
   */
  getJobs() {
    this.jobs = [
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
      {
        jobId: 1,
        title: "Cherry Picker",
        location: "Hobart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temporinc ididunt ut dolore magna aliqua.",
      },
    ];
  }

  /**
   *
   */
  getActivePages() {
    if (this.activePage >= 4) {
      this.activePages[0] = this.activePage - 3;
      this.activePages[1] = this.activePage - 2;
      this.activePages[2] = this.activePage - 1;
      this.activePages[3] = this.activePage;
      this.activePages[4] = this.activePage + 1;
      this.activePages[5] = this.activePage + 2;
      this.activePages[6] = this.activePage + 3;
    }
  }

  /**
   *
   */
  setActivatePage(page: number) {
    this.activePage = page;
    /**update active page array */
    this.getActivePages();
  }

  /** */
}
