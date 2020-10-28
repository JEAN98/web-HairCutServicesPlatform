import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private storageService:LocalStorageService) { }

  ngOnInit(): void {
  }

  onLogout() {
  this.storageService.deleteData();
    this.router.navigate(['/login']);
  }

}
