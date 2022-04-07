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
    this.pages = this.notesService.get('notebook');
  }

  addPage() {
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
