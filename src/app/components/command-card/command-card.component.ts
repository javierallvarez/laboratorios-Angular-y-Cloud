import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamCommand } from '../../models/gam-command.model';

import { TerminalBlockComponent } from '../shared/terminal-block/terminal-block.component';
import { TagComponent } from '../shared/tag/tag.component';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-command-card',
  standalone: true,
  imports: [
    CommonModule,
    TerminalBlockComponent,
    TagComponent,
    CardModule,
    ButtonModule,
    PanelModule,
    RippleModule,
    DividerModule
  ],
  templateUrl: './command-card.component.html',
  styleUrls: ['./command-card.component.css']
})
export class CommandCardComponent {
  @Input() command!: GamCommand;
  showOutput: boolean = false;
  copied: boolean = false;

  toggleOutput(): void {
    this.showOutput = !this.showOutput;
  }

  copyCommand(event: Event): void {
    event.stopPropagation();
    navigator.clipboard.writeText(this.command.command).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  getCategorySeverity(): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    const severityMap: { [key: string]: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' } = {
      'Users': 'info',
      'Groups': 'success',
      'Organization': 'warning',
      'Gmail': 'danger',
      'Drive': 'contrast'
    };
    return severityMap[this.command.category] || 'info';
  }
}

