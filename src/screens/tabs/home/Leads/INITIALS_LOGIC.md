# Avatar Initials Generation Logic

## Function Overview

The `getInitials()` function generates 2-letter initials from company names to display in the avatar circles.

## Logic Rules

### Rule 1: Multi-Word Company Names (≥2 words)
**Pattern**: Take the first letter of the first two words
**Case**: Convert to uppercase

#### Examples:
| Company Name | Initials | Explanation |
|--------------|----------|-------------|
| CreativePixel Agency | **CA** | **C**reativePixel + **A**gency |
| Chennai Silk Emporium | **CS** | **C**hennai + **S**ilk |
| Hyderabad Biryani House | **HB** | **H**yderabad + **B**iryani |
| Pune IT Solutions | **PI** | **P**une + **I**T |
| Mumbai Real Estate Corp | **MR** | **M**umbai + **R**eal |
| Bangalore Tech Hub | **BT** | **B**angalore + **T**ech |
| Delhi Fashion House | **DF** | **D**elhi + **F**ashion |
| Kolkata Trading Company | **KT** | **K**olkata + **T**rading |

### Rule 2: Single-Word Company Names (1 word, ≥2 characters)
**Pattern**: Take the first two letters of the word
**Case**: Convert to uppercase

#### Examples:
| Company Name | Initials | Explanation |
|--------------|----------|-------------|
| Microsoft | **MI** | **Mi**crosoft |
| Apple | **AP** | **Ap**ple |
| Google | **GO** | **Go**ogle |
| Amazon | **AM** | **Am**azon |
| Facebook | **FA** | **Fa**cebook |
| Tesla | **TE** | **Te**sla |
| Oracle | **OR** | **Or**acle |

### Rule 3: Edge Cases
**Pattern**: Handle unusual or invalid inputs gracefully
**Fallback**: Return "LD" (Lead Default)

#### Examples:
| Company Name | Initials | Explanation |
|--------------|----------|-------------|
| null | **LD** | Null/undefined fallback |
| "" (empty string) | **LD** | Empty string fallback |
| "   " (whitespace) | **LD** | Whitespace-only fallback |
| "X" (single character) | **XX** | Duplicate single character |
| "A B" (single letters) | **AB** | First letter of each word |

## Code Implementation

```javascript
const getInitials = (companyName) => {
  if (!companyName) return 'LD'; // Lead Default

  const words = companyName.trim().split(' ').filter(word => word.length > 0);

  if (words.length >= 2) {
    // Take first letter of first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    // Take first two letters of single word
    return words[0].substring(0, 2).toUpperCase();
  } else if (words.length === 1) {
    // Single character company name (rare case)
    return (words[0][0] + words[0][0]).toUpperCase();
  }

  return 'LD'; // Fallback
};
```

## Testing Matrix

### Test Cases

```javascript
// Multi-word names
getInitials('CreativePixel Agency')        // Expected: "CA"
getInitials('Chennai Silk Emporium')       // Expected: "CS"
getInitials('Hyderabad Biryani House')     // Expected: "HB"

// Single-word names
getInitials('Microsoft')                   // Expected: "MI"
getInitials('Apple')                       // Expected: "AP"
getInitials('Google')                      // Expected: "GO"

// Edge cases
getInitials('X')                           // Expected: "XX"
getInitials('IBM')                         // Expected: "IB"
getInitials('   ')                         // Expected: "LD"
getInitials('')                            // Expected: "LD"
getInitials(null)                          // Expected: "LD"
getInitials(undefined)                     // Expected: "LD"

// Special characters (if applicable)
getInitials('Tech & Co')                   // Expected: "TC"
getInitials('A-1 Solutions')               // Expected: "AS"
```

## Visual Output

### Avatar Display Examples

```
┌──────┐
│  CA  │  CreativePixel Agency
└──────┘

┌──────┐
│  CS  │  Chennai Silk Emporium
└──────┘

┌──────┐
│  HB  │  Hyderabad Biryani House
└──────┘

┌──────┐
│  MI  │  Microsoft
└──────┘

┌──────┐
│  LD  │  (No company name)
└──────┘
```

## Design Notes

### Typography
- **Font**: Inter-Bold (16px)
- **Color**: #0F1010 (theme.colors.night)
- **Alignment**: Center (both horizontal and vertical)
- **Letter Spacing**: Default

### Avatar Circle
- **Size**: 48×48px
- **Background**: #E8E8E8 (light gray)
- **Border Radius**: 24px (perfect circle)
- **Position**: Left side of card, 12px margin-right

## Future Enhancements

### Potential Improvements

1. **Color Coding**
   - Assign consistent colors to initials based on hash
   - Use vibrant color palette for better distinction
   - Example: "CA" always gets blue, "CS" always gets green

2. **Logo Support**
   - Add `logoUrl` field to lead data
   - Show logo if available, fallback to initials
   - Cache logos for performance

3. **Initials Style Variations**
   - Bold vs Regular weight options
   - Different font sizes based on text length
   - Custom color schemes per client preference

4. **Multi-Language Support**
   - Handle non-Latin characters (Arabic, Chinese, etc.)
   - Unicode-aware text processing
   - Right-to-left language support

## References

- Component: `/src/screens/tabs/home/Leads/LeadsList.jsx`
- Sample Data: `/src/screens/tabs/home/Leads/sampleData.js`
- Theme: `/src/theme/theme.js`
- Typography: `/src/theme/typography.js`
