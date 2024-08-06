import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', {});

global.window = jsdom.window;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.DOMParser = jsdom.window.DOMParser;
global.document = jsdom.window.document;
