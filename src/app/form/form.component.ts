import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule,NgIf } from '@angular/common';
import { SupabaseService,UserData } from '../supabase.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports:[CommonModule,NgIf,ReactiveFormsModule],
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  
myForm!: FormGroup;
languages=['Python','Go','JavaScript','TypeScript','Java','Ruby','php','Rust']
clouds=['DigitalOcean','AWS','Linode','Azure','GCP','Oracle Cloud', 'IBM cloud','Alibaba Cloud', 'Hetzner' ]
editors=['VsCodium', 'Emacs', 'vim', 'Vscode','Pycharm','Jetbrains']
Operatingsystem=['Linux','Mac','Windows']
domains=['Full stack','DevOps','Developer(any stack)','Data analyst','Data Engineering','Data Science','Machine Learning Engineer','AI Enginner','Product Manager','SRE','Independent Consultant','Developer Advocate']


constructor(
  private fb: FormBuilder,
  private supabaseService:SupabaseService){ }

ngOnInit(): void {
  this.myForm=this.fb.group({
    name:['', Validators.required],
    language: ['',Validators.required],
    cloud:['',Validators.required],
    editor:['',Validators.required],
    os:['',Validators.required],
    domain:['',Validators.required],
    message: ['', Validators.required],

  })
}

onSubmit():void{
  if(this.myForm.valid){
    const userData:UserData={
      name: this.myForm.value.name,
      languages: this.myForm.value.language,
      clouds: this.myForm.value.cloud,
      editors: this.myForm.value.editor,
      Operatingsystem: this.myForm.value.os,
      domains:this.myForm.value.domain,
      message: this.myForm.value.message
    };
    this.supabaseService.updateUserData(userData)
    .then(()=>{
      console.log(this.myForm.value);
      console.log('Profile updated successfully')
      this.myForm.reset()
    })
    .then((error:any) => {
        console.error('Error updating data:',error)
    });
}
}
}
