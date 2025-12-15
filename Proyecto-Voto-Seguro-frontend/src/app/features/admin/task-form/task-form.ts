import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';
import { Task } from '../../../shared/models/task.model';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskForm implements OnInit {
  taskForm!: FormGroup;
  loading = false;
  users: User[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<TaskForm>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null }
  ) {
    this.isEditMode = !!data.task;
  }

  ngOnInit(): void {
    // Inicializar el formulario PRIMERO
    this.taskForm = this.fb.group({
      title: [this.data.task?.title || '', [Validators.required, Validators.maxLength(200)]],
      description: [this.data.task?.description || '', [Validators.required, Validators.maxLength(1000)]],
      assignedToUserId: [this.data.task?.assignedToUserId || '', Validators.required],
      dueDate: [this.data.task?.dueDate || null],
      priority: [this.data.task?.priority || 'medium', Validators.required],
      status: [this.data.task?.status || 'pending']
    });

    // Luego cargar usuarios
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsersByRole('user').subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data);
        this.users = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.isEditMode && this.data.task) {
      this.taskService.updateTask(this.data.task.id, this.taskForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error al actualizar tarea:', error);
          alert('Error al actualizar la tarea');
        }
      });
    } else {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error al crear tarea:', error);
          alert('Error al crear la tarea');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
