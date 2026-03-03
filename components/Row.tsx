import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
    //style: ViewStyle, //pas nécessaire semble-t-il car inclus dans ViewProps
    gap?: number;
};

export function Row({ style, gap, ...rest }: Props) {
    return (
        <View
            {...rest}
            style={[lineStyle, style, gap ? { gap: gap } : undefined]}
        ></View>
    );
}

const lineStyle = {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
} satisfies ViewStyle;
