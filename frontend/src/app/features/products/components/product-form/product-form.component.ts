import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productId: number | null = null;
  isEditMode = false;
  loading = false;
  submitted = false;
  error: string | null = null;
  unitOptions: string[] = ['UN', 'KG', 'L', 'M', 'PC']; // Add this line

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Captura o ID da rota
    this.productId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = this.productId !== null;

    // Inicializa formulário com todos os campos do HTML
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: [''], // SKU is not required in the template, so no Validators.required
      description: ['', Validators.required],
      unit: ['UN', Validators.required], // Set a default unit
      price: ['', [Validators.required, Validators.min(0.01)]],
      totalStock: ['', [Validators.required, Validators.min(0)]],
      availableStock: ['', [Validators.required, Validators.min(0)]],
      reservedStock: ['', [Validators.required, Validators.min(0)]],
      activeLocations: ['', [Validators.required, Validators.min(0)]],
      nextDueDate: [''] // nextDueDate is not required in the template
    });

    // Se for edição, carrega produto
    if (this.isEditMode) {
      this.loading = true;
      this.productService.getProduct(this.productId!).pipe(first()).subscribe({
        next: (product) => {
          if (product) {
            // Ensure product object matches form structure for patchValue
            this.productForm.patchValue(product);
          } else {
            this.notificationService.error('Produto não encontrado.');
            this.error = 'Produto não encontrado.';
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading product for edit', err);
          this.notificationService.error('Erro ao carregar produto para edição.');
          this.error = 'Erro ao carregar produto para edição.';
          this.loading = false;
        }
      });
    }
  }

  // Getter conveniente para template
  get f() { return this.productForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.productForm.invalid) {
      this.notificationService.error('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    this.loading = true;
    const product: Product = this.productForm.value;

    const action$ = this.isEditMode
      ? this.productService.updateProduct(this.productId!, product)
      : this.productService.createProduct(product);

    action$.subscribe({
      next: () => {
        const msg = this.isEditMode ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!';
        this.notificationService.success(msg);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(this.isEditMode ? 'Error updating product' : 'Error creating product', err);
        this.error = this.isEditMode
          ? 'Falha ao atualizar produto. Tente novamente.'
          : 'Falha ao criar produto. Tente novamente.';
        this.notificationService.error(this.error); // Show error via notification service
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}