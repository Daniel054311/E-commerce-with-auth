import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { ToasterComponent } from '../../../../shared/components/toaster/toaster.component';
import { getErrorMessage } from '../../../../shared/utils/error.util';
import { AuthErrorMessagePipe } from '../../../../shared/utils/pipes/auth-error-message.pipe';
import { ProductResponse } from '../../models/product.types';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-sellers-dashboard',
  standalone: true,
  imports: [NavbarComponent,ToasterComponent,CommonModule,AuthErrorMessagePipe,FooterComponent,ReactiveFormsModule],
  templateUrl: './sellers-dashboard.component.html',
  styleUrl: './sellers-dashboard.component.scss'
})
export class SellersDashboardComponent implements OnDestroy, OnInit {
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  public productForm: FormGroup;
 public products: ProductResponse[] =  [ ];
  public editMode: boolean = false;
  private readonly porductId = signal<string>('');
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,private readonly productService: ProductService) {

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg)/)]]
    });
  }


  ngOnInit(): void {
    this.getAllUserProducts();
  }

  public onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.editMode) {
        this.updateProduct(product);
      } else {
        this.createProduct(product);
      }
    }
  }

  public createProduct(product: ProductResponse) {
      this.productService.createProduct(product).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.getAllUserProducts();
          this.productForm.reset();
          this.toaster.showToast({
            message: 'Registration successful!',
            type: 'success',
            duration: 3000
          });
        },
        error: (error) => {
          const errorMessage = getErrorMessage(error);
          this.toaster.showToast({
            message: errorMessage || 'Failed to create product. Please try again.',
            type: 'error',
            duration: 5000
          });
        }
      });
  }

  private getAllUserProducts() {
    this.productService.getUserProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (error) => {
        const errorMessage = getErrorMessage(error);
        this.toaster.showToast({
          message: errorMessage || 'Failed to fetch products. Please try again.',
          type: 'error',
          duration: 5000
        });
      }
    });
  }

  public editProduct(product: ProductResponse) {
    this.editMode = true;
    this.productForm.patchValue(product);
    this.porductId.set(product.id);
  }

  public updateProduct(product: ProductResponse) {
    const updatedProduct = {
      ...product,
      id: this.porductId()
    };
      this.productService.updateProduct(updatedProduct).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.products = this.products.map(p => p.id === product.id ? product : p);
          this.productForm.reset();
          this.editMode = false;
          this.toaster.showToast({
            message: 'Product updated successfully!',
            type: 'success',
            duration: 3000
          });
        },
        error: (error) => {
          const errorMessage = getErrorMessage(error);
          this.toaster.showToast({
            message: errorMessage || 'Failed to update product. Please try again.',
            type: 'error',
            duration: 5000
          });
        }
      });

  }

  public deleteProduct(id: string) {
    this.productService.deleteProduct(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.products = this.products.filter(p => p.id !== id);
        this.toaster.showToast({
          message: 'Product deleted successfully!',
          type: 'success',
          duration: 3000
        });
      },
      error: (error) => {
        const errorMessage = getErrorMessage(error);
        this.toaster.showToast({
          message: errorMessage || 'Failed to delete product. Please try again.',
          type: 'error',
          duration: 5000
        });
      }
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
