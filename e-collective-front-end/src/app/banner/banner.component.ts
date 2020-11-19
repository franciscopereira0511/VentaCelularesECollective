import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef <BannerComponent>,
  ) { }

  ngOnInit() {}

  

}
