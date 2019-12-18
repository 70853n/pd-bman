import {Component, OnInit, ViewChild} from '@angular/core';
import {bookmarksFeatureKey, BookmarkState, selectAll} from "../../entities/bookmark/redux/bookmark.reducer";
import {createFeatureSelector, select, Store} from "@ngrx/store";
import {MatSort, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs";
import {Bookmark} from "../../entities/bookmark/redux/bookmark.model";
import {map} from "rxjs/operators";
import {loadBookmarks, synchronisedDeleteBookmark} from "../../entities/bookmark/redux/bookmark.actions";

@Component({
  selector: 'app-bookmark-overview',
  templateUrl: './bookmark-overview.component.html',
  styleUrls: ['./bookmark-overview.component.scss']
})
export class BookmarkOverviewComponent implements OnInit {

  @ViewChild(MatSort, {static: true})
  private matSort: MatSort;

  readonly displayedColumns = ["group", "name", "url", "delete"];
  readonly bookmarkDataSource$: Observable<MatTableDataSource<Bookmark>> = this.store.pipe(
      select(createFeatureSelector(bookmarksFeatureKey)),
      select(selectAll),
      map((bookmarks: Bookmark[]) => {
        const dataSource = new MatTableDataSource(bookmarks);
        dataSource.sort = this.matSort;
        return dataSource;
      })
  );

  constructor(private store: Store<BookmarkState>) {
  }

  ngOnInit() {
    this.store.dispatch(loadBookmarks());
  }

  delete(bookmark: Bookmark) {
    this.store.dispatch(synchronisedDeleteBookmark({bookmark}));
  }
}
