import { Injectable } from '@angular/core';
import { IRegister } from '../models/UserRegister';
import { Ilogin } from '../models/UserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUserDetails } from '../models/userDetails';
import { ILoginResponse, IRegisterResponse } from '../models/User/UserResponse';
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
  public _name!: string
  public isLoggedIn : number = 0;
  RegisterUser(user: IRegister) : void {

    console.log(user);
    this.http.post<IRegisterResponse>("https://localhost:7105/api/auth/register", user).subscribe({
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

  LoginUser(user: Ilogin) : void {
    this.http.post<ILoginResponse>("https://localhost:7105/api/auth/login", user).subscribe(
      (data) => {
        this._phn = data.phone
        this.isLoggedIn = 1;
        this.userId = data.id
        this._name = data.name;
        window.localStorage.setItem("id",data.id);
        
        window.sessionStorage.setItem("token",data.token);
        this.toastr.success('Order good food!','Login Successful!' );
        this.router.navigate(['/home'])
      },
      (error) => { this.toastr.error(error.error), console.log(error) } 
    );
    
  }

  GetUserDetails() : Observable<IUserDetails>{

    const phn = this._phn
    return this.http.get<IUserDetails>(`https://localhost:7105/api/User/profile?phone=${phn}`).pipe(
      tap(user => window.localStorage.setItem("name",user.name)),
      catchError(err => this.handleError(err))
    )
  }


  handleError(error: HttpErrorResponse) : Observable<never> {
    return throwError(error.message || 'server Error');
  }

  haveaccess() : boolean{
    if(window.sessionStorage.getItem("token")){
      return true;
    }
    return false;
  }
  
}


