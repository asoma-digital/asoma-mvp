import { View, Text } from "react-native";

type StatDotProps = {
  color: string;
  tasks: string;
};

export default function StatDot({ color, tasks }: StatDotProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: `#${color}`,
          marginRight: 6,
        }}
      />
      <Text>{tasks}</Text>
    </View>
  );
}