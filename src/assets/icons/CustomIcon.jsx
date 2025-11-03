import React from 'react';
import { Image } from 'react-native';


const icons = {
  activity: require('../icons/activity.png'),
  archive: require('../icons/archive.png'),
  'arrow-email-forward': require('../icons/arrow-email-forward.png'),
  attachment: require('../icons/attachment.png'),
  'bell-notification': require('../icons/bell-notification.png'),
  calendar: require('../icons/calendar.png'),
  check: require('../icons/check.png'),
  'clipboard-check': require('../icons/clipboard-check.png'),
  clock: require('../icons/clock.png'),
  edit: require('../icons/edit.png'),
  'ev-plug': require('../icons/ev-plug.png'),
  'eye-solid': require('../icons/eye-solid.png'),
  eye: require('../icons/eye.png'),
  'filter-list': require('../icons/filter-list.png'),
  golf: require('../icons/golf.png'),
  'google-docs': require('../icons/google-docs.png'),
  'graph-up': require('../icons/graph-up.png'),
  'home-1': require('../icons/home-1.png'),
  'info-circle': require('../icons/info-circle.png'),
  'leaderboard-star': require('../icons/leaderboard-star.png'),
  'line-space': require('../icons/line-space.png'),
  'mail-1': require('../icons/mail-1.png'),
  'mail-2': require('../icons/mail-2.png'),
  mail: require('../icons/mail.png'),
  microphone: require('../icons/microphone.png'),
  'more-horiz': require('../icons/more-horiz.png'),
  'nav-arrow-down': require('../icons/nav-arrow-down.png'),
  'nav-arrow-left': require('../icons/nav-arrow-left.png'),
  'nav-arrow-right': require('../icons/nav-arrow-right.png'),
  notes: require('../icons/notes.png'),
  'path-arrow': require('../icons/path-arrow.png'),
  pause: require('../icons/pause.png'),
  phone: require('../icons/phone.png'),
  'phone-disabled': require('../icons/phone-disabled.png'),
  plus: require('../icons/plus.png'),
  'report-columns': require('../icons/report-columns.png'),
  Rombus: require('../icons/Rombus.png'),
  search: require('../icons/search.png'),
  'send-mail': require('../icons/send-mail.png'),
  send: require('../icons/send.png'),
  settings: require('../icons/settings.png'),
  'stat-down': require('../icons/stat-down.png'),
  'stat-up': require('../icons/stat-up.png'),
  suitcase: require('../icons/suitcase.png'),
  trash: require('../icons/trash.png'),
  'user-badge-check': require('../icons/user-badge-check.png'),
  user: require('../icons/user.png'),
  xmark: require('../icons/xmark.png'),
};

const IconComponent = ({ name, width, height, style, tintColour }) => {
  const SelectedIcon = icons[name];

  if (!SelectedIcon) {
    console.warn(`Icon '${name}' not found in IconComponent.`);
    return null;
  }

  return (
    <Image
      source={SelectedIcon}
      style={[{ width: width, height: height, resizeMode: 'contain', tintColor:tintColour, }, style]}
    />
  );
};

export default IconComponent;
