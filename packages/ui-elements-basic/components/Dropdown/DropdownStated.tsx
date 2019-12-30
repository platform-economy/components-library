import 'react';
import { Dropdown } from './Dropdown';
import { withUncontrolledDropdownState } from './withUncontrolledDropdownState';

export const DropdownStated = withUncontrolledDropdownState()(Dropdown);
