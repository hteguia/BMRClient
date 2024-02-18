import { Component, inject} from '@angular/core';
import { UserService } from 'src/app/users/services/user.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  constructor() { 
    
  }

  ngOnInit(): void {
    
  }
}
