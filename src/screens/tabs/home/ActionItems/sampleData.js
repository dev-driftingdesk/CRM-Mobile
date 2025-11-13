/**
 * Sample Action Items Data
 *
 * Use this data for testing and development of the ActionItemsList component.
 * Replace with real data from API or state management in production.
 */

export const sampleActionItems = [
  // Today Items
  {
    id: '1',
    type: 'call',
    contactName: 'John Smith',
    description: 'follow up on pricing discussion',
    time: '10:00AM',
    priority: 'Critical',
    category: 'today',
    // Extended data for details screen
    commission: 2436.00,
    commissionPercent: 5.8,
    leadId: '1',
    leadCompany: 'CreativePixel Agency',
    leadContact: 'John Smith',
    leadPhone: '+65 8234 2119',
    leadEmail: 'john.smith@creativepixel.com',
    leadWhatsApp: '+65 8234 2119',
    leadLinkedIn: 'linkedin.com/in/johnsmith',
    dealId: 'd1',
    dealName: 'UX Team Skill Upgrade Program',
    dealProductCount: 4,
    talkingPoints: {
      fromLastCall: '24th Thursday',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      bulletPoints: [
        'Ut enim ad minim veniam, quis nostrud',
        'exercitation ullamco laboris nisi ut aliquip',
        'ex ea commodo consequat. Duis aute irure',
        'dolor in reprehenderit in voluptate velit esse cillum dolore',
      ],
    },
    activityTimeline: [
      {
        id: 'a1',
        activity: 'Client called to confirm order details',
        timestamp: '9/29/2025 at 08:19 PM',
        duration: '15 min',
        status: 'confirmed',
      },
      {
        id: 'a2',
        activity: 'Shipping department notified of dispatch schedule',
        timestamp: '9/30/2025 at 10:00 AM',
        duration: '30 min',
        status: 'pending',
      },
      {
        id: 'a3',
        activity: 'Quality control completed inspection',
        timestamp: '10/1/2025 at 01:15 PM',
        duration: '20 min',
        status: 'approved',
      },
      {
        id: 'a4',
        activity: 'Invoice generated and sent to client',
        timestamp: '10/1/2025 at 03:45 PM',
        duration: '10 min',
        status: 'sent',
      },
    ],
    products: [
      {
        id: 'p1',
        name: 'Usability Testing Bootcamp',
        description: 'Practice-led session with real user tests, observation frameworks, and UX performance metrics.',
        totalDeal: 14593,
        commission: 358,
      },
      {
        id: 'p2',
        name: 'UX Design Audit Certification',
        description: '1-day assessment and certification based on internal case studies.',
        totalDeal: 58321,
        commission: 123,
      },
    ],
  },
  {
    id: '2',
    type: 'proposal',
    contactName: 'Sarah Lee',
    description: 'BrightTech proposal review and send',
    time: '10:00AM',
    priority: 'Critical',
    category: 'today'
  },
  {
    id: '3',
    type: 'follow-up',
    contactName: 'Mark Johnson',
    description: 'about demo feedback and next steps',
    time: '10:00AM',
    priority: 'High',
    category: 'today'
  },
  {
    id: '4',
    type: 'schedule',
    contactName: 'Priya Kumar',
    description: 'TechNova integration meeting',
    time: '10:00AM',
    priority: 'Low',
    category: 'today'
  },

  // Overdue Items
  {
    id: '5',
    type: 'call',
    contactName: 'Michael Chen',
    description: 'urgent contract review',
    time: '09:00AM',
    priority: 'Critical',
    category: 'overdue'
  },
  {
    id: '6',
    type: 'follow-up',
    contactName: 'Emma Davis',
    description: 'about invoice payment delay',
    time: '02:00PM',
    priority: 'High',
    category: 'overdue'
  },
  {
    id: '7',
    type: 'proposal',
    contactName: 'Robert Wilson',
    description: 'Q4 strategy presentation',
    time: '11:00AM',
    priority: 'High',
    category: 'overdue'
  },

  // Upcoming Items
  {
    id: '8',
    type: 'schedule',
    contactName: 'Lisa Anderson',
    description: 'quarterly business review',
    time: '03:00PM',
    priority: 'Low',
    category: 'upcoming'
  },
  {
    id: '9',
    type: 'call',
    contactName: 'David Martinez',
    description: 'initial discovery call',
    time: '01:00PM',
    priority: 'Low',
    category: 'upcoming'
  },
  {
    id: '10',
    type: 'follow-up',
    contactName: 'Jennifer Taylor',
    description: 'about product demo feedback',
    time: '04:00PM',
    priority: 'Low',
    category: 'upcoming'
  },
  {
    id: '11',
    type: 'proposal',
    contactName: 'Thomas Brown',
    description: 'annual renewal contract',
    time: '11:30AM',
    priority: 'High',
    category: 'upcoming'
  },
];

/**
 * Helper function to get items by category
 * @param {string} category - 'today' | 'overdue' | 'upcoming'
 * @returns {Array} Filtered action items
 */
export const getItemsByCategory = (category) => {
  return sampleActionItems.filter(item => item.category === category);
};

/**
 * Helper function to get items by priority
 * @param {string} priority - 'Critical' | 'High' | 'Low'
 * @returns {Array} Filtered action items
 */
export const getItemsByPriority = (priority) => {
  return sampleActionItems.filter(item => item.priority === priority);
};
