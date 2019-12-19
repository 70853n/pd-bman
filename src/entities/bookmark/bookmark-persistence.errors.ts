import {Bookmark} from "./redux/bookmark.model";
import {CustomErrorBase} from "../../lib/CustomErrorBase";

export class GetBookmarksError extends CustomErrorBase {
  constructor() {
    super('Failed to read bookmarks.');
  }
}

export class SaveBookmarkError extends CustomErrorBase {
  readonly bookmark: Bookmark;


  constructor(bookmark: Bookmark) {
    super(`A technical error occured while saving '${bookmark.name}'`);
    this.bookmark = bookmark;
  }
}

export class DeleteBookmarkError extends CustomErrorBase {
  readonly id: string;

  constructor(id: string) {
    super(`Failed to delete bookmark with id ${id}`);
    this.id = id;
  }
}
