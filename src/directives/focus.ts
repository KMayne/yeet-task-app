import Vue from 'vue';

export const focus = Vue.directive('focus', {
    // When the bound element is inserted into the DOM
    inserted(el) {
        // Focus the element
        el.focus();
        const sel = window.getSelection() || { collapse: () => console.warn('Could not get selection') };
        sel.collapse(el.firstChild, el?.firstChild?.textContent?.length);
    }
});
