export const getChartColor = (index: number): string => {
  const colors = [
    '#9b87f5', // Primary Purple
    '#7E69AB', // Secondary Purple
    '#6E59A5', // Tertiary Purple
    '#D6BCFA', // Light Purple
    '#F2FCE2', // Soft Green
    '#FEF7CD', // Soft Yellow
    '#FEC6A1', // Soft Orange
    '#E5DEFF', // Soft Purple
    '#FFDEE2', // Soft Pink
    '#FDE1D3', // Soft Peach
    '#D3E4FD', // Soft Blue
    '#F1F0FB', // Soft Gray
    '#8B5CF6', // Vivid Purple
    '#D946EF', // Magenta Pink
    '#F97316', // Bright Orange
    '#0EA5E9'  // Ocean Blue
  ];
  return colors[index % colors.length];
};