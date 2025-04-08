import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

interface ItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  value: FormControl<number>;
}

export type CustomFormGroup = FormGroup<ItemForm>;

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-forms';
  protected fb = inject(NonNullableFormBuilder);
  protected form: FormGroup<{ items: FormArray<CustomFormGroup> }> =
    this.fb.group({
      items: this.fb.array<CustomFormGroup>([]),
    });
  protected items = signal(this.form.controls.items);

  addItems() {
    const id = this.items.length + 1;
    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', {validators: [Validators.required]}),
      value: this.fb.control(0, {validators: [Validators.required]}),
    })
    this.form.controls.items.push(itemForm);
    this.items.set(this.form.controls.items);
  }
}
