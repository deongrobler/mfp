// The reason why this is done is to load all dependencies of child depenencies and other micro-front-ends before the index is loaded
// So you can add the bootstrap contents here but it would render incorrect (timing)

import('./bootstrap');