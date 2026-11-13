import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe, Location } from '@angular/common';
import { ProjectService } from './project.service';
import { ProjectDetail, ProjectStatus } from './project.model';

// No app.config.ts: registerLocaleData(localePt) e { provide: LOCALE_ID, useValue: 'pt-BR' }

const STATUS_LABEL: Record<ProjectStatus, string> = {
  DRAFT: 'Rascunho',
  IN_REVIEW: 'Em análise',
  CALCULATED: 'Calculado',
};

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private api = inject(ProjectService);

  project = signal<ProjectDetail | null>(null);
  loading = signal(true);
  error = signal(false);
  duplicating = signal(false);

  isDraft = computed(() => this.project()?.status === 'DRAFT');
  statusLabel = computed(() => STATUS_LABEL[this.project()?.status ?? 'DRAFT']);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.get(id).subscribe({
      next: (p) => { this.project.set(p); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); },
    });
  }

  duplicate() {
    const p = this.project();
    if (!p || this.duplicating()) return;
    this.duplicating.set(true);
    this.api.duplicate(p.id).subscribe({
      next: (copy) => this.router.navigate(['/projetos', copy.id, 'editar']),
      error: () => this.duplicating.set(false),
    });
  }

  edit() { this.router.navigate(['/projetos', this.project()!.id, 'editar']); }          // NEO-41
  back() { this.location.back(); }
}
