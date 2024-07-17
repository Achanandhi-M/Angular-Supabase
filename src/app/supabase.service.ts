import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import {
  createClient,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'

export interface UserData{
  id?: string,
  name: string;
  languages: string;
  clouds: string;
  editors: string;
  Operatingsystem: string;
  domains:string;
  message:string;
}
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
private supabase:SupabaseClient;
  constructor() { 
    this.supabase=createClient(environment.supabaseUrl, environment.supabaseKey);
  }


updateUserData(userData:UserData){
  const update={
    ...userData,
    created_at:new Date(),
  };
  return this.supabase.from('userData').upsert(update)
}
}