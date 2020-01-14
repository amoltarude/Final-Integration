import { Component, OnInit } from '@angular/core';
import { EditCategoryViewComponent } from '../edit-category-view/edit-category-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-category-opener',
  templateUrl: './edit-category-opener.component.html',
  styleUrls: ['./edit-category-opener.component.css']
})
export class EditCategoryOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private routerservice: RouterService  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('in category');
    console.log(id);
    this.dialog.open(EditCategoryViewComponent, {
      data: {
        id: id
      }
    }).afterClosed().subscribe( result => {
        this.routerservice.routeBack();
    });
  }

  ngOnInit() {
  }

}
