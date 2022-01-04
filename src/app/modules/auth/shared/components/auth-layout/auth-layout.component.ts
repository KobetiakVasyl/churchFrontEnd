import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../../../../../shared/services/local/token.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigateToOverview(): void {
    const churchInfo = JSON.parse(localStorage.getItem('churchInfo') as string);

    const path: string[] = churchInfo
      ? ['', 'overview', churchInfo.id]
      : ['', 'church-selection'];

    this.router.navigate(path);
  }
}
