import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePersonRequest } from 'src/app/interfaces/create-person-request';

@Component({
  selector: 'app-dialog-delete-person',
  templateUrl: './dialog-delete-person.component.html',
  styleUrls: ['./dialog-delete-person.component.scss']
})
export class DialogDeletePersonComponent implements OnInit {

  constructor(
    private dialogoReferencia: MatDialogRef<DialogDeletePersonComponent>,
    @Inject(MAT_DIALOG_DATA) public usuarioEliminar: CreatePersonRequest
  ) { }

  ngOnInit(): void {
    
  }
  eliminarPersona() {
    if (this.usuarioEliminar) {
     this.dialogoReferencia.close('eliminar')
    }
  }
}
