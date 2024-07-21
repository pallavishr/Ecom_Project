import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { ProductService } from './product.service';
// import {trendyProducts}
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError     = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  } 
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login){
   this.http.get(`http://localhost:3000/seller`,
   {observe:'response'}).subscribe((result:any)=>{
    // console.log('result----> ',result)
    console.log('result-->',result.body.filter((x:any)=>{x?.email==data?.email}))
    if (result?.status==200)
      {
        
      }
    
    if(result && result?.body && result?.body){
      this.isLoginError.emit(false)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed");
      this.isLoginError.emit(true)
    }
   })
  }
}


