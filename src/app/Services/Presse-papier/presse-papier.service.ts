import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PressePapierService {

  constructor(
  ) { }

  /**
   * Copier un texte dans le presse papier du navigateur
   * @param text 
   */
  copier(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          console.log('Copied to clipboard successfully!');
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        console.log('Fallback: Copied to clipboard successfully!');
      } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
      }
      document.body.removeChild(textarea);
    }
  }
}
