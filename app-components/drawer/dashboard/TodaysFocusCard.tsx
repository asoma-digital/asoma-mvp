import { View, Text} from 'react-native';

export default function TodaysFocusCard() {
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    );
}

// const TodaysFocus = () => {

// return (
//     <View style={[styles.view, ]}>
//         <View style={styles.header}>
//             <View style={styles.titleAndDescr}>
//                 <Text style={styles.todaysFocus2}>Today's Focus</Text>
//                 <Text style={styles.yourTopPriorities}>Your top priorities for maximum productivity</Text>
//             </View>
//             <View style={styles.tasksInfoBar}>
//                 <View style={[styles.dots, styles.dotsLayout]}>
//                     <View style={[styles.completedDot, styles.dotLayout]}>
//                         <View style={[styles.rectangle, styles.rectangleLayout2]} />
//                             <Text style={[styles.text, styles.textTypo1]}>0</Text>
//                         </View>
//     <View style={[styles.remainingDot, styles.dotsLayout]}>
//     <LinearGradient style={[styles.todaysFocusRectangle, styles.rectangleBg]} locations={[1,0.5,0]} colors={['#ff6b9d','#ff8a65','#fffd71']} useAngle={true} angle={90} />
//     <Text style={[styles.todaysFocusText, styles.textTypo1]}>3</Text>
//     </View>
//     <View style={[styles.totalDot, styles.dotLayout]}>
//     <View style={[styles.rectangle2, styles.rectangleLayout2]} />
//     <Text style={[styles.text, styles.textTypo1]}>3</Text>
//     </View>
//     </View>
//     <View style={[styles.addTaskButton, styles.rectangle3Layout]}>
//     <LinearGradient style={[styles.rectangle3, styles.rectangle3Layout]} locations={[1,0]} colors={['#0486be','#04bde7']} useAngle={true} angle={90} />
//     <Component style={styles.frameIcon} width={15} height={15} />
//     <Text style={styles.addTask}>Add Task</Text>
//     </View>
//     </View>
//     </View>
//     <View style={styles.topThreeTasks}>
//     <View style={[styles.task, styles.taskLayout]}>
//     <LinearGradient style={[styles.rectangle4, styles.rectangleLayout1]} locations={[1,0]} colors={['rgba(106, 234, 251, 0.2)','rgba(4, 189, 231, 0.4)']} useAngle={true} angle={90} />
//     <View style={[styles.rectangle5, styles.rectanglePosition1]} />
//     <View style={styles.rectangle6} />
//     <Text style={[styles.draftWireframesFor, styles.taskTextTypo]}>Draft wireframes for new dashboard</Text>
//     <View style={[styles.rectangle7, styles.iconLayout1]} />
//     <Component1 style={[styles.todaysFocusFrameIcon, styles.frameIconPosition1]} width={15} height={15} />
//     <View style={[styles.rectangle8, styles.iconLayout1]} />
//     <Component2 style={[styles.frameIcon2, styles.frameIconPosition1]} width={15} height={15} />
//     </View>
//     <View style={[styles.todaysFocusTask, styles.taskLayout]}>
//     <LinearGradient style={[styles.rectangle4, styles.rectangleLayout1]} locations={[1,0]} colors={['rgba(106, 234, 251, 0.2)','rgba(4, 189, 231, 0.4)']} useAngle={true} angle={90} />
//     <View style={[styles.rectangle5, styles.rectanglePosition1]} />
//     <View style={[styles.rectangle11, styles.checkBoxBorder]} />
//     <Text style={[styles.reviewPullRequests, styles.taskTextTypo]}>Review pull requests from team</Text>
//     <View style={[styles.rectangle7, styles.iconLayout1]} />
//     <Component3 style={[styles.frameIcon3, styles.frameIconPosition]} width={15} height={15} />
//     <View style={[styles.rectangle8, styles.iconLayout1]} />
//     <Component4 style={[styles.frameIcon4, styles.frameIconPosition]} width={15} height={15} />
//     </View>
//     <View style={[styles.task2, styles.task2Layout]}>
//     <LinearGradient style={[styles.rectangle14, styles.task2Layout]} locations={[1,0]} colors={['rgba(106, 234, 251, 0.2)','rgba(4, 189, 231, 0.4)']} useAngle={true} angle={90} />
//     <View style={[styles.rectangle15, styles.rectanglePosition1]} />
//     <View style={[styles.checkBox, styles.checkBoxBorder]} />
//     <Text style={[styles.taskText, styles.taskTextTypo]}>Plan the next sprint goals</Text>
//     <View style={[styles.iconsBar, styles.iconLayout]}>
//     <Component5 style={[styles.checkIcon, styles.iconLayout]} width={34} height={33} />
//     <Component6 style={[styles.trashIcon, styles.iconLayout]} width={34} height={33} />
//     </View>
//     </View>
//     </View>
//     <View style={styles.dividerLayout}>
//     <View style={[styles.divider, styles.dividerLayout]} />
//     <View style={styles.statsIcons}>
//     <View style={[styles.completed, styles.completedLayout]}>
//     <LinearGradient style={[styles.rectangle16, styles.rectangleLayout]} locations={[1,0]} colors={['#059669','#10b981']} useAngle={true} angle={90} />
//     <Text style={[styles.text3, styles.textTypo]}>0</Text>
//     <Text style={[styles.todaysFocusCompleted, styles.todaysTypo]}>Completed</Text>
//     </View>
//     <View style={[styles.remaining, styles.remainingLayout]}>
//     <Component7 style={styles.rectangleIcon} width={46} height={45} />
//     <Text style={[styles.text4, styles.textTypo]}>3</Text>
//     <Text style={[styles.todaysFocusRemaining, styles.remainingLayout]}>Remaining</Text>
//     </View>
//     <View style={[styles.total, styles.totalLayout]}>
//     <LinearGradient style={[styles.rectangle17, styles.rectangleLayout]} locations={[1,0]} colors={['#4b5563','#6b7280']} useAngle={true} angle={90} />
//     <Text style={[styles.text5, styles.textTypo]}>3</Text>
//     <Text style={[styles.todaysFocusTotal, styles.totalLayout]}>Total</Text>
//     </View>
//     </View>
//     </View>
//     </View>
// };

// const styles = StyleSheet.create({
// todaysFocus: {
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.9)"
// },
// dotsLayout: {
//     height: 20,
//     position: "absolute"
// },
// dotLayout: {
//     width: 29,
//     height: 20,
//     top: 0,
//     position: "absolute"
// },
// rectangleLayout2: {
//     height: 11,
//     borderRadius: 16777200,
//     top: 4,
//     position: "absolute"
// },
// textTypo1: {
//     color: "rgba(2, 8, 23, 0.7)",
//     fontFamily: "Inter-Medium",
//     fontWeight: "500",
//     lineHeight: 21,
//     fontSize: 14,
//     left: 19,
//     height: 20,
//     textAlign: "left",
//     top: 0,
//     position: "absolute"
// },
// rectangleBg: {
//     backgroundColor: "transparent",
//     left: 0
// },
// rectangle3Layout: {
//     width: 112,
//     height: 34,
//     top: 0,
//     position: "absolute"
// },
// taskLayout: {
// height: 78,
// left: 0,
// position: "absolute",
// width: 1099
// },
// rectangleLayout1: {
// borderRadius: 16,
// backgroundColor: "transparent",
// top: 0
// },
// rectanglePosition1: {
// width: 1095,
// backgroundColor: "#fff",
// borderRadius: 14,
// left: 2,
// top: 2,
// position: "absolute"
// },
// taskTextTypo: {
// left: 57,
// top: 28,
// fontFamily: "Inter-Medium",
// fontWeight: "500",
// lineHeight: 24,
// fontSize: 16,
// textAlign: "left",
// color: "#020817",
// position: "absolute"
// },
// iconLayout1: {
// width: 34,
// borderRadius: 8
// },
// frameIconPosition1: {
// top: 31,
// height: 15,
// width: 15,
// position: "absolute"
// },
// checkBoxBorder: {
// top: 30,
// width: 19,
// borderWidth: 2,
// borderColor: "#04bde7",
// left: 23,
// borderRadius: 16777200,
// position: "absolute",
// borderStyle: "solid"
// },
// frameIconPosition: {
// top: 32,
// height: 15,
// width: 15,
// position: "absolute"
// },
// task2Layout: {
// height: 79,
// left: 0,
// position: "absolute",
// width: 1099
// },
// iconLayout: {
// height: 33,
// position: "absolute"
// },
// dividerLayout: {
// height: 115,
// width: 1099
// },
// completedLayout: {
// width: 122,
// position: "absolute"
// },
// rectangleLayout: {
// width: 45,
// borderRadius: 12,
// backgroundColor: "transparent",
// height: 45,
// top: 0,
// position: "absolute"
// },
// textTypo: {
// height: 25,
// fontFamily: "Inter-Bold",
// fontWeight: "700",
// lineHeight: 27,
// fontSize: 18,
// top: 10,
// textAlign: "center",
// color: "#fff",
// position: "absolute"
// },
// todaysTypo: {
//     height: 17,
//     lineHeight: 18,
//     fontSize: 12,
//     top: 52,
//     textAlign: "center",
//     fontFamily: "Inter-Medium",
//     fontWeight: "500",
//     color: "rgba(2, 8, 23, 0.6)",
//     left: 0
// },
// remainingLayout: {
// width: 77,
// position: "absolute"
// },
// totalLayout: {
//     width: 58,
//     position: "absolute"
// },
// header: {
//     height: 75,
//     width: 1099
// },
// titleAndDescr: {
//     width: 350,
//     left: 0,
//     top: 0,
//     position: "absolute",
//     height: 75
// },
// todaysFocus2: {
//     fontSize: 32,
//     letterSpacing: -0.8,
//     lineHeight: 48,
//     fontWeight: "600",
//     fontFamily: "Inter-SemiBold",
//     width: 329,
//     height: 45,
//     textAlign: "left",
//     color: "#020817",
//     left: 0,
//     top: 0,
//     position: "absolute"
// },
// yourTopPriorities: {
//     top: 53,
//     fontFamily: "Inter-Regular",
//     height: 22,
//     color: "rgba(2, 8, 23, 0.6)",
//     lineHeight: 24,
//     fontSize: 16,
//     textAlign: "left",
//     width: 350,
//     left: 0,
//     position: "absolute"
// },
// tasksInfoBar: {
// top: 21,
// left: 825,
// width: 274,
// height: 34,
// position: "absolute"
// },
// dots: {
// width: 129,
// top: 7,
// height: 20,
// left: 0
// },
// completedDot: {
// left: 0
// },
// rectangle: {
// backgroundColor: "#10b981",
// width: 12,
// left: 0
// },
// text: {
// width: 10
// },
// remainingDot: {
// left: 51,
// width: 28,
// top: 0
// },
// todaysFocusRectangle: {
// width: 11,
// height: 11,
// borderRadius: 16777200,
// top: 4,
// position: "absolute"
// },
// todaysFocusText: {
// width: 9
// },
// totalDot: {
// left: 100
// },
// rectangle2: {
// backgroundColor: "#6b7280",
// width: 11,
// left: 0
// },
// addTaskButton: {
// left: 162
// },
// rectangle3: {
// boxShadow: "0px 2px 8px rgba(4, 134, 190, 0.25)",
// elevation: 8,
// borderRadius: 10,
// backgroundColor: "transparent",
// left: 0
// },
// frameIcon: {
// top: 9,
// left: 15,
// height: 15,
// width: 15,
// position: "absolute"
// },
// addTask: {
// left: 36,
// textAlign: "center",
// color: "#fff",
// fontFamily: "Inter-Medium",
// fontWeight: "500",
// lineHeight: 21,
// fontSize: 14,
// top: 7,
// position: "absolute"
// },
// topThreeTasks: {
// height: 257,
// width: 1099
// },
// task: {
// top: 0
// },
// rectangle4: {
// height: 78,
// left: 0,
// position: "absolute",
// width: 1099
// },
// rectangle5: {
// height: 74
// },
// rectangle6: {
// top: 29,
// height: 19,
// width: 19,
// borderWidth: 2,
// borderColor: "#04bde7",
// left: 23,
// borderRadius: 16777200,
// position: "absolute",
// borderStyle: "solid"
// },
// draftWireframesFor: {
// width: 317,
// height: 22
// },
// rectangle7: {
// backgroundColor: "rgba(4, 189, 231, 0.1)",
// left: 1000,
// top: 22,
// borderRadius: 8,
// height: 34,
// position: "absolute"
// },
// todaysFocusFrameIcon: {
// left: 1010
// },
// rectangle8: {
// left: 1042,
// backgroundColor: "rgba(239, 68, 68, 0.1)",
// top: 22,
// borderRadius: 8,
// height: 34,
// position: "absolute"
// },
// frameIcon2: {
// left: 1051
// },
// todaysFocusTask: {
// top: 89
// },
// rectangle11: {
// height: 18
// },
// reviewPullRequests: {
// width: 272,
// height: 22
// },
// frameIcon3: {
// left: 1010
// },
// frameIcon4: {
// left: 1051
// },
// task2: {
// top: 178
// },
// rectangle14: {
// borderRadius: 16,
// backgroundColor: "transparent",
// top: 0
// },
// rectangle15: {
// height: 75
// },
// checkBox: {
// height: 19
// },
// taskText: {
// width: 245,
// height: 23
// },
// iconsBar: {
// top: 23,
// width: 76,
// left: 1000
// },
// checkIcon: {
// width: 34,
// borderRadius: 8,
// left: 0,
// top: 0
// },
// trashIcon: {
// left: 42,
// width: 34,
// borderRadius: 8,
// top: 0
// },
// divider: {
// borderColor: "rgba(2, 8, 23, 0.08)",
// borderTopWidth: 1,
// left: 0,
// top: 0,
// position: "absolute",
// borderStyle: "solid"
// },
// statsIcons: {
// top: 34,
// left: 407,
// width: 261,
// height: 69,
// position: "absolute"
// },
// completed: {
// height: 69,
// left: 0,
// top: 0
// },
// rectangle16: {
// left: 38
// },
// text3: {
// left: 55,
// width: 12
// },
// todaysFocusCompleted: {
// width: 122,
// position: "absolute"
// },
// remaining: {
// left: 112,
// height: 69,
// top: 0
// },
// rectangleIcon: {
// left: 16,
// width: 46,
// borderRadius: 12,
// height: 45,
// top: 0,
// position: "absolute"
// },
// text4: {
// left: 33,
// width: 11
// },
// todaysFocusRemaining: {
// height: 17,
// lineHeight: 18,
// fontSize: 12,
// top: 52,
// textAlign: "center",
// fontFamily: "Inter-Medium",
// fontWeight: "500",
// color: "rgba(2, 8, 23, 0.6)",
// left: 0
// },
// total: {
// left: 203,
// height: 69,
// top: 0
// },
// rectangle17: {
// left: 6
// },
// text5: {
// left: 24,
// width: 11
// },
// todaysFocusTotal: {
// height: 17,
// lineHeight: 18,
// fontSize: 12,
// top: 52,
// textAlign: "center",
// fontFamily: "Inter-Medium",
// fontWeight: "500",
// color: "rgba(2, 8, 23, 0.6)",
// left: 0
// }
// });

// export default TodaysFocus;
