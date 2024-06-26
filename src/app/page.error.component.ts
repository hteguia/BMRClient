import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `<div class="error-page">
  <h2 class="headline text-danger">500</h2>
  <div class="error-content">
  <h3><i class="fas fa-exclamation-triangle text-danger"></i> Oops! Something went wrong.</h3>
  <p>
  We will work on fixing that right away.
  Meanwhile, you may <a href="../../index.html">return to dashboard</a> or try using the search form.
  </p>
  <form class="search-form">
  <div class="input-group">
  <input type="text" name="search" class="form-control" placeholder="Search">
  <div class="input-group-append">
  <button type="submit" name="submit" class="btn btn-danger"><i class="fas fa-search"></i>
  </button>
  </div>
  </div>
  
  </form>
  </div>
  </div>`
})
export class PageErrorComponent {
  
  
  
}
