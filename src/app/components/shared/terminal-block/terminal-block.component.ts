import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-terminal-block',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  template: `
    <div class="bg-gray-900 rounded-xl overflow-hidden shadow-inner border-2 border-gray-800 transition-all duration-200 hover:border-gray-700">
      <!-- Header (optional) -->
      <div *ngIf="title || allowCopy" class="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
        <div class="flex items-center gap-2">
          <i *ngIf="type === 'command'" class="pi pi-terminal text-green-500 text-xs"></i>
          <span *ngIf="title" class="text-gray-400 text-xs font-bold font-mono uppercase tracking-wider">{{ title }}</span>
        </div>
        <div *ngIf="allowCopy" class="ml-auto flex items-center">
          <span *ngIf="copied" class="text-green-400 text-xs mr-2 fade-in">Copied!</span>
          <button 
            type="button"
            class="text-gray-400 hover:text-white transition-colors focus:outline-none"
            (click)="copyContent()"
            [pTooltip]="copied ? '' : 'Copy to clipboard'" 
            tooltipPosition="left">
            <i class="pi" [ngClass]="copied ? 'pi-check text-green-400' : 'pi-copy'"></i>
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-5 overflow-x-auto custom-scrollbar">
        <code *ngIf="type === 'command'" class="text-green-400 text-base font-mono leading-relaxed block break-all">{{ content }}</code>
        <pre *ngIf="type === 'output'" class="text-gray-300 text-xs font-mono leading-relaxed m-0 whitespace-pre-wrap font-family-inherit">{{ content }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(31, 41, 55, 0.5);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #4b5563;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #6b7280;
    }
    .font-family-inherit {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .fade-in {
      animation: fadeIn 0.2s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class TerminalBlockComponent {
  @Input() content: string = '';
  @Input() title: string = '';
  @Input() type: 'command' | 'output' = 'output';
  @Input() allowCopy: boolean = false;
  
  @Output() onCopy = new EventEmitter<void>();

  copied: boolean = false;

  copyContent() {
    navigator.clipboard.writeText(this.content).then(() => {
      this.copied = true;
      this.onCopy.emit();
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }
}

