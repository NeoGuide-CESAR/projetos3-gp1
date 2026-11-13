import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDetail } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  get(id: string): Observable<ProjectDetail> {
    return this.http.get<ProjectDetail>(`/api/v1/projects/${id}`);
  }

  // NEO-43
  duplicate(id: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`/api/v1/projects/${id}/duplicate`, {});
  }
}
