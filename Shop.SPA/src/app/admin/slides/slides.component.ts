import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { AdminService } from 'src/app/_services/admin.service';
import { UIService } from 'src/app/_services/ui.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {
  displayedColumns = ['action', 'title', 'caption', 'img'];
  dataSource: any[];
  isLoading: boolean;
  file: any;
  title: string;
  caption: string;
  isUploading: boolean;

  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private adminService: AdminService, private uiService: UIService) {}

  ngOnInit() {
    this.isLoading = true;
    this.adminService.getSlides().subscribe(
      (x: []) => {
        this.dataSource = x;
      },
      null,
      () => {
        this.isLoading = false;
      }
    );
  }

  onChange($event) {
    this.file = $event.target.files[0];
  }

  addSlide(form: NgForm) {
    this.isUploading = true;
    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('title', this.title);
    formData.append('caption', this.caption);

    this.adminService.addSlide(formData).subscribe(
      x => {
        this.dataSource.push(x);
      },
      errpr => {
        this.isUploading = false;
        this.uiService.error('Network error');
      },
      () => {
        this.isUploading = false;
        this.table.renderRows();
        this.uiService.success('Added successfull');
        form.resetForm();
      }
    );
  }
  delete(id) {
    this.uiService.confirm('Delete this slide', () => {
      this.adminService.deleteSlide(id).subscribe(
        (x: number) => {
          this.dataSource.splice(this.dataSource.findIndex(x => x.id == id), 1);
          this.uiService.success('Deleted Successfull');
        },
        error => {
          this.uiService.error('Network error');
        },
        () => {
          this.table.renderRows();
        }
      );
    });
  }
}
