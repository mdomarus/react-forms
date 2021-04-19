import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

export const docsLinks = {
  mui: 'https://material-ui.com/api/',
  pf4: 'https://patternfly-react.surge.sh/components/',
  blueprint: 'https://blueprintjs.com/docs/',
  suir: 'https://react.semantic-ui.com/',
  ant: 'https://ant.design/components/',
  carbon: 'https://react.carbondesignsystem.com/?path=/story/'
};

const mapperLinks = {
  pf4: {
    'date-picker': 'date-picker',
    'text-field': 'textinput',
    'time-picker': 'time-picker',
    'checkbox-multiple': 'checkbox',
    [componentTypes.CHECKBOX]: 'checkbox',
    [componentTypes.RADIO]: 'radio',
    [componentTypes.TABS]: 'tabs',
    [componentTypes.WIZARD]: 'wizard',
    [componentTypes.SWITCH]: 'switch',
    [componentTypes.TEXTAREA]: 'text-area',
    [componentTypes.PLAIN_TEXT]: 'text',
    [componentTypes.DUAL_LIST_SELECT]: 'dual-list-selector',
    [componentTypes.SLIDER]: 'slider'
  },
  mui: {
    'date-picker': 'text-field',
    'text-field': 'text-field',
    'time-picker': 'text-field',
    'checkbox-multiple': 'checkbox',
    'text-area': 'textarea',
    'plain-text': 'typography',
    [componentTypes.WIZARD]: 'stepper',
    [componentTypes.CHECKBOX]: 'checkbox',
    [componentTypes.RADIO]: 'radio',
    [componentTypes.TABS]: 'tabs',
    [componentTypes.SWITCH]: 'switch',
    [componentTypes.SLIDER]: 'slider'
  },
  blueprint: {
    [componentTypes.TEXT_FIELD]: '#core/components/text-inputs',
    [componentTypes.FIELD_ARRAY]: '',
    [componentTypes.CHECKBOX]: '#core/components/checkbox',
    [componentTypes.SUB_FORM]: '',
    [componentTypes.RADIO]: '#core/components/radio',
    [componentTypes.TABS]: '#core/components/tabs',
    [componentTypes.DATE_PICKER]: '#datetime/datepicker',
    [componentTypes.TIME_PICKER]: '#datetime/timepicker',
    [componentTypes.WIZARD]: '',
    [componentTypes.SWITCH]: '#core/components/switch',
    [componentTypes.TEXTAREA]: '#core/components/text-inputs.text-area',
    [componentTypes.SELECT]: '#select',
    [componentTypes.PLAIN_TEXT]: '#core/components/text',
    [componentTypes.BUTTON]: '#core/components/button',
    [componentTypes.DUAL_LIST_SELECT]: '',
    [componentTypes.SLIDER]: '#core/components/sliders'
  },
  ant: {
    [componentTypes.TEXT_FIELD]: 'input',
    [componentTypes.CHECKBOX]: 'checkbox',
    [componentTypes.SUB_FORM]: '',
    [componentTypes.RADIO]: 'radio/#RadioGroup',
    [componentTypes.TABS]: 'tabs',
    [componentTypes.DATE_PICKER]: 'date-picker',
    [componentTypes.TIME_PICKER]: 'time-picker',
    [componentTypes.WIZARD]: '',
    [componentTypes.SWITCH]: 'switch',
    [componentTypes.TEXTAREA]: 'input/#Input.TextArea',
    [componentTypes.SELECT]: 'select',
    [componentTypes.PLAIN_TEXT]: 'typography/#Typography.Paragraph',
    [componentTypes.BUTTON]: 'button',
    [componentTypes.DUAL_LIST_SELECT]: 'transfer',
    [componentTypes.SLIDER]: 'slider'
  },
  carbon: {
    [componentTypes.TEXT_FIELD]: 'textinput',
    [componentTypes.CHECKBOX]: 'checkbox',
    [componentTypes.SUB_FORM]: '',
    [componentTypes.RADIO]: 'radiobutton',
    [componentTypes.TABS]: 'tabs',
    [componentTypes.DATE_PICKER]: 'datepicker',
    [componentTypes.TIME_PICKER]: 'timepicker',
    [componentTypes.WIZARD]: 'progressindicator',
    [componentTypes.SWITCH]: 'toggle',
    [componentTypes.TEXTAREA]: 'textarea',
    [componentTypes.SELECT]: 'select',
    [componentTypes.PLAIN_TEXT]: '',
    [componentTypes.BUTTON]: 'button',
    [componentTypes.DUAL_LIST_SELECT]: 'transfer',
    [componentTypes.SLIDER]: 'slider'
  }
};

const mapper = (activeMapper, component) => (mapperLinks[activeMapper] && mapperLinks[activeMapper][component]) || ``;

const originalComponentLink = (activeMapper, component) => `${docsLinks[activeMapper]}${mapper(activeMapper, component)}`;

export default originalComponentLink;