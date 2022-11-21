import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePersonRequest } from 'src/app/interfaces/create-person-request';
import { PersonDTO } from 'src/app/interfaces/person-dto';
import { PersonService } from 'src/app/services/person.service';
import { DialogDeletePersonComponent } from '../modals/dialog-delete-person/dialog-delete-person.component';
import { DialogPersonComponent } from '../modals/dialog-person/dialog-person.component';

const ELEMENT_DATA: PersonDTO[] = [];

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['fullName','documentTypeId', 'documentNumber','email', 'createdDate', 'active', 'acciones'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _personService: PersonService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.viewPerson();
    console.log(this.dataSource.data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewPerson(){
    this._personService.getPerson().subscribe({
      next: (data) => {
        console.log(data)
        if(data.status){
          this.dataSource.data = data.result;
          console.log(this.dataSource.filter);
        }else{

        }
      }
    })
  }

  agregarUsuario() {
    this.dialog.open(DialogPersonComponent, {
        disableClose: true
      }).afterClosed().subscribe(result => {
        
        if (result === "agregado") {
            this.viewPerson();
        }
      });
  }

  editarUsuario(person: CreatePersonRequest) {
    this.dialog.open(DialogPersonComponent, {
      disableClose: true,
      data: person
    }).afterClosed().subscribe(result => {
      
      if (result === "editado")
        this.viewPerson();

    });
  }

  deletePerson(person: CreatePersonRequest) {
    this.dialog.open(DialogDeletePersonComponent, {
      disableClose: true,
      data: person
    }).afterClosed().subscribe(result => {
      
      if (result === "eliminar") {

        this._personService.deletePerson(person.id).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta(data.message, "Listo!")
              this.viewPerson();
            } else {
              this.mostrarAlerta(data.message, "Error");
            }

          },
          error: (e) => {
          },
          complete: () => {
          }
        })

      }
        

    });
  }

  mostrarAlerta(mensaje:string,tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }

}
