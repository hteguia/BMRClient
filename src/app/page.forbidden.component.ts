import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `<div class="error-page">
  <h2 class="headline text-danger">403</h2>
  <div class="error-content">
  <h3><i class="fas fa-exclamation-triangle text-danger"></i> Oops! Quelque chose s'est mal passé.</h3>
  <p>
  Vous êtes pas autorisé a accéder a cette ressources.
  Vous pouvez <a routerLink="/dashboard">retourner sur le dashborad</a> ou contacter l'administrateur.
  </p>
  
  </div>
  </div>`
})
export class PageForbiddenComponent {
  
  
  
}
