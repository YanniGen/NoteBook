import { Component, OnInit } from '@angular/core';
import { Page } from '../models/page.model';
import { NotesService } from './../services/notes.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pages = Array<Page>();
  currentPage = 0;
  hasUserClicked = false;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    if (this.notesService.get('notebook')) {
      this.pages = this.notesService.get('notebook');
    }
    if (this.pages.length == 0) {
      this.pages.push({notes: ''});
    }
  }

  addPage() {
    console.log(this.pages);
    this.pages.push({notes: ''});
  }

  updateCurrentPage(i) {
    this.currentPage = i.index;
    this.hasUserClicked = true;
  }

  deletePage() {
    this.pages.splice(this.currentPage, 1);
  }

  saveWorkspace() {
    const value = this.notesService.set('notebook', this.pages);
  }

  onKeypressEvent(event: any, i){
    this.pages[i].notes = event.target.value;
 }

}
