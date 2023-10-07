import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const DashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    header: {
        height: 150,
        width: "100%",
        backgroundColor: Colors.primary,
        color: Colors.white,
        paddingHorizontal: 24,
        paddingTop: 34,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        ...Platform.select({
            ios: {
            shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 2,
              shadowRadius: 4,
            },
            android: {
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 8,
            },
          }),
    },
    hello: {
        color: "#E3F5FF",
        fontSize: 24
    },
    profilePhoto: {
        marginTop: 14,
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'red'
    },
    userDetails: {
        color: Colors.white,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        paddingVertical: 10,
    },
    userName: {
        color: Colors.white,
        fontSize: 18
    },
    userOtherDetails: {
        fontSize: 14,
        color: Colors.white
    },
    body: {
        width: "100%",
        backgroundColor: Colors.white,
        paddingHorizontal: 26,
        paddingTop: 8,
        flex: 1,
        gap:10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    leaderboardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leaderboardHeaderText: {
        fontWeight: "500",
        fontSize: 18
    },
    leaderBoardBody: {
        width: "100%",
        flexShrink: 0,
        borderRadius: 12,
        backgroundColor: "#006B7F14",
        paddingHorizontal: 14,
        paddingVertical: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    leaderBoardBodyDetails: {
        display: 'flex',
        gap: 1,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    leaderBoardBodyDetailsLevel: {
      fontSize: 22,
      fontWeight: "600",
      color: Colors.black_01
    },
    leaderBoardBodyPoints: {
      color: "rgba(0, 0, 0, 0.30)",
      fontWeight: "600"
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        backgroundColor: 'white',
    },
    optionHeading: {
      fontSize: 16,
      fontWeight: '500'
    },
    optionCard: {
      width: "47%",
      height: 220,
    },
    optionCardHeading: {
      fontSize: 16,
      color: "#4E4E4E",
      fontWeight: '500',
      marginBottom: 6
    },
    option: {
      width: "100%",
      height: 220,
      flex: 1,
      display: 'flex',
      padding: 12,
      borderRadius:20,
      gap: 25,
      backgroundColor: 'white', // Set a non-transparent background color
      shadowColor: Colors.black_03,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    optionHeader: {
      width: '100%',
      height: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionHeaderText: {
      fontSize: 22,
      fontWeight: "600"
    },
    optionHeaderInfoText: {
          fontSize: 12,
          fontWeight: "500",
          color: "#9098A3"
    },
    optionBodyDescription: {
      fontSize: 14,
      color: '#676767'
    },
    botHeading: {
      color: "#000",
      fontWeight: "500",
      fontSize: 18
    },
    botBlock: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: "#2E8494",
      height: 150,
      width: "100%",
      borderRadius: 12,
    },
    botGif: {
      right: 0,
      height: 150, 
      width: 100
    },
    yourAssistant: {
      color: "#E5FF7F"
    }

})