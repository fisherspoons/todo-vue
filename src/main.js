import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI';
import router from './router'
import store from './store';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();


const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router).use(store).mount('#app');
