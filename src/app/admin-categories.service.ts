import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {

  
  constructor(private db: AngularFireDatabase) { }

  
  create(category)
  {
    return this.db.object('/Categories/'+category.key).set({ 'name': category.name});
  }

  update(category)
  {
    this.db.object('/Categories/'+ category.key).update(category);
  
  }

  delete(category){
    this.db.list('/Categories/').remove(category);
  }

  getAll()
  {
    return this.db.list('/Categories');
  }
}
