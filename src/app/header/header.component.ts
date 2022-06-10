import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { RestCallsService } from '../services/rest-calls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  email: string;
  items: MenuItem[];
  activeItem: MenuItem;
  displayModal: boolean = false;
  imageToShow: any;
  isImageLoading: boolean = true;
  uploadUserAvatarUrl: string = environment.API_URL + '/users/me/avatar';

  constructor(
    private router: Router,
    private restCallSer: RestCallsService,
    private route: ActivatedRoute,
    private messageSer: MessageService
  ) {
    this.userName = environment.userName;
    this.email = environment.email;
  }

  ngOnInit(): void {
    this.getImage();

    console.log(this.userName);
    console.log(environment.userName);
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', id: 'dashboard' },
      { label: 'Expenses', icon: 'pi pi-fw pi-minus', id: 'expense' },
      { label: 'Incomes', icon: 'pi pi-fw pi-plus', id: 'income' },
      // { label: 'Settings', icon: 'pi pi-fw pi-cog', id: 'home' },
    ];
    this.activeItem = this.items[0];
  }

  toExpenses(Events: any) {
    console.log(Events);
    this.router.navigate(['expense'], { relativeTo: this.route });
  }

  toIncomes(Events: any) {
    console.log(Events);
    this.router.navigate(['income'], { relativeTo: this.route });
  }

  async signOut() {
    try {
      const res = await this.restCallSer.logOut();
      this.router.navigate(['login']);
    } catch (error) {
      console.log(error);
    }
  }

  activateMenu(tab) {
    console.log(tab);
    console.log(tab.activeItem);
    this.router.navigate([tab.activeItem.id], { relativeTo: this.route });
  }

  changeProfilePhoto(event, element) {
    element.hide(event);
    this.displayModal = true;
  }

  navigateToCPWD(event, element) {
    element.hide(event);
    this.activeItem = {};
    this.router.navigate(['changepwd'], { relativeTo: this.route });
  }

  onBasicUploadAuto(event: any) {
    this.getImage();
  }

  async getImage() {
    try {
      this.isImageLoading = true;
      const data = await this.restCallSer.getUserAvatar();
      if (!data) {
        throw new Error();
      }
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    } catch (error) {
      this.isImageLoading = true;
      console.log(error);
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async deleteAvatar() {
    try {
      const message = await this.restCallSer.deleteUserAvatar();
      if (!message.hasOwnProperty('success')) {
        throw new Error();
      }

      this.messageSer.add({
        severity: 'success',
        summary: 'Success',
        detail: message['success'],
        life: 5000,
      });
      this.imageToShow = null;
      this.isImageLoading = true;
    } catch (error) {
      this.messageSer.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.fail,
        life: 5000,
      });
    }
  }
}
