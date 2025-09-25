// styles/dashboardStyles.ts

import { StyleSheet } from 'react-native';

const dashboardStyles = StyleSheet.create({
  container: {
    padding: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 64,
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#020817',
    textAlign: 'center',
    fontSize: 48,
    fontWeight: '600',
    lineHeight: 72,
    letterSpacing: -1,
  },
  card: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    maxWidth: 1162,
    boxShadow: "0px 12px 48px rgba(0, 0, 0, 0.08)",
    elevation: 48,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1,
    height: 544,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 24,
    padding: 32
  },
cardHeader: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', // puts the two children on opposite ends
  alignItems: 'center',
  width: '100%',
},
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'left',
    color: '#020817',
    fontStyle: 'normal',
    lineHeight: 48,
    letterSpacing: -0.8,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#02081799',
    fontStyle: 'normal',
    lineHeight: 24,
  },
  cardStatsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 33,
    
  },
  taskText: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    color: 'black',
    textAlign: 'left',
    borderColor: '#04BDE728',
    borderWidth: 2,
    width: '100%'
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskTextEmpty: {
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  topTwo: {
  display: 'flex',
  flexDirection: 'row',
  gap: 32,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
},
button: {
    borderRadius: 8,
    width: 112,
    boxShadow: "0px 4px 16px rgba(4, 134, 190, 0.3)",
    elevation: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 9,
    height: 34,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center"
  },
  dots: {
    display: 'flex',
    flexDirection: 'row',
    gap: 22
  }
});

export default dashboardStyles;