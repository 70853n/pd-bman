import uuid from 'uuid/v4';
import {Component} from '@angular/core';
import {MatDialog} from "@angular/material";
import {BookmarkFormDialogComponent} from "./bookmark-form-dialog/bookmark-form-dialog.component";
import {Bookmark} from "../redux/bookmark/bookmark.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tob\'s Bookmark Manager';

  constructor(private matDialog: MatDialog) {
  }

  showNewBookmarkForm() {
    const newBookmark: Bookmark = {
      id: uuid(),
      name: null,
      url: null,
      group: null
    }
    this.matDialog.open(BookmarkFormDialogComponent, {data: newBookmark});
  }
}
