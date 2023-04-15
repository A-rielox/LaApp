import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';

@Component({
   selector: 'app-text-input',
   templateUrl: './text-input.component.html',
   styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements ControlValueAccessor {
   @Input() label = '';
   @Input() type = 'text';

   lang: string = 'Eng';

   textEsp = {
      required: 'Por favor ingrese un',
      least: 'debe tener al menos',
      max: 'debe ser máximo',
      chars: 'caracteres',
      passNotMatch: 'Los passwords no coinciden',
   };
   textEng = {
      required: 'Please enter a',
      least: 'must have at least',
      max: 'must be maximum',
      chars: 'characters',
      passNotMatch: 'The passwords do not match',
   };
   text = this.textEng;

   // de esta forma tengo acceso al control dentro DE ESTE componente ( cuando lo use dentro de las form desde las que lo voy a llamar )
   constructor(
      @Self() public ngControl: NgControl,
      public accountService: AccountService
   ) {
      // this es el TextInputComponent
      this.ngControl.valueAccessor = this;

      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang === 'Esp' ? 'Esp' : 'Eng';

            this.text = lang === 'Esp' ? this.textEsp : this.textEng;
         },
      });
   }

   writeValue(obj: any): void {}
   registerOnChange(fn: any): void {}
   registerOnTouched(fn: any): void {}

   get control(): FormControl {
      return this.ngControl.control as FormControl;
   }
}
