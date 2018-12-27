import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    let arr = [
      'http://res.cloudinary.com/chigozie391/image/upload/v1545666235/Slider/deer-3840x2160-savanna-sunset-cute-animals-4480.jpg',
      'http://res.cloudinary.com/chigozie391/image/upload/v1545666266/Slider/moon-mow-1366x768-4k-hd-moon-minimalism-iphone-wallpaper-astronaut-13442.jpg',
      'http://res.cloudinary.com/chigozie391/image/upload/v1545666155/Slider/moon-1366x768-planet-4k-17035.jpg'
    ];
  }
}
