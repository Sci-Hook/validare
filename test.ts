import * as express from 'express';
import {Schema, loadSchemas, validateSwitch, validator, validateFields} from './index';
import { remote_load_files } from './src/functions/remote-load';

// loadSchemas('test.json')
remote_load_files('/test');