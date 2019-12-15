import {Component, OnInit, ViewChild} from '@angular/core';
import {bookmarksFeatureKey, BookmarkState, selectAll} from "../../redux/bookmark/bookmark.reducer";
import {createFeatureSelector, select, Store} from "@ngrx/store";
import {MatSort, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs";
import {Bookmark} from "../../redux/bookmark/bookmark.model";
import {map} from "rxjs/operators";
import {deleteBookmark, loadBookmarks} from "../../redux/bookmark/bookmark.actions";

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

  delete(id: string) {
    this.store.dispatch(deleteBookmark({id}));
  }
}
