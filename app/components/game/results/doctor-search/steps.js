import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { arg } from 'ember-arg-types';

export default class Steps extends Component {
  // Component Input Properties
  // --------------------------
  @arg selectLanguage;
  @arg selectedCountry;
  @arg selectedLanguage;
  @arg languageOptions;

  @action
  toggleStep(event) {
    const stepContent = event.target.closest('.mind-step-header').nextElementSibling;
    if (stepContent.style.maxHeight) {
      stepContent.style.maxHeight = null;
    } else {
      stepContent.style.maxHeight = stepContent.scrollHeight + "px";
    }
  }
  
  @action
  downloadReport() {
    var link = document.createElement("a");
    link.download = 'assets/docs/sample_results.pdf';
    link.href = 'assets/docs/sample_results.pdf';
    link.click();
  }
}
