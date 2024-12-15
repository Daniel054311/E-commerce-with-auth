import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProductCardComponent } from '../common/product-card/product-card.component';
import { ProductResponse } from '../models/product.types';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CommonModule,FooterComponent,RouterOutlet,ProductCardComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

 protected products: ProductResponse[] = [];

  constructor(private readonly productService:ProductService){}

  ngOnInit(): void {
      this.getAllProducts();
  }

  private getAllProducts(){
    this.productService.getAllProducts().subscribe({
        next:(res) =>{
        this.products = res;
        console.log(res)
        },
        error:()=>{

        }
    })
  }

}
