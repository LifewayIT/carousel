import '@testing-library/jest-dom';
import { configure as rtlConfigure } from '@testing-library/react';

rtlConfigure({ testIdAttribute: 'data-qa-hook' });
