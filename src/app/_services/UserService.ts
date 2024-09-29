import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserDTO } from "../models/UserDTO";

@Injectable({
    providedIn:'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9090/startcoding0to1/shopEasy';
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  public updateUserDetails(userDTO: UserDTO): Observable<any> {
    const url = `${this.baseUrl}/user/${userDTO.getUserId}`;
    return this.httpClient.put<any>(url,userDTO,{responseType:"json"}).pipe(
      catchError(error => {
        console.error('Error occurred while updating user details:', error);
        return throwError(() => new Error('Failed to update user details'));
      })
    );
  }
  
  public uploadImg(formData:FormData):Observable<any>{
    const url = `${this.baseUrl}/uploadProfileImg`;
    return this.httpClient.post<any>(url,formData,{responseType:"json"}).pipe(
      catchError(error => {
        console.error('Error occurred while deleting profile image', error);
        return throwError(() => new Error('Failed to delete profile image'));
      })
    );
  }

  public deleteImg(userId:string):Observable<any>{
    const url = `${this.baseUrl}/deleteProfileImg/${userId}`;
    return this.httpClient.get<any>(url,{responseType:"json"}).pipe(
      catchError(error => {
        console.error('Error occurred while uploadding profile image', error);
        return throwError(() => new Error('Failed to upload profile image'));
      })
    );
  }

  public getUsersDetails(userId:string,userType:string):Observable<any>{
    const url = `${this.baseUrl}/userDetails/${userId}`;
    const params = new HttpParams().set('userType', userType);
    return this.httpClient.get<any>(url,{responseType:"json",params:params})
    .pipe(
      catchError(
        error=>{
          console.error(`Error occurred while fetching user details for userId : ${userId}`, error);
          return throwError(() => new Error(`Failed to fetch user details for userId : ${userId}`));
        }
      )
    );
  }
}