import { Text, View } from "react-native";
import { BadgeComponentStyle } from "./BadgeComponentStyle";

const BadgeComponent: React.FC<any> = (props: any) => {
  return (
    <>
      <View style={BadgeComponentStyle.container}>
        <Text style={BadgeComponentStyle.badgeIcon}>
          {props.bagdeNumber > 0 ? props.bagdeNumber : ""}
        </Text>
        {props.icon}
      </View>
    </>
  );
};

export default BadgeComponent;
