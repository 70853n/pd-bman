/**
 * Represents a web resource to be saved as a bookmark
 * for future reference.
 */
export interface Bookmark {
  id: string;
  name: string;
  url: string;
  group: string;
}
