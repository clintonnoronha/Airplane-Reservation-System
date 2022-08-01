import { OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LocalService } from '../local.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;
  isOpen = false;
  buttonHover = false;
  overlayHover = false;

  constructor(private dialog: MatDialog, 
    private localStore: LocalService, 
    private router: Router,
    private lgnDialog: MatDialogRef<LoginComponent>,
    private rgstDialog: MatDialogRef<RegisterComponent>) {

   }

  ngOnInit(): void {
      if(this.localStore.getData('user_id')===null){
          this.isLoggedIn=false;
          this.isAdmin=false;
      }
      else if(this.localStore.getData('user_id')!=null && parseInt(this.localStore.getData('role'))===0) {
          this.isLoggedIn= true;
          this.isAdmin= false;
      }
      else if(this.localStore.getData('user_id')!=null && parseInt(this.localStore.getData('role'))===1) {
        this.isLoggedIn= true;
        this.isAdmin= true;
        this.router.navigateByUrl("/add-flight");
      }
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
    if(!this.lgnDialog) {
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    
    this.lgnDialog = this.dialog.open(LoginComponent, dialogConfig);

    this.lgnDialog.afterClosed().pipe(
      finalize(() => this.lgnDialog = undefined)
    );
  }

  registerDialog() {
    if(!this.rgstDialog) {
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    this.rgstDialog = this.dialog.open(RegisterComponent, dialogConfig);

    this.rgstDialog.afterClosed().pipe(
      finalize(() => this.rgstDialog = undefined)
    );
  }

  logOut() {
    this.localStore.clearData();
    this.isLoggedIn=false;
    this.isAdmin= false;
    this.router.navigateByUrl('/search');  
  }

}