import Vue from 'vue';

export const focus = Vue.directive('focus', {
    // When the bound element is inserted into the DOM
    inserted(el) {
        // Focus the element
        el.focus();
    }
});
