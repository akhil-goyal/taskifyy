import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../../shared/services/boards.service';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
  providers: [BoardsService],
})
export class BoardsComponent implements OnInit {
  constructor(private boardsService: BoardsService) {}

  ngOnInit(): void {
    this.boardsService.getBoards().subscribe((res) => {
      console.log('boards', res);
    });
  }
}
