import { useState } from 'react';
import { Box, Text } from '@mantine/core';
import FoodFinder from "@/components/forms/FoodFinder";
import Election from "@/components/forms/Election";

const SimpleTabs = ({ theme }: { theme: string }) => {
  const [activeTab, setActiveTab] = useState<'foodfinder' | 'election'>('foodfinder');

  return (
    <Box>
      <Box style={{ display: 'flex', borderBottom: '1px solid #333', marginBottom: '1rem' }}>
        <Box 
          onClick={() => setActiveTab('foodfinder')}
          style={{ 
            padding: '0.5rem 1rem', 
            cursor: 'pointer',
            borderBottom: activeTab === 'foodfinder' ? `2px solid var(--mantine-color-${theme}-filled)` : 'none',
            color: activeTab === 'foodfinder' ? `var(--mantine-color-${theme}-filled)` : 'inherit'
          }}
        >
          <Text>FoodFinder</Text>
        </Box>
        <Box 
          onClick={() => setActiveTab('election')}
          style={{ 
            padding: '0.5rem 1rem', 
            cursor: 'pointer',
            borderBottom: activeTab === 'election' ? `2px solid var(--mantine-color-${theme}-filled)` : 'none',
            color: activeTab === 'election' ? `var(--mantine-color-${theme}-filled)` : 'inherit'
          }}
        >
          <Text>Election</Text>
        </Box>
      </Box>

      <Box style={{ padding: '1rem 0' }}>
        {activeTab === 'foodfinder' && <FoodFinder theme={theme} />}
        {activeTab === 'election' && <Election theme={theme} />}
      </Box>
    </Box>
  );
};

export default SimpleTabs;