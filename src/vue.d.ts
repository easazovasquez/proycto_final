// src/vue.d.ts

import { AxiosInstance } from 'axios';
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  // Extiende el tipo de Vue con la propiedad $axios
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
