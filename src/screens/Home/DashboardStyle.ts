import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const DashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.primary,
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
        paddingHorizontal: 20,
        paddingTop: 8,
        flex: 1,
        gap:10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    leaderboardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
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
        // height: 330,
        backgroundColor: '#F5F7FF',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginBottom: 20
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 5,
        // borderBottomColor: Colors.primary,
        // borderBottomWidth: 1/2,
        marginBottom: 10
    },
    viewAllBlock: {
      borderBlockColor: Colors.primary,
      borderBottomWidth: 0,
      marginTop: 6,
      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.10))",
    },
    viewAllText: {
      fontWeight: '500',
      color: Colors.primary
    },
    optionsCard: {
      // background: "linearGradient(180deg, #FFF 0%, #4BAE4F 100%)",
      width: "100%",
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      padding: 10,
    },
    optionHeading: {
      fontSize: 16,
      fontWeight: '500'
    },
    optionCard: {
      width: "47%",
    },
    optionCardHeading: {
      fontSize: 16,
      color: "#4E4E4E",
      fontWeight: '600',
      marginTop: 10
    },
    option: {
      width: "100%",
      // height: 150,
      flex: 1,
      display: 'flex',
      padding: 12,
      borderRadius:22,
      // gap: 10,
      backgroundColor: 'white', // Set a non-transparent background color
      shadowColor: Colors.black_03,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1/2,
      paddingVertical: 20,
      // justifyContent: 'space-evenly',
      borderColor: Colors.primary,
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
      paddingHorizontal: 1
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
      color: Colors.dark_gray_06,
      paddingHorizontal: 1
    },
    botHeading: {
      color: "#000",
      fontWeight: "500",
      fontSize: 14,
      marginBottom: 12,
    },
    botheadingInfo: {
      fontSize: 12
    },
    botBlock: {
      borderColor: "#2947D4",
      marginBottom: 12,
      alignSelf: 'center',
      width: '98%',
      minHeight: 160,
      padding: 16,
      paddingHorizontal: 20,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: Colors.black_03,
      borderWidth: 0.4,
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
      
    },
    botBlockDesc: {
      flex: 10,
      marginTop: "10%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerBotGif: {
      height: 150, 
      width: 100
    }, 
    botGif: {
      flex: 2,
      position: "absolute",
      top: "0%",
      right: "5%",
      height: 80, 
      width: 80
    },
    yourAssistant: {
      color: "#E5FF7F"
    },
    leaderBoardSection: {
      width: "100%",
      flexDirection: 'row',
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: '#FFF',
      paddingHorizontal: 12,
      paddingVertical: 8,
      gap: 12
    },
    continuePractice: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft:10,
      marginVertical: 10,
      marginTop: 20
    },
    explore: {
      color: Colors.primary,
      fontWeight: '500'
    },
    boostYourKnowledge : {
        // marginTop: 10,
        fontWeight: '500',
        fontSize: 18
    },
    pendingQuizzesList : {
      paddingHorizontal: 4,
      paddingVertical: 4
    },
    view1: {
      alignItems: "stretch",
      borderRadius: 8,
      backgroundColor: "#EFF2FF",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20,
      paddingHorizontal: 12,
      paddingVertical: 8,
      width: "100%",
      marginBottom: 16,
      marginTop: 16
    },
    view2: {
      color: "#424242",
      width: 256,
      fontWeight: '400',
    },
    image1: {
      // overflow: "hidden",
      alignSelf: "center",
      // position: "relative",
      // display: "flex",
      width: 14,
      height:14,
      // flexShrink: 0,
      // maxWidth: "100%",
      // flexDirection: "column",
      // marginVertical: 'auto',
      // marginHorizontal: 0,
      // aspectRatio: "1.08",
    },
    solveAnyDoubts : {
      fontWeight: '500',
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 4,
      
  },
  circularDiv : {
    width: 35,  // Set the width of your circular div
    height: 35, // Set the height of your circular div
    borderRadius: 50, // Set the borderRadius to half of the width or height
    //backgroundColor: 'blue',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    borderWidth: 2,  
    borderColor: 'white',
    
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: -4 }, // Adjust the height for downward shadow
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5, // Elevation (for Android)
  },
    promptText: {
      flexDirection: 'row',
      fontSize: 14,
      fontWeight: "400",
      top: 10,
      lineHeight: 20
    },
    avatarImage: {
      height: 50,
      width: 50,
      borderRadius: 60, // Make it circular
    },
    botButton: {
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 10
    },
    botButtonText: {
      color: Colors.white,
    }
})