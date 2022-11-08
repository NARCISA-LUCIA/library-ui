import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  onClose(): void{
    this.dialogRef.close();
  }
}
