# Tob's Bookmark Manager

This single page application is a managing tool for web links. 

In the current version this bookmark manager allows just the creation of 
new bookmarks and the deletion of those. New bookmarks can be added by 
clicking on the blue button in the top-right corner. To delete a bookmark 
just click the recycle bin icon on the right to each row.

The link in each bookmark is clickable and opens a new browsing context,
which per default leads to a new tab in most browsers.

The bookmarks are persisted in the browser's local storage and so their 
lifetime is bound to specific browsers on specific machines.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20 
and utilises [@ngrx/schematics](https://ngrx.io/guide/schematics).

Generate an entity: `ng g a ActionName -c true -a true`

Generate a component: `ng g c ComponentName` to generate a new component. 

You can also use `ng g directive|pipe|service|class|guard|interface|enum|module` as well as `@ngrx/schematics`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Unit tests are not yet implemented.

## Running end-to-end tests

Integration tests are not yet implemented.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Screenshots

#### Overview  
![Bookmark overview](/docs/overview.png "Bookmark overview")

#### Creating a new bookmark  
![Bookmark form with valid data](/docs/adding_new_bookmark.png "Bookmark form with valid data")  
![Bookmark form with invalid data](/docs/form_validation.png "Bookmark form with invalid data")

#### Sorting bookmarks  
![Bookmark sorted by name ascending](/docs/sorting_asc.png "Bookmark sorted by name ascending")  
![Bookmark sorted by name descending](/docs/sorting_desc.png "Bookmark sorted by name descending")

#### Deleting a bookmark  
![Click delete button](/docs/delete_button.png "Click delete button")  
![Deletion result](/docs/deleted_bookmark.png "Deletion result")
