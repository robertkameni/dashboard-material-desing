import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second hand', 'Refurbished'];

  productForm!: FormGroup;
  actionBtn: string = 'save';

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'update';
      this.productForm.get('productName')?.setValue(this.editData.productName);
      this.productForm.get('category')?.setValue(this.editData.category);
      this.productForm.get('freshness')?.setValue(this.editData.freshness);
      this.productForm.get('price')?.setValue(this.editData.price);
      this.productForm.get('comment')?.setValue(this.editData.comment);
      this.productForm.get('date')?.setValue(this.editData.date);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.productService.addProduct(this.productForm.value).subscribe({
          next: () => {
            alert('product added successfully'),
              this.productForm.reset(),
              this.dialogRef.close('save');
          },
          error: (err) => alert(err),
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productService
      .updateProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: () => {
          alert('product updated successfully'),
            this.productForm.reset(),
            this.dialogRef.close('update');
        },
        error: (err) => alert('Error while updating the product'),
      });
  }
}
