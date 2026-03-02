import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { /*StyleSheet,*/ View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
	const colors = useThemeColors()
    return <View style={[style, styles, {backgroundColor: colors.grayWhite}]} {...rest} />;
}

// const styyles = StyleSheet.create({
//     stylesheet1: { backgroundColor: "#FFF", borderRadius: 8 },
// });

const styles = {
    
    borderRadius: 8,
	overflow:'hidden',
	...Shadows.dp2
} satisfies ViewStyle;
