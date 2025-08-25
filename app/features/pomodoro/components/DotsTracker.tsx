// app/(drawer)/pomodoro/components/DotsTracker.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

type DotsTrackerProps = {
  totalDots: number;
  activeIndex: number;
  dotColor?: string;
};

export default function DotsTracker({
  totalDots,
  activeIndex,
  dotColor = '#123dd8', // fallback to clarifi primary blue
}: DotsTrackerProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index < activeIndex ? dotColor : '#ccc',
              opacity: index < activeIndex ? 1 : 0.3,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});