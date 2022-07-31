import { OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  constructor(private dialog: MatDialog, private localStore: LocalService) {

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
    this.localStore.clearData();
    this.isLoggedIn=false;
    this.isAdmin= false;
    // window.location.reload();   
  }

}