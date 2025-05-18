// Import all components
import GlimButton from './components/Button/Button.vue';
import GlimCard from './components/Card/Card.vue';
import GlimAccordion from './components/Accordion/Accordion.vue';
import GlimAvatar from './components/Avatar/Avatar.vue';
import GlimBadge from './components/Badge/Badge.vue';
import GlimBanner from './components/Banner/Banner.vue';
import GlimCheckbox from './components/Checkbox/Checkbox.vue';
import GlimDivider from './components/Divider/Divider.vue';
import GlimDropdown from './components/Dropdown/Dropdown.vue';
import GlimIcon from './components/Icon/Icon.vue';
import GlimImage from './components/Image/Image.vue';
import GlimInput from './components/Input/Input.vue';
import GlimMessage from './components/Message/Message.vue';
import GlimMenu from './components/Menu/Menu.vue';
import GlimProgressBar from './components/ProgressBar/ProgressBar.vue';
import GlimSegmentedControls from './components/SegmentedControls/SegmentedControls.vue';
import GlimSlider from './components/Slider/Slider.vue';
import GlimSpinner from './components/Spinner/Spinner.vue';
import GlimTabs from './components/Tabs/Tabs.vue';
import GlimToggle from './components/Toggle/Toggle.vue';
import GlimTooltip from './components/Tooltip/Tooltip.vue';

// Import global styles
import './styles/index.css';

// Export all components individually
export { 
  GlimButton, 
  GlimCard, 
  GlimAccordion,
  GlimAvatar,
  GlimBadge,
  GlimBanner,
  GlimCheckbox,
  GlimDivider,
  GlimDropdown,
  GlimIcon,
  GlimImage,
  GlimInput,
  GlimMessage,
  GlimMenu,
  GlimProgressBar,
  GlimSegmentedControls,
  GlimSlider,
  GlimSpinner,
  GlimTabs,
  GlimToggle,
  GlimTooltip
};

// Export the Vue plugin
export default {
  install: (app: any) => {
    app.component('GlimButton', GlimButton);
    app.component('GlimCard', GlimCard);
    app.component('GlimAccordion', GlimAccordion);
    app.component('GlimAvatar', GlimAvatar);
    app.component('GlimBadge', GlimBadge);
    app.component('GlimBanner', GlimBanner);
    app.component('GlimCheckbox', GlimCheckbox);
    app.component('GlimDivider', GlimDivider);
    app.component('GlimDropdown', GlimDropdown);
    app.component('GlimIcon', GlimIcon);
    app.component('GlimImage', GlimImage);
    app.component('GlimInput', GlimInput);
    app.component('GlimMessage', GlimMessage);
    app.component('GlimMenu', GlimMenu);
    app.component('GlimProgressBar', GlimProgressBar);
    app.component('GlimSegmentedControls', GlimSegmentedControls);
    app.component('GlimSlider', GlimSlider);
    app.component('GlimSpinner', GlimSpinner);
    app.component('GlimTabs', GlimTabs);
    app.component('GlimToggle', GlimToggle);
    app.component('GlimTooltip', GlimTooltip);
  }
}; 