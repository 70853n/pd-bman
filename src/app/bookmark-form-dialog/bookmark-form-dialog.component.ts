import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Bookmark} from "../../redux/bookmark/bookmark.model";
import {Store} from "@ngrx/store";
import {BookmarkState} from "../../redux/bookmark/bookmark.reducer";
import {upsertBookmark} from "../../redux/bookmark/bookmark.actions";

@Component({
  selector: 'app-bookmark-form-dialog',
  templateUrl: './bookmark-form-dialog.component.html',
  styleUrls: ['./bookmark-form-dialog.component.scss']
})
export class BookmarkFormDialogComponent {

  constructor(
      private store: Store<BookmarkState>,
      @Inject(MAT_DIALOG_DATA) private _bookmark: Bookmark
  ) {
  }

  upsertBookmark() {
    this.store.dispatch(upsertBookmark({bookmark: this._bookmark}))
  }

  get bookmark(): Bookmark {
    return this._bookmark;
  }
}
