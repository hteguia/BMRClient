import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `<div class="wrapper">
                <app-navbar></app-navbar>
                <app-menu></app-menu>
                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper">
                  <app-breadcrumb></app-breadcrumb>

                  <!-- Main content -->
                  <section class="content">
                    <div class="container-fluid">
                      <!-- Small boxes (Stat box) -->
                      <div class="row">
                        <div class="col-lg-12 col-12">
                          <router-outlet></router-outlet>
                        </div>          
                      </div>
                      <!-- /.row -->
                    </div><!-- /.container-fluid -->
                  </section>
                  <!-- /.content -->
                </div>
                <!-- /.content-wrapper -->
                <app-footer></app-footer>
              </div>
              <!-- ./wrapper -->`
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    
  }

}
