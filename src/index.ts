// Import all components
import GlimButton from './components/GlimButton/GlimButton.vue';
import GlimCard from './components/GlimCard/GlimCard.vue';
import GlimAccordion from './components/GlimAccordion/GlimAccordion.vue';
import GlimAvatar from './components/GlimAvatar/GlimAvatar.vue';
import GlimBadge from './components/GlimBadge/GlimBadge.vue';
import GlimBanner from './components/GlimBanner/GlimBanner.vue';
import GlimCheckbox from './components/GlimCheckbox/GlimCheckbox.vue';
import GlimDivider from './components/GlimDivider/GlimDivider.vue';
import GlimDropdown from './components/GlimDropdown/GlimDropdown.vue';
import GlimIcon from './components/GlimIcon/GlimIcon.vue';
import GlimImage from './components/GlimImage/GlimImage.vue';
import GlimInput from './components/GlimInput/GlimInput.vue';
import GlimMessage from './components/GlimMessage/GlimMessage.vue';
import GlimMenu from './components/GlimMenu/GlimMenu.vue';
import GlimProgressBar from './components/GlimProgressBar/GlimProgressBar.vue';
import GlimSegmentedControls from './components/GlimSegmentedControls/GlimSegmentedControls.vue';
import GlimSlider from './components/GlimSlider/GlimSlider.vue';
import GlimSpinner from './components/GlimSpinner/GlimSpinner.vue';
import GlimTabs from './components/GlimTabs/GlimTabs.vue';
import GlimToggle from './components/GlimToggle/GlimToggle.vue';
import GlimTooltip from './components/GlimTooltip/GlimTooltip.vue';

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