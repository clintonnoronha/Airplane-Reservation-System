import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {

  isLoggedIn = false;
  isAdmin = false;
  isOpen = false;
  buttonHover = false;
  overlayHover = false;

  constructor(private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    
  }

  menuEnter() {
    this.overlayHover = true;
  }

  menuLeave() {
    this.overlayHover = false
    setTimeout(() => {
      if (this.buttonHover == false) {
        this.isOpen = false;
      }
    }, 80)
  }

  buttonEnter() {
    this.buttonHover = true;
    setTimeout(() => {
      if (this.isOpen == false) {
        this.isOpen = true;
      }
    })
  }

  buttonLeave() {
    this.buttonHover = false;
    setTimeout(() => {
      if (this.overlayHover == false) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    }, 100)
  }

  loginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(LoginComponent, dialogConfig);
  }

  registerDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  logOut() {
    
  }

}