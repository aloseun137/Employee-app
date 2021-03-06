
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../employee.service';
import { Router } from '@angular/router';
import { Employee } from './../employee';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  public popoverTitle = 'popovertitle';
  public popoverMessage = 'confirm delete!!!';
  public cancelClicked = true;
  public confirmClicked = 'deleteEmployee(employee.id)';
  title = 'toaster-not';
  employee: Employee;
  updateId: number;
  employees = {};






  constructor(private myService: EmployeeService, private router: Router, private toastr: ToastrService ) {

    }

  ngOnInit(): void {

    $('#submit').click( () => {

      $('.modal').removeClass('in');
      $('.modal').removeClass('show');
      $('.modal').attr('aria-hidden', 'true');
      $('.modal').css('display', 'none');
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');



   });

    this.employee = new Employee();
    this.myService.getEmployee(this.updateId)
    .subscribe(data => {
      this.employee = data.data;
      }, error => console.log(error));

    this.reloadData();
  }

  newEmployee(): void {
    this.employee = new Employee();
  }


  reloadData() {
    this.myService.getEmployeeList().subscribe(data => {
      this.employees = data.data;

    });
  }

  deleteEmployee(id) {
    this.myService.getEmployee(id).subscribe(data => {
      this.title = data.data.first_name;
      this.toastr.success(`${this.title} Deleted !!`);
    }


    );
    this.myService.deleteEmployee(id).subscribe(data => {


    });
    this.reloadData();
    window.location.reload();

  }

  employeeDetails(id: number) {
    this.updateId = id;
    this.employee = new Employee();
    this.myService.getEmployee(id)
    .subscribe(data => {
      this.employee = data.data;
  }, error => console.log(error));

  }


  onSubmit() {

    this.myService.updateEmployee(this.updateId, this.employee).subscribe(data => {
      console.log(data);


      this.title = data.first_name;
      this.reloadData();
      this.toastr.success(`${this.title} Updated successfully !!`);
      window.location.reload();

    });


  }

  onSubmitCreate() {

    const Dom = document.getElementById('addEmployee');
    const DomSubmit = document.getElementById('submit');
    Dom.style.display = 'none';
    Dom.classList.remove('in');
    Dom.classList.remove('modal-backdrop');
    Dom.classList.remove('show');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');


    this.myService.createEmployee(this.employee).subscribe(data => {
      console.log(data);

      this.title = data.first_name;
      this.toastr.success(`${this.title} Added successfully !!`);
      this.reloadData();
      this.router.navigate(['/employees']);
      window.location.reload();


    });


  }





}



