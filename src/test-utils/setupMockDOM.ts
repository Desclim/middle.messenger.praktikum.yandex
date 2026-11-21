import { JSDOM } from 'jsdom';

type GlobalWithDom = typeof globalThis & {
  document?: Document;
  window?: Window & typeof globalThis;
  history?: History;
  location?: Location;
  HTMLElement?: typeof HTMLElement;
  Event?: typeof Event;
  PopStateEvent?: typeof PopStateEvent;
  DocumentFragment?: typeof DocumentFragment;
};

const globalWithDom = globalThis as GlobalWithDom;

const originalDocument = globalWithDom.document;
const originalWindow = globalWithDom.window;
const originalHistory = globalWithDom.history;
const originalLocation = globalWithDom.location;
const originalHTMLElement = globalWithDom.HTMLElement;
const originalEvent = globalWithDom.Event;
const originalPopStateEvent = globalWithDom.PopStateEvent;
const originalDocumentFragment = globalWithDom.DocumentFragment;

let dom: JSDOM | null = null;

function setGlobalProperty<Key extends keyof GlobalWithDom>(
  key: Key,
  value: GlobalWithDom[Key],
): void {
  Object.defineProperty(globalWithDom, key, {
    configurable: true,
    writable: true,
    value,
  });
}

function restoreGlobalProperty<Key extends keyof GlobalWithDom>(
  key: Key,
  value: GlobalWithDom[Key],
): void {
  if (value !== undefined) {
    setGlobalProperty(key, value);
    return;
  }

  Reflect.deleteProperty(globalWithDom, key);
}

export function setupDom(pathname = '/'): void {
  dom = new JSDOM(
    '<!doctype html><html><body><div id="app"></div></body></html>',
    {
      url: `http://localhost${pathname}`,
    },
  );

  setGlobalProperty('window', dom.window as unknown as Window & typeof globalThis);
  setGlobalProperty('document', dom.window.document);
  setGlobalProperty('history', dom.window.history);
  setGlobalProperty('location', dom.window.location);
  setGlobalProperty('HTMLElement', dom.window.HTMLElement);
  setGlobalProperty('Event', dom.window.Event);
  setGlobalProperty('PopStateEvent', dom.window.PopStateEvent);
  setGlobalProperty('DocumentFragment', dom.window.DocumentFragment);
}

export function resetDom(): void {
  dom?.window.close();
  dom = null;

  restoreGlobalProperty('document', originalDocument);
  restoreGlobalProperty('window', originalWindow);
  restoreGlobalProperty('history', originalHistory);
  restoreGlobalProperty('location', originalLocation);
  restoreGlobalProperty('HTMLElement', originalHTMLElement);
  restoreGlobalProperty('Event', originalEvent);
  restoreGlobalProperty('PopStateEvent', originalPopStateEvent);
  restoreGlobalProperty('DocumentFragment', originalDocumentFragment);
}
