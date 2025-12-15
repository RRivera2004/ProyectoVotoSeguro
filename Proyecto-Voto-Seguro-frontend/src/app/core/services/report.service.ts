import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskStatistics } from '../../shared/models/statistics.model';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/Reports`;

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<TaskStatistics> {
    return this.http.get<TaskStatistics>(`${this.apiUrl}/statistics`);
  }

  getUserStatistics(userId: string): Observable<TaskStatistics> {
    return this.http.get<TaskStatistics>(`${this.apiUrl}/user/${userId}/statistics`);
  }

  getOverdueTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/overdue`);
  }

  getTasksDueSoon(days: number = 7): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/due-soon?days=${days}`);
  }
}
