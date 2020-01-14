import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditReminderViewComponent } from '../edit-reminder-view/edit-reminder-view.component';

@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private routerservice: RouterService  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('in reminder');
    console.log(id);
    this.dialog.open(EditReminderViewComponent, {
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
