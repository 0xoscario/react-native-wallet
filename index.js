/**
 * @format
 */
import './shim.js';
import crypto from 'crypto';
import { enableES5 } from 'immer';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from 'src/app/app.component';

enableES5();

AppRegistry.registerComponent(appName, () => App);
