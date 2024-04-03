import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
    standalone: true,
  selector: 'app-card',
  templateUrl: './film.component.html',
  imports: [CommonModule,PickerModule],
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    private cdr: ChangeDetectorRef;
    constructor() { }
    showComponent = false;
    @Input() response: boolean; // Définissez un objet film comme propriété d'entrée
    @Input() title: string; // Définissez un objet film comme propriété d'entrée
    @Input() movies: any; // Définissez un objet film comme propriété d'entrée

    // getObjectKeys(obj: any) {
    //   return Object.keys(obj).map(key => ({ key, value: obj[key] }));
    // }
    // ngOnChanges() {
    //   // this.cdr.detectChanges();
    //   console.log($("htmlContent"));
    //   $("htmlContent").html("<app-card></app-card>");
    // }
  // Vous pouvez également ajouter des méthodes ou des logiques spécifiques au composant ici
}
