import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProductCardComponent } from '../common/product-card/product-card.component';
import { ProductResponse } from '../models/product.types';
import { ProductService } from '../service/product.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CommonModule,FooterComponent,RouterOutlet,ProductCardComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{

 protected products: ProductResponse[] = [];
 private destroy$ = new Subject<void>();

  constructor(private readonly productService:ProductService){}

  ngOnInit(): void {
      this.getAllProducts();
  }

  private getAllProducts(){
    this.productService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
        next:(res) =>{
        this.products = res;
        },
        error:()=>{

        }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }
}
