import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  imageUrls: IImage[] = [];
  slides: any[];

  constructor(private service: AdminService) {}
  ngOnInit() {
    this.service.getSlides().subscribe(
      (x: []) => {
        this.slides = x;
      },
      null,
      () => {
        this.slides.forEach(element => {
          const slide = {
            url: element.url,
            caption: element.caption === 'undefined' ? '' : element.caption,
            title: element.title === 'undefined' ? '' : element.title
          };
          this.imageUrls.push(slide);
        });
      }
    );
  }
}
