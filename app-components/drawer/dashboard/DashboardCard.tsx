import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';



import type { LinkProps } from 'expo-router';

type DashboardCardProps = {
  color1: string;
  color2: string;
  icon: ReactNode;
  title: string;
  description: string;
  link: LinkProps['href'];
  buttonText: string;
};

export default function DashboardCard({ color1, color2, icon, title, description, link, buttonText }: DashboardCardProps) {
  return (
    <View style={styles.card}>
    <LinearGradient
      colors={[color1, color2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.iconContainer}
    >
      {icon}
    </LinearGradient>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <LinearGradient
      colors={[color1, color2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.button}
      >
        <Link href={link} asChild>
          <Pressable>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        </Link>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    height: 290,
    paddingHorizontal: 95,
    paddingVertical: 32,
    flexDirection: 'column',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 8 },
    flex: 1,
    maxWidth: 562,
  },
  iconContainer: {
    display: 'flex',
    width: 60,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 11,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    borderRadius: 16,
  },
  title: {
    marginBottom: 10,
    color: '#020817',
    textAlign: 'center',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  description: {
    marginBottom: 16,
    color: '#020817B2',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  button: {
    borderRadius: 8,
    width: "100%",
    boxShadow: "0px 4px 16px rgba(4, 134, 190, 0.3)",
    elevation: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 9,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"
  },
});