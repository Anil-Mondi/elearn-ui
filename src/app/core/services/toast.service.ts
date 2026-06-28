import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  visible = false;

  message = '';

  type:'success' | 'error' = 'success';

  showSuccess(message:string){

    this.type='success';

    this.message=message;

    this.visible=true;

    setTimeout(()=>{

      this.visible=false;

    },3000);

  }

  showError(message:string){

    this.type='error';

    this.message=message;

    this.visible=true;

    setTimeout(()=>{

      this.visible=false;

    },3000);

  }

}