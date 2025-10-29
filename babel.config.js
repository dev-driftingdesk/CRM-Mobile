module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-iconify/babel',
      {
        icons: [
          "mdi:email",
          "mdi:email-outline",
          "mdi:account",
          "mdi:account-outline",
          "mdi:lock",
          "mdi:lock-outline",
          "iconoir:eye",
          "iconoir:eye-off",
          "mdi:eye-off-outline",

          // Signup fields
          "mdi:account-circle",
          "mdi:account-box",
          "mdi:account-details",
          "mdi:account-edit",

          // Form fields
          "iconoir:mail",
          "mdi:phone",
          "mdi:phone-outline",
          "mdi:form-textbox",
          "mdi:numeric",
          "mdi:calendar",
          "iconoir:calendar",
          "mdi:map-marker",
          "mdi:map-marker-outline",

          // Navigation
          "mdi:arrow-left",
          "mdi:arrow-right",
          "mdi:arrow-up",
          "mdi:arrow-down",
          "mdi:chevron-left",
          "mdi:chevron-right",

          // Social
          "mdi:google",
          "mdi:facebook",
          "mdi:twitter",
          "mdi:apple",
          "mdi:github",

          // Status/feedback
          "iconoir:check",
          "mdi:check-circle",
          "mdi:check-bold",
          "mdi:alert-circle",
          "mdi:close",
          "mdi:close-circle",

          // UI General
          "mdi:home",
          "mdi:heart",
          "mdi:settings",
          "mdi:information",
          "mdi:logout",
        ],
      },
    ],
    'react-native-worklets/plugin', //add to last always
  ],
};
