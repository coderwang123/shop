import type { App } from "vue";
import directivePermission from "./permission";

export default function directives(app: App) {
  directivePermission(app);
}



