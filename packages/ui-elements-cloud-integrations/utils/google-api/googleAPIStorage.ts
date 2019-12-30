
/* Creates simple key-value storage located in `window` variable */

declare global {
  interface Window {
    __ui_elements_cloud_integrations_gapi?: {[key: string]: unknown};
  }
}

export function getData(key: string, defaultValue: unknown): unknown {
  const data = window.__ui_elements_cloud_integrations_gapi || {};
  window.__ui_elements_cloud_integrations_gapi = data;
  if (!(key in data)) {
    data[key] = defaultValue;
  }
  return data[key];
}

export function setData(key: string, value: unknown): void {
  const data = window.__ui_elements_cloud_integrations_gapi || {};
  window.__ui_elements_cloud_integrations_gapi = data;
  data[key] = value;
}
