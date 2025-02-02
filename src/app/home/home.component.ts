import {  Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { MealsService } from '../meals.service';
import { Imeal } from '../imeal';
import { Icategories } from '../icategories';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  checkLayout:boolean =false;
  toggle(data:boolean){
    this.dataService.isLayoutClicked = data;
    this.checkLayout = this.dataService.isLayoutClicked;
  }
  public readonly  dataService = inject(DataService);
  clickLayout(){
    this.toggle(true) 
  }

  clickBar:boolean = false;
  @Output()  fireEvent = new EventEmitter();

  sendData(){
    this.clickBar = true;
    this.fireEvent.emit(this.clickBar)
    this.dataService.isLayoutClicked = false;
    this.toggle(false);
  }

  // !*api
  activeCategory:string = 'All'; 
  private readonly mealsService = inject(MealsService);
  meals:Imeal[] = [];
  categories:Icategories[] = [];
  getMeals(){
    this.mealsService.getAllMeals().subscribe({
      next:(res)=>{
       this.meals = res.meals;
       
      },
      error:(err)=>{
       console.log(err);
       
      }
   })
  }

  getCategories(){
    this.mealsService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories  = res.meals;
       
      },
      error:(err)=>{
       console.log(err);
       
      }
     })
  }

  getMealByCat(cat:string){
    this.mealsService.getMealsByCat(cat).subscribe({
      next:(res)=>{
       this.meals =  res.meals;
       
      },
      error:(err)=>{
       console.log(err);
       
      }
     })
  }

  getMyCategory (cat:string){
    this.getMealByCat(cat)
    this.activeCategory = cat;
    
  }

  onCategoryChange(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    
    if (selectedCategory === 'All') {
      this.getMeals(); 
    } else {
      this.getMyCategory(selectedCategory); 
    }
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
  if (category === 'All') {
    this.getMeals();
  } else {
    this.getMyCategory(category);
  }
  }

  ngOnInit(): void {
   
      this.getMeals();
      this.getCategories();
  }

  
}
