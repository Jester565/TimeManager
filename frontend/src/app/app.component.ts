import { Component, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'timeManager';

  ngOnInit() {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    
    // Step 1: Create a Chart instance.
    const chart = new Chart({
      container: 'c1', // Specify chart container ID
      width: 600, // Specify chart width
      height: 300, // Specify chart height
    });
    
    // Step 2: Load the data.
    chart.data(data);
    
    // Step 3: Declare the grammar of graphics, draw column chart.
    chart.interval().position('genre*sold');
    
    // Step 4: Render chart.
    chart.render();
  }

  onWidgetChange(evt) {
    console.log("ON widget change: ", evt);
  }
}
