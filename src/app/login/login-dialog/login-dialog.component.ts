import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(private router: Router,   private dialogRef: MatDialogRef<LoginDialogComponent>,) { }

  ngOnInit(): void {
  }

  navigate(): void{
    this.router.navigate(['/map']);
    this.dialogRef.close();
  }

}
