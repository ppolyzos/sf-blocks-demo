import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Service Fabric Demo - Upgrade';
  stats = {
    total: 0,
    avg: 0
  };

  apiUrl = 'http://sf-azure.westeurope.cloudapp.azure.com/api/colors';

  blocks = Array(100).fill(1).map((x, i) => {
    return {
      index: i,
      color: undefined,
    };
  });

  constructor(private _http: Http) { }

  ngOnInit() {
    this.setupBlocks();
  }

  setupBlocks = () => {
    this.blocks.forEach((block) => {
      const interval = Math.floor((Math.random() * 5000) + 1000);
      setInterval(() => {
        this.updateColor(block);
      }, interval);
    });
  }

  updateColor(item) {
    this._http.get(this.apiUrl)
      .map(res => res.json())
      .subscribe(r => {
        item.color = r.color;
        this.stats.total++;
      });
  }
}
