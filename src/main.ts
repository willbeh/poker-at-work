import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// const hostname = window.location.hostname;
// if (hostname !== 'pokeratwork.com' && hostname !== 'www.pokeratwork.com' && hostname !== 'localhost') {
//   window.location.replace(
//     'https://pokeratwork.com' + window.location.pathname + window.location.search + window.location.hash
//   );
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
