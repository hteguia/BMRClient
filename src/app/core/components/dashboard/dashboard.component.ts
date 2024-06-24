import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from '../../../state/root-action';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CollaboraterModel } from 'src/app/users/users.model';
import { CoreService } from '../../core.service';
import { Chart } from 'chart.js/auto'; // Import the 'Chart' class from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboardService = inject(CoreService) 
  private authService = inject(AuthService);
  

  topups$!: Observable<CollaboraterModel[]>;

  dashboardData!: any;
  currentUser: any;

  constructor(private store: Store,private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.dashboardService.getDashboardData().pipe(
      tap((data:any) => {this.dashboardData = data; this.renderStudentsChart(data.student)})
    ).subscribe();

    this.setBreadcrump();

    this.currentUser = this.authService.userProfil;
  }

  private setBreadcrump():void{
    this.store.dispatch(changeBreadcrump(
      {
        title: "Dashboard", 
        links:[
          { title:"Home", link:"/" }, 
          { title:"Dashboard", link:"/" }
        ]
      }));
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }

  renderStudentsChart(data:[]): void {
    const custmData = this.aggregateDataByMonth(data);
    const ctx = (document.getElementById('studentsChart') as HTMLCanvasElement)//.getContext('2d');
    const studentsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [{
          label: 'Nombre d\'étudiants inscrits',
          data:  custmData.map(item => item['count']),// [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], // Remplacez ces valeurs par vos données réelles
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private aggregateDataByMonth(data:any){
    // Fonction pour convertir une date en chaîne de mois (YYYY-MM)
    const toMonthString = (date:any) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    };
    
    // Regrouper par mois et agréger les valeurs
    const groupedByMonth = data.reduce((acc:any, { createAt, value }:any) => {
      const month = toMonthString(createAt);
      if (!acc[month]) {
        acc[month] = { month, totalValue: 0, count: 0 };
      }
      acc[month].totalValue += value;
      acc[month].count += 1;
      return acc;
    }, {});

    // S'assurer que chaque mois de l'année est représenté
    const months = Object.keys(groupedByMonth);
    const currentYear = new Date().getFullYear();
    const allMonths = Array.from({ length: 12 }, (_, i) => `${currentYear}-${String(i + 1).padStart(2, '0')}`);

    const finalTable = allMonths.map(month => {
      return groupedByMonth[month] || { month, totalValue: 0, count: 0 };
    });
    
    return finalTable;
  }
}
