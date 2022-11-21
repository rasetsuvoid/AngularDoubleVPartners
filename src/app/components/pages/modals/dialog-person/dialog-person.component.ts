import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatePersonRequest } from 'src/app/interfaces/create-person-request';
import { DocumentTypeDTO } from 'src/app/interfaces/document-type-dto';
import { DocumentTypesService } from 'src/app/services/document-types.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit, AfterViewInit {
  formUsuario: FormGroup;
  hide: boolean = true;
  accion: string = "Agregar"
  accionBoton: string = "Guardar";
  listaDocumentTypes: DocumentTypeDTO[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public personEditar: CreatePersonRequest,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,

    private _personService: PersonService,
    private _documentTypeService: DocumentTypesService

  ) {

    this.formUsuario = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      documentTypeId: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', Validators.required],
      active: ['', Validators.required]
    })

    if (this.personEditar) {
      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    }

    this._documentTypeService.getAllDocumentTypes().subscribe({
      next: (data) => {
        if(data.status){
          this.listaDocumentTypes = data.result;

          if(this.personEditar){
            this.formUsuario.patchValue({
              documentTypeId: this.personEditar.documentTypeId
            })
          }
        }
      },
      error: (e) => {
      },
      complete: () => {
      }
    })


  }

  ngOnInit(): void {
    if (this.personEditar) {
      this.formUsuario.patchValue({
        id: this.personEditar.id,
        firstName: this.personEditar.firstName,
        lastName: this.personEditar.lastName,
        documentTypeId: this.personEditar.documentTypeId,
        documentNumber: this.personEditar.documentNumber,
        email: this.personEditar.email,
        active: this.personEditar.active
      })
    }
  }
  ngAfterViewInit() {

  }

  addOrEditPerson() {

    const _person: CreatePersonRequest = {
      active: this.formUsuario.value.active,
      documentNumber: this.formUsuario.value.documentNumber,
      documentTypeId: this.formUsuario.value.documentTypeId,
      email: this.formUsuario.value.email,
      firstName: this.formUsuario.value.firstName,
      lastName: this.formUsuario.value.lastName,
      id: this.formUsuario.value.id

    }

    if(this.personEditar){
      this._personService.editPerson(_person).subscribe({
        next: (data)=>{
          if(data.status){
            this.mostrarAlerta(data.message, "Exito");
            this.dialogoReferencia.close('editado')
          }else{
            this.mostrarAlerta(data.message, "Error");
          }
        }
      })
    }else{

      this._personService.savePerson(_person).subscribe({
        next: (data) =>{
          if(data.status){
            this.mostrarAlerta(data.message, "Exito");
            this.dialogoReferencia.close('agregado');
          }else{
            this.mostrarAlerta(data.message, "Error");
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () =>{
  
        }
      })
    }



    
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
