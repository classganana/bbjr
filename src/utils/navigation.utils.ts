import { NavigationProp } from "@react-navigation/native";

export const navigateTo = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return {
    navigateToDashboard: () => {
      navigation.navigate("DashboardNavigator" as never);
    },
    navigateBack: () => {
      navigation.goBack();
    },
  };
};
