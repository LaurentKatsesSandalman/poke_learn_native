import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "./Row";

type Props = {
    search: string;
    onChange: (s: string) => void;
};

export function SearchBar({ search, onChange }: Props) {
    const colors = useThemeColors();
    return (
        <Row
            gap={8}
            style={[styles.container, { backgroundColor: colors.grayWhite }]}
        >
            <Image
                source={require("@/assets/images/search.png")}
                style={[styles.image, { tintColor: colors.tint }]}
            />
            <TextInput
                style={[styles.input]}
                onChangeText={onChange}
                value={search}
            />
        </Row>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        height: 42,
        paddingHorizontal: 12,
    },
    image: {
        width: 16,
        height: 16,
    },
    input: {
        flex: 1,
        height: 33,
        fontSize: 14,
        lineHeight: 14,
        color: "#000",
		// padding:0
    },
});
