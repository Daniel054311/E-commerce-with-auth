import { Component } from '@angular/core';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { AuthErrorMessagePipe } from '../../../../shared/utils/pipes/auth-error-message.pipe';

@Component({
  selector: 'app-sellers-dashboard',
  standalone: true,
  imports: [NavbarComponent,ProductCardComponent,CommonModule,AuthErrorMessagePipe,FooterComponent,ReactiveFormsModule],
  templateUrl: './sellers-dashboard.component.html',
  styleUrl: './sellers-dashboard.component.scss'
})
export class SellersDashboardComponent {
  productForm: FormGroup;
  products: any[] =  [  
    {  
        imageUrl: 'https://www.lovefoodhatewaste.com/sites/default/files/styles/open_graph_image/public/2022-07/Citrus%20fruits.jpg.webp?itok=My_3JoQp',  
        name: 'Product 1',  
        description: 'Description for product 1',  
        price: 29.99  
    },  {  
      imageUrl: 'https://www.lovefoodhatewaste.com/sites/default/files/styles/open_graph_image/public/2022-07/Citrus%20fruits.jpg.webp?itok=My_3JoQp',  
      name: 'Product 1',  
      description: 'Description for product 1',  
      price: 29.99  
  } 
  ]; 
  editMode: boolean = false; 
  editingIndex: number | null = null; 

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg)/)]]
    });
  }

  onSubmit() {
    const productData = this.productForm.value;

    if (this.editMode && this.editingIndex !== null) {
      // Update the existing product
      this.products[this.editingIndex] = productData;
      this.editMode = false;
      this.editingIndex = null;
    } else {
      // Add a new product to the array
      this.products.push(productData);
    }

    // Reset the form after submission
    this.productForm.reset();
  }

  editProduct(index: number) {
    this.editMode = true;
    this.editingIndex = index;
    const product = this.products[index];
    
    // Populate the form with the product data for editing
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    });
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1); // Remove the product from the array
  }
}