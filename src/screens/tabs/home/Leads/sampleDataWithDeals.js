/**
 * Sample Leads Data with Deals
 *
 * Extended sample data structure for leads with complete deal information.
 * Used for testing the LeadDetails screen with realistic data.
 *
 * Data structure:
 * - id: Unique identifier
 * - companyName: Company/organization name (used for avatar initials)
 * - contactName: Primary contact person name
 * - dealCount: Number of active deals with this lead
 * - deals: Array of deal objects with complete information
 */

export const sampleLeadsWithDeals = [
  {
    id: '1',
    companyName: 'CreativePixel Agency',
    contactName: 'Emma Rodriguez',
    dealCount: 4,
    deals: [
      {
        id: 'd1',
        name: 'UX Team Skill Upgrade Program',
        productCount: 4,
        totalValue: 39567.00,
        commission: 2436.00,
        commissionPercent: 5.80,
        lastActivity: 'Client called to confirm order details',
        timestamp: '9/29/2025 at 08:19 PM',
        leadId: '1',
        leadCompany: 'CreativePixel Agency',
        leadContact: 'John Smith',
        salesReps: [
          { id: '1', name: 'James Nick', avatar: 'https://i.pravatar.cc/150?img=1' },
          { id: '2', name: 'Sarah Lee', avatar: 'https://i.pravatar.cc/150?img=5' },
          { id: '3', name: 'Mike Torel', avatar: 'https://i.pravatar.cc/150?img=8' },
        ],
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
            activity: 'Agent added a note tagging the product "Wireframing & Prototyping in Figma"',
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
      },
      {
        id: 'd2',
        name: 'Design & Branding Program for Marketing Team',
        productCount: 3,
        totalValue: 7200,
        commission: 417.60,
        commissionPercent: 5.80,
        lastActivity: 'Sent updated proposal with revised pricing',
        timestamp: '9/28/2025 at 02:45 PM',
        leadId: '1',
        leadCompany: 'CreativePixel Agency',
        leadContact: 'John Smith',
        salesReps: [
          { id: '1', name: 'James Nick', avatar: 'https://i.pravatar.cc/150?img=1' },
          { id: '4', name: 'Emily Carter', avatar: 'https://i.pravatar.cc/150?img=9' },
        ],
        talkingPoints: {
          fromLastCall: '22nd Tuesday',
          notes: 'Discussion about branding requirements and timeline for the marketing team.',
          bulletPoints: [
            'Review brand guidelines and color schemes',
            'Schedule kickoff meeting with marketing team',
            'Define key deliverables and milestones',
          ],
        },
        activityTimeline: [
          {
            id: 'a1',
            activity: 'Initial consultation completed',
            timestamp: '9/28/2025 at 02:00 PM',
            duration: '45 min',
            status: 'confirmed',
          },
        ],
      },
      {
        id: 'd3',
        name: 'Front-End Developer Bootcamp Package',
        productCount: 5,
        totalValue: 12400,
        commission: 719.20,
        commissionPercent: 5.80,
        lastActivity: 'Meeting scheduled for product demo',
        timestamp: '9/27/2025 at 11:30 AM',
        leadId: '1',
        leadCompany: 'CreativePixel Agency',
        leadContact: 'John Smith',
        salesReps: [
          { id: '2', name: 'Sarah Lee', avatar: 'https://i.pravatar.cc/150?img=5' },
          { id: '3', name: 'Mike Torel', avatar: 'https://i.pravatar.cc/150?img=8' },
        ],
        talkingPoints: {
          fromLastCall: '20th Monday',
          notes: 'Bootcamp structure and enrollment details for developer training.',
          bulletPoints: [
            'Confirm participant count and skill levels',
            'Setup training environment and materials',
            'Schedule first session and follow-ups',
          ],
        },
        activityTimeline: [
          {
            id: 'a1',
            activity: 'Proposal sent to client',
            timestamp: '9/27/2025 at 10:00 AM',
            duration: '20 min',
            status: 'sent',
          },
        ],
      },
      {
        id: 'd4',
        name: 'Project Management Certification Series',
        productCount: 1,
        totalValue: 8600,
        commission: 498.80,
        commissionPercent: 5.80,
        lastActivity: 'Contract signed and payment received',
        timestamp: '9/26/2025 at 09:15 AM',
        leadId: '1',
        leadCompany: 'CreativePixel Agency',
        leadContact: 'John Smith',
        salesReps: [
          { id: '1', name: 'James Nick', avatar: 'https://i.pravatar.cc/150?img=1' },
        ],
        talkingPoints: {
          fromLastCall: '18th Saturday',
          notes: 'Finalize certification program structure and payment terms.',
          bulletPoints: [
            'Review certification requirements',
            'Setup payment schedule',
          ],
        },
        activityTimeline: [
          {
            id: 'a1',
            activity: 'Contract finalized and signed',
            timestamp: '9/26/2025 at 09:00 AM',
            duration: '30 min',
            status: 'confirmed',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    companyName: 'Chennai Silk Emporium',
    contactName: 'Anita Rao',
    dealCount: 4,
    deals: [
      {
        id: 'd5',
        name: 'E-commerce Platform Integration',
        productCount: 3,
        totalValue: 15000,
        lastActivity: 'Technical requirements gathering session completed',
        timestamp: '9/29/2025 at 03:30 PM',
      },
      {
        id: 'd6',
        name: 'Inventory Management System',
        productCount: 2,
        totalValue: 8500,
        lastActivity: 'Demo scheduled for next week',
        timestamp: '9/28/2025 at 01:20 PM',
      },
      {
        id: 'd7',
        name: 'Customer Loyalty Program Setup',
        productCount: 4,
        totalValue: 6200,
        lastActivity: 'Waiting for approval from stakeholders',
        timestamp: '9/27/2025 at 10:45 AM',
      },
      {
        id: 'd8',
        name: 'Point of Sale System Upgrade',
        productCount: 1,
        totalValue: 4300,
        lastActivity: 'Installation scheduled for next month',
        timestamp: '9/25/2025 at 04:00 PM',
      },
    ],
  },
  {
    id: '3',
    companyName: 'Delhi Electronics Hub',
    contactName: 'Vikram Singh',
    dealCount: 3,
    deals: [
      {
        id: 'd9',
        name: 'Digital Marketing Campaign Package',
        productCount: 5,
        totalValue: 11000,
        lastActivity: 'First month results review completed',
        timestamp: '9/29/2025 at 05:15 PM',
      },
      {
        id: 'd10',
        name: 'Website Redesign and SEO Optimization',
        productCount: 3,
        totalValue: 9500,
        lastActivity: 'Design mockups approved by client',
        timestamp: '9/28/2025 at 11:00 AM',
      },
      {
        id: 'd11',
        name: 'Social Media Management Package',
        productCount: 2,
        totalValue: 5400,
        lastActivity: 'Content calendar for Q4 submitted',
        timestamp: '9/26/2025 at 02:30 PM',
      },
    ],
  },
  {
    id: '4',
    companyName: 'Kolkata Tea Estates',
    contactName: 'Sita Banerjee',
    dealCount: 2,
    deals: [
      {
        id: 'd12',
        name: 'Export Documentation System',
        productCount: 4,
        totalValue: 12800,
        lastActivity: 'System integration testing in progress',
        timestamp: '9/29/2025 at 01:45 PM',
      },
      {
        id: 'd13',
        name: 'Quality Control Software Package',
        productCount: 2,
        totalValue: 7600,
        lastActivity: 'Training sessions scheduled for staff',
        timestamp: '9/27/2025 at 09:20 AM',
      },
    ],
  },
  {
    id: '5',
    companyName: 'Hyderabad Biryani House',
    contactName: 'Rahul Desai',
    dealCount: 5,
    deals: [
      {
        id: 'd14',
        name: 'Online Ordering System',
        productCount: 3,
        totalValue: 8900,
        lastActivity: 'Launch date confirmed for next week',
        timestamp: '9/29/2025 at 06:00 PM',
      },
      {
        id: 'd15',
        name: 'Kitchen Management Software',
        productCount: 2,
        totalValue: 6500,
        lastActivity: 'Customization requests under review',
        timestamp: '9/28/2025 at 03:15 PM',
      },
      {
        id: 'd16',
        name: 'Delivery Fleet Tracking System',
        productCount: 4,
        totalValue: 10200,
        lastActivity: 'Pilot program running successfully',
        timestamp: '9/27/2025 at 12:30 PM',
      },
      {
        id: 'd17',
        name: 'Customer Feedback Platform',
        productCount: 1,
        totalValue: 3800,
        lastActivity: 'Integration with existing systems completed',
        timestamp: '9/26/2025 at 10:00 AM',
      },
      {
        id: 'd18',
        name: 'Franchise Management Portal',
        productCount: 5,
        totalValue: 16500,
        lastActivity: 'Requirements gathering phase completed',
        timestamp: '9/25/2025 at 02:45 PM',
      },
    ],
  },
];

/**
 * Get lead with deals by ID
 * @param {string} leadId - Lead identifier
 * @returns {Object|null} Lead object with deals or null if not found
 */
export const getLeadWithDealsById = (leadId) => {
  return sampleLeadsWithDeals.find(lead => lead.id === leadId) || null;
};

/**
 * Get all leads (for backward compatibility)
 * Returns leads without deals array
 */
export const getSimpleLeads = () => {
  return sampleLeadsWithDeals.map(lead => ({
    id: lead.id,
    companyName: lead.companyName,
    contactName: lead.contactName,
    dealCount: lead.dealCount,
  }));
};
