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
    category: 'today'
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
