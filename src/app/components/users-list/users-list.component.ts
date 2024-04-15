import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {QaListComponent} from "../qa-list/qa-list.component";
import {AddQaComponent} from "../add-qa/add-qa.component";
import {MatDialog} from "@angular/material/dialog";
import {EvaluationListComponent} from "../evaluation-list/evaluation-list.component";
import {EvaluationAssignComponent} from "../evaluation-assign/evaluation-assign.component";



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{

  users!:any;
  constructor(private userService:UserService,private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(value => {
      this.users=value;
    })
  }


  assignEvaluation(idUser: any) {
    const dialogRef = this.dialog.open(EvaluationAssignComponent, {
      width: '80%',
      height:'80%',
      data: { idUser: idUser }
    });
  }
}
