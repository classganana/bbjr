import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const DashboardStyle = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: Colors.primary,
    },
    header: {
        height: 66,
        width: "100%",
        backgroundColor: Colors.primary,
        color: Colors.white,
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // gap: 12,
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
    brand: {
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
        height: 310,
        backgroundColor: '#F0F2F580',
        paddingVertical: 12,
        paddingHorizontal: 14
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1/2,
        marginBottom: 20
    },
    viewAllBlock: {
      borderBlockColor: Colors.primary,
      borderBottomWidth: 1
    },
    viewAllText: {
      fontWeight: '500',
      color: Colors.primary
    },
    optionsCard: {
      width: "100%",
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
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
      height: 140,
      padding: 14,
      backgroundColor: '#F0F6F8', // You can adjust this background color if needed
      shadowColor: Colors.black_03, // Use your shadow color
      shadowOffset: {
        width: 0,
        height: 0, // Adjust this value to control the shadow's vertical offset
      },
      shadowOpacity: 0.1,
      shadowRadius: 4, // Adjust this value to control the shadow's spread
      elevation: 4,
      // height: 150,
      width: '100%',
      borderRadius: 12,
    },
    botBlockDesc: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    headerBotGif: {
      height: 150, 
      width: 100
    }, 
    botGif: {
      position:"relative",
      bottom: -20,
      right: -20,
      height: 110, 
      width: 100
    },
    yourAssistant: {
      color: "#E5FF7F"
    },
    leaderBoardSection: {
      flexDirection: 'row',
      alignItems: "center",
      borderRadius: 6,
      borderWidth: 0.5,
      borderColor: 'rgba(0, 107, 127, 0.40)',
      backgroundColor: '#FFF',
      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
      gap: 12
    },
    continuePractice: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    explore: {
      color: Colors.primary,
      fontWeight: '500'
    }

})