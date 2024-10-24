import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITask } from '../intefaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private BACKEND_URL = 'http://localhost:8080/tarefa';

  constructor(private readonly httpClient: HttpClient) {}

  public getTasks(): Observable<ITask[]> {
    return this.httpClient
      .get<ResponseAPI>(`${this.BACKEND_URL}`)
      .pipe(map((response: ResponseAPI) => response.data as ITask[]));
  }

  public addTask(task: ITask): Observable<ResponseAPI> {
    return this.httpClient.post<ResponseAPI>(`${this.BACKEND_URL}`, task);
  }

  public updateTask(task: ITask): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.BACKEND_URL}`, task);
  }

  public deleteTask(idTask: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BACKEND_URL}/${idTask}`);
  }
  public deleteAllTasks(): Observable<void> {
    return this.httpClient.delete<void>(`${this.BACKEND_URL}/deleteAllTasks`);
  }
}

export interface ResponseAPI {
  accepted: boolean;
  data: any;
}
