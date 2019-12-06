import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Bookmark} from "../../redux/bookmark/bookmark.model";
import {Store} from "@ngrx/store";
import {BookmarkState} from "../../redux/bookmark/bookmark.reducer";
import {upsertBookmark} from "../../redux/bookmark/bookmark.actions";
import {AbstractControl, FormControl, Validators} from "@angular/forms";
import {BookmarkPersistenceService} from "../../services/bookmark-persistence.service";

@Component({
  selector: 'app-bookmark-form-dialog',
  templateUrl: './bookmark-form-dialog.component.html',
  styleUrls: ['./bookmark-form-dialog.component.scss']
})
export class BookmarkFormDialogComponent {

  private name = new FormControl(this._bookmark.name, Validators.required);
  private url = new FormControl(this._bookmark.url, [Validators.required, urlValidator]);
  private group = new FormControl(this._bookmark.group);

  constructor(
      private store: Store<BookmarkState>,
      @Inject(MAT_DIALOG_DATA) private _bookmark: Bookmark,
      private bookmarkPersistence: BookmarkPersistenceService
  ) {
  }

  upsertBookmark() {
    this._bookmark.name = this.name.value;
    this._bookmark.url = this.url.value;
    this._bookmark.group = this.group.value;

    // TODO: PD-BMAN-16: Use effects
    this.bookmarkPersistence.upsertBookmark(this.bookmark);

    this.store.dispatch(upsertBookmark({bookmark: this.bookmark}));
  }

  get bookmark(): Bookmark {
    return this._bookmark;
  }
}

/**
 * URL regex from @diegoperini
 * @see https://mathiasbynens.be/demo/url-regex
 */
function urlValidator(control: AbstractControl): null | { [key: string]: any } {
  const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x00a1-\xffff0-9]+-?)*[a-z\x00a1-\xffff0-9]+)(?:\.(?:[a-z\x00a1-\xffff0-9]+-?)*[a-z\x00a1-\xffff0-9]+)*(?:\.(?:[a-z\x00a1-\xffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/ius;

  return regex.test(control.value)
      ? null
      : {'urlPattern': 'Please enter a valid url'};
}
