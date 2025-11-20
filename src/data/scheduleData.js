/**
 * Sample Schedule Data
 *
 * Mock schedule events for testing and development
 */

export const sampleScheduleItems = [
  // April 1, 2025 (Thursday)
  {
    id: 's101',
    date: '2025-04-01',
    time: '9:00 PM',
    type: 'Lead call',
    title: 'Client Call with CreativePixel Agency',
    deal: {
      name: 'UX Team Skill Upgrade Program',
      productCount: 4,
      value: 9800,
    },
    contact: null,
    leadCompany: 'CreativePixel Agency',
  },

  // April 2, 2025 (Tuesday)
  {
    id: 's102',
    date: '2025-04-02',
    time: '2:00 PM',
    type: 'Reminder',
    title: 'Send Contract to DazzleCo Inc.',
    deal: null,
    contact: {
      name: 'DazzleCo Inc.',
      phone: '+65 8765 4321',
    },
  },
  {
    id: 's103',
    date: '2025-04-02',
    time: '3:00 PM',
    type: 'Lead call',
    title: 'Meeting with Stellaris Corp',
    deal: {
      name: 'Corporate Training Package',
      productCount: 3,
      value: 7500,
    },
    contact: null,
    leadCompany: 'Stellaris Corp',
  },

  // April 9, 2025
  {
    id: 's1',
    date: '2025-04-09',
    time: '9:00 PM',
    type: 'Lead call',
    title: 'Client Call with CreativePixel Agency',
    deal: {
      name: 'UX Team Skill Upgrade Program',
      productCount: 4,
      value: 9800,
    },
    contact: null,
    leadCompany: 'CreativePixel Agency',
  },
  {
    id: 's2',
    date: '2025-04-09',
    time: '10:00 PM',
    type: 'Internal meeting',
    title: 'Internal Team Standup',
    deal: null,
    contact: null,
  },
  {
    id: 's3',
    date: '2025-04-09',
    time: '2:00 PM',
    type: 'Reminder',
    title: 'Send summary emails',
    deal: null,
    contact: {
      name: 'CreativePixel Agency',
      phone: '+65 9876 5432',
    },
  },
  {
    id: 's4',
    date: '2025-04-09',
    time: '3:00 PM',
    type: 'Lead call',
    title: 'Meeting with Vista Project Partners',
    deal: {
      name: 'Project Management Certification Series',
      productCount: 4,
      value: 9800,
    },
    contact: null,
    leadCompany: 'Vista Project Partners',
  },

  // April 3, 2025 (Wednesday)
  {
    id: 's5',
    date: '2025-04-03',
    time: '11:00 AM',
    type: 'Lead call',
    title: 'Call with AquaTech Solutions',
    deal: {
      name: 'Water Management System',
      productCount: 5,
      value: 12000,
    },
    contact: null,
    leadCompany: 'AquaTech Solutions',
  },

  // April 4, 2025 (Thursday)
  {
    id: 's104',
    date: '2025-04-04',
    time: '10:00 AM',
    type: 'Reminder',
    title: 'Follow up with NovaGrade Industries',
    deal: null,
    contact: {
      name: 'NovaGrade Industries',
      phone: '+65 9123 4567',
    },
  },

  // April 7, 2025
  {
    id: 's6',
    date: '2025-04-07',
    time: '1:00 PM',
    type: 'Internal meeting',
    title: 'Weekly Sales Review',
    deal: null,
    contact: null,
  },

  // April 8, 2025
  {
    id: 's7',
    date: '2025-04-08',
    time: '4:00 PM',
    type: 'Reminder',
    title: 'Follow up with pending leads',
    deal: null,
    contact: {
      name: 'Multiple Clients',
      phone: 'N/A',
    },
  },

  // April 11, 2025
  {
    id: 's8',
    date: '2025-04-11',
    time: '10:00 AM',
    type: 'Lead call',
    title: 'Product Demo for Innovate Solutions',
    deal: {
      name: 'Cloud Infrastructure Package',
      productCount: 3,
      value: 12500,
    },
    contact: null,
    leadCompany: 'Innovate Solutions',
  },

  // April 14, 2025
  {
    id: 's9',
    date: '2025-04-14',
    time: '3:30 PM',
    type: 'Lead call',
    title: 'Contract Negotiation with GlobalTech',
    deal: {
      name: 'Annual Support Contract',
      productCount: 2,
      value: 8000,
    },
    contact: null,
    leadCompany: 'GlobalTech',
  },

  // April 20, 2025
  {
    id: 's10',
    date: '2025-04-20',
    time: '2:00 PM',
    type: 'Internal meeting',
    title: 'Q2 Planning Session',
    deal: null,
    contact: null,
  },

  // April 21, 2025
  {
    id: 's11',
    date: '2025-04-21',
    time: '9:30 AM',
    type: 'Lead call',
    title: 'Onboarding Call with New Client',
    deal: {
      name: 'Starter Package',
      productCount: 5,
      value: 6500,
    },
    contact: null,
    leadCompany: 'StartupHub',
  },

  // April 23, 2025
  {
    id: 's12',
    date: '2025-04-23',
    time: '11:00 AM',
    type: 'Reminder',
    title: 'Send monthly reports',
    deal: null,
    contact: {
      name: 'All Active Clients',
      phone: 'N/A',
    },
  },

  // April 24, 2025
  {
    id: 's13',
    date: '2025-04-24',
    time: '1:30 PM',
    type: 'Lead call',
    title: 'Quarterly Review with Enterprise Client',
    deal: {
      name: 'Enterprise Support Plan',
      productCount: 8,
      value: 25000,
    },
    contact: null,
    leadCompany: 'MegaCorp',
  },

  // April 25, 2025
  {
    id: 's14',
    date: '2025-04-25',
    time: '10:00 AM',
    type: 'Internal meeting',
    title: 'Product Roadmap Discussion',
    deal: null,
    contact: null,
  },

  // April 29, 2025
  {
    id: 's15',
    date: '2025-04-29',
    time: '3:00 PM',
    type: 'Lead call',
    title: 'Strategy Session with Digital Agency',
    deal: {
      name: 'Marketing Automation Suite',
      productCount: 4,
      value: 11000,
    },
    contact: null,
    leadCompany: 'Digital Agency Pro',
  },

  // May 5, 2025 (Friday)
  {
    id: 's201',
    date: '2025-05-05',
    time: '1:00 PM',
    type: 'Lead call',
    title: 'Demo with Zenith Dynamics',
    deal: {
      name: 'Enterprise Solution Demo',
      productCount: 6,
      value: 18000,
    },
    contact: null,
    leadCompany: 'Zenith Dynamics',
  },

  // May 6, 2025 (Saturday)
  {
    id: 's202',
    date: '2025-05-06',
    time: '10:00 AM',
    type: 'Internal meeting',
    title: 'Internal Training Session',
    deal: null,
    contact: null,
  },
  {
    id: 's203',
    date: '2025-05-06',
    time: '1:00 PM',
    type: 'Internal meeting',
    title: 'Team Lunch at The Spice Route',
    deal: null,
    contact: null,
  },

  // May 7, 2025 (Sunday)
  {
    id: 's204',
    date: '2025-05-07',
    time: '2:00 PM',
    type: 'Reminder',
    title: 'Review Sales Pipeline',
    deal: null,
    contact: {
      name: 'Sales Team',
      phone: 'N/A',
    },
  },

  // May 8, 2025 (Monday)
  {
    id: 's205',
    date: '2025-05-08',
    time: '9:30 AM',
    type: 'Internal meeting',
    title: 'Strategy Meeting with Management',
    deal: null,
    contact: null,
  },
];

/**
 * Generate events map for calendar
 * Maps date keys (YYYY-MM-DD) to array of events
 */
export const generateEventsMap = (scheduleItems) => {
  const eventsMap = {};

  scheduleItems.forEach((item) => {
    if (!eventsMap[item.date]) {
      eventsMap[item.date] = [];
    }
    eventsMap[item.date].push(item);
  });

  return eventsMap;
};

/**
 * Get schedule items for a specific date
 */
export const getScheduleItemsForDate = (scheduleItems, dateKey) => {
  return scheduleItems
    .filter((item) => item.date === dateKey)
    .sort((a, b) => {
      // Sort by time
      const timeA = convertTimeToMinutes(a.time);
      const timeB = convertTimeToMinutes(b.time);
      return timeA - timeB;
    });
};

/**
 * Convert time string to minutes for sorting
 * e.g., "9:00 PM" -> 1260 (21 * 60 + 0)
 */
function convertTimeToMinutes(timeStr) {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let totalHours = hours;
  if (period === 'PM' && hours !== 12) {
    totalHours += 12;
  } else if (period === 'AM' && hours === 12) {
    totalHours = 0;
  }

  return totalHours * 60 + minutes;
}

/**
 * Format date for display
 * e.g., "2025-04-09" -> "April 9th 2025"
 */
export const formatDateDisplay = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${monthNames[month - 1]} ${day}${getOrdinalSuffix(day)} ${year}`;
};
