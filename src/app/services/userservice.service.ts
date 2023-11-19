import { Injectable } from '@angular/core';
import { IRegister } from '../models/UserRegister';
import { Ilogin } from '../models/UserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {


  
  public userId! : string
  constructor(private http: HttpClient,
    private router: Router,
    private toastr : ToastrService) {


  }

  public _phn!: number
  private _name!: string
  public isLoggedIn : number = 0;
  RegisterUser(user: IRegister) {

    console.log(user);
    this.http.post<any>("https://localhost:7105/api/auth/register", user).subscribe({
      next: (data => {
        this.userId = data.id;
        window.localStorage.setItem("id",this.userId);
        console.log(this.userId)
        this.toastr.success('Register Successful!','Please Login!');
      }),
      error: (err => {
        // alert("registeration failed");
        this.toastr.error('Register failed!','Please Try again!');
      })
    })
  }

  LoginUser(user: Ilogin) {
    this.http.post<any>("https://localhost:7105/api/auth/login", user).subscribe(
      (data) => {
        this._phn = data.phone
        this.isLoggedIn = 1;
        this.userId = data.id
        window.localStorage.setItem("id",data.id);
        console.log("wbcwiu",this.userId)
        window.localStorage.setItem("nophe",String(data.phone))
        
        window.sessionStorage.setItem("token",data.token);
        this.toastr.success('Order good food!','Login Successful!' );
        this.router.navigate(['/home'])
      },
      (error) => { this.toastr.error(error.error), console.log(error) } 
    );
    
  }

  GetUserDetails() : Observable<any>{

    const phn = window.localStorage.getItem("nophe")
    return this.http.get<any>(`https://localhost:7105/api/User/profile?phone=${phn}`).pipe(
      tap(user => window.localStorage.setItem("name",user.name)),
      catchError(err => this.handleError(err))
    )
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  
}


