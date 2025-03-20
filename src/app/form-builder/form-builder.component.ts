import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

interface FormElement {
  id: number;
  elementId: string;
  type: 'input' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder: string;
  options?: string[];
  required?: boolean;
  position: {
    row: number;
    column: number;
    width: number; // 1-12 grid system
  };
}

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    FileUploadModule,
    TabViewModule,
    RadioButtonModule,
    CheckboxModule
  ],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  providers: [MessageService],
})
export class FormBuilderComponent implements OnInit {
  formElements: FormElement[] = [];
  activeElement: number | null = null;
  formTitle = 'My Form';
  formDescription = 'Form Description';
  formFileName = 'my-form';
  draggedElement: number | null = null;
  dragOverElement: number | null = null;
  dragPosition: 'left' | 'right' | 'top' | 'bottom' | null = null;
  formData: Record<string, any> = {};
  showFormData = false;
  showSaveDialog = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.reorganizeGrid();
  }

  reorganizeGrid(): void {
    if (this.formElements.length === 0) return;

    const sortedElements = [...this.formElements].sort((a, b) => {
      if (a.position.row !== b.position.row) {
        return a.position.row - b.position.row;
      }
      return a.position.column - b.position.column;
    });

    const newElements = sortedElements.map((element, index) => {
      if (index === 0) return element;

      const prevElement = sortedElements[index - 1];

      if (
        element.position.row === prevElement.position.row &&
        element.position.column < prevElement.position.column + prevElement.position.width
      ) {
        return {
          ...element,
          position: {
            ...element.position,
            column: prevElement.position.column + prevElement.position.width,
          },
        };
      }

      return element;
    });

    this.formElements = newElements;
  }

  handleDragStart(event: DragEvent, type: 'input' | 'select' | 'checkbox' | 'radio'): void {
    event.dataTransfer?.setData('elementType', type);
    event.dataTransfer!.effectAllowed = 'copy';
  }

  handleElementDragStart(event: DragEvent, id: number): void {
    event.stopPropagation();
    this.draggedElement = id;
    event.dataTransfer?.setData('elementId', id.toString());
    event.dataTransfer!.effectAllowed = 'move';
  }

  handleElementDragOver(event: DragEvent, id: number): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.draggedElement === null || this.draggedElement === id) return;

    this.dragOverElement = id;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const relativeX = x / rect.width;
    const relativeY = y / rect.height;

    if (relativeX < 0.3) {
      this.dragPosition = 'left';
    } else if (relativeX > 0.7) {
      this.dragPosition = 'right';
    } else if (relativeY < 0.5) {
      this.dragPosition = 'top';
    } else {
      this.dragPosition = 'bottom';
    }
  }

  handleElementDragLeave(): void {
    this.dragOverElement = null;
    this.dragPosition = null;
  }

  handleElementDrop(event: DragEvent, targetId: number): void {
    event.preventDefault();
    event.stopPropagation();

    const elementId = event.dataTransfer?.getData('elementId');

    if (!elementId) return;

    const sourceId = Number.parseInt(elementId);
    if (sourceId === targetId) return;

    const sourceIndex = this.formElements.findIndex((el) => el.id === sourceId);
    const targetIndex = this.formElements.findIndex((el) => el.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const sourceElement = { ...this.formElements[sourceIndex] };
    const targetElement = { ...this.formElements[targetIndex] };

    const newElements = [...this.formElements];

    if (this.dragPosition === 'left') {
      sourceElement.position = {
        ...sourceElement.position,
        row: targetElement.position.row,
        column: Math.max(1, targetElement.position.column - sourceElement.position.width),
      };
    } else if (this.dragPosition === 'right') {
      sourceElement.position = {
        ...sourceElement.position,
        row: targetElement.position.row,
        column: targetElement.position.column + targetElement.position.width,
      };
    } else if (this.dragPosition === 'top') {
      sourceElement.position = {
        ...sourceElement.position,
        row: Math.max(1, targetElement.position.row - 1),
        column: targetElement.position.column,
      };
    } else {
      sourceElement.position = {
        ...sourceElement.position,
        row: targetElement.position.row + 1,
        column: targetElement.position.column,
      };
    }

    newElements[sourceIndex] = sourceElement;

    this.formElements = newElements;
    this.reorganizeGrid();

    this.draggedElement = null;
    this.dragOverElement = null;
    this.dragPosition = null;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();

    const elementId = event.dataTransfer?.getData('elementId');
    if (elementId) {
      this.draggedElement = null;
      return;
    }

    const type = event.dataTransfer?.getData('elementType') as 'input' | 'select' | 'checkbox' | 'radio';
    if (!type) return;

    const uniqueId = Date.now();

    let dropRow = 1;
    const dropColumn = 1;

    if (this.formElements.length > 0) {
      dropRow = Math.max(...this.formElements.map((el) => el.position.row)) + 1;
    }

    const newElement: FormElement = {
      id: uniqueId,
      elementId: `element_${uniqueId}`,
      type,
      label:
        type === 'input'
          ? 'New Input Field'
          : type === 'select'
          ? 'New Select Field'
          : type === 'checkbox'
          ? 'New Checkbox'
          : 'New Radio Group',
      placeholder: type === 'input' ? 'Enter text...' : type === 'select' ? 'Select an option...' : '',
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2', 'Option 3'] : undefined,
      required: false,
      position: {
        row: dropRow,
        column: dropColumn,
        width: 12,
      },
    };

    this.formElements = [...this.formElements, newElement];
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  updateElement(id: number, updates: Partial<FormElement>): void {
    this.formElements = this.formElements.map((el) => (el.id === id ? { ...el, ...updates } : el));
  }

  deleteElement(id: number): void {
    this.formElements = this.formElements.filter((el) => el.id !== id);
    if (this.activeElement === id) {
      this.activeElement = null;
    }
  }

  updateElementWidth(id: number, width: number): void {
    this.updateElement(id, {
      position: {
        ...this.formElements.find((el) => el.id === id)!.position,
        width: Math.min(Math.max(1, width), 12),
      },
    });
  }

  getColumnClass(width: number): string {
    return `col-${Math.min(Math.max(1, width), 12)}`;
  }

  handleFormSubmit(event: Event): void {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const data: Record<string, any> = {};
    this.formElements.forEach((element) => {
      if (element.type === 'checkbox') {
        data[element.elementId] = formData.get(element.elementId) === 'on';
      } else if (element.type === 'radio') {
        data[element.elementId] = formData.get(element.elementId);
      } else {
        data[element.elementId] = formData.get(element.elementId);
      }
    });

    this.formData = data;
    this.showFormData = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Form Submitted',
      detail: 'Form data has been captured successfully.',
    });
  }

  saveFormConfig(): void {
    const formConfig = {
      title: this.formTitle,
      description: this.formDescription,
      fileName: this.formFileName,
      elements: this.formElements,
    };

    // Simulación de guardado
    this.messageService.add({
      severity: 'success',
      summary: 'Form Saved',
      detail: 'Form configuration has been saved successfully.',
    });
    this.showSaveDialog = false;
  }

  loadFormConfig(event: any): void {
    const file = event.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        this.formTitle = config.title || 'My Form';
        this.formDescription = config.description || 'Form Description';
        this.formFileName = config.fileName || config.title?.toLowerCase().replace(/\s+/g, '-') || 'my-form';
        this.formElements = config.elements || [];

        this.messageService.add({
          severity: 'success',
          summary: 'Form Loaded',
          detail: 'Form configuration has been loaded successfully.',
        });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load form configuration.',
        });
      }
    };
    reader.readAsText(file);
  }
}