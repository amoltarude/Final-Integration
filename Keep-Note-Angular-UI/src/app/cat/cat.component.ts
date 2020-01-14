import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  constructor(private routerservice: RouterService) {

  }
  @Input()
  category: Category;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  editCategory() {
    const id = this.category.id;
    console.log(this.category);
    this.routerservice.routeToEditCategoryView(id);
  }

}
