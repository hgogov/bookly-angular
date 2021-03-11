import { EditBookComponent } from './edit-book/edit-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "index",
        pathMatch: "full",
    },
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'details/:id',
        component: BookDetailsComponent
    },
    {
        path: 'post',
        component: CreateBookComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'edit/:id',
        component: EditBookComponent
    },
    {
        path: '**',
        component: IndexComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }