import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { ThemedText } from "./ThemedText";
import { Row } from "./Row";
import { Radio } from "./Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
    sorter: "id" | "name";
    onChange: (f: "id" | "name") => void;
};

const options = [
	{label:"Number", value:"id"},
	{label:"Name", value:"name"}
] as const

export function SortButton({ sorter, onChange }: Props) {
    
	const buttonRef = useRef<View>(null)
	
	const colors = useThemeColors();

    const [isModalOn, setIsModalOn] = useState(false);

	const [position, setPosition]= useState<null|{top:number, right:number}>(null)

    const onOpen = () => {
		buttonRef.current?.measureInWindow((x,y,width,height)=>{
			setPosition({
				top: y+height,
				right: Dimensions.get("window").width - x - width
			})
			setIsModalOn(true);
		})
        
    };
    const onClose = () => {
        setIsModalOn(false);
    };

    return (
        <>
            <Pressable onPress={onOpen}>
                <View
					ref={buttonRef}
                    style={[
                        styles.button,
                        { backgroundColor: colors.grayWhite },
                    ]}
                >
                    <Image
                        source={
                            sorter === "id"
                                ? require("@/assets/images/tag.png")
                                : require("@/assets/images/text_format.png")
                        }
                        style={[styles.image, { tintColor: colors.tint }]}
                    />
                </View>
            </Pressable>
            <Modal 
			animationType="fade"
			transparent visible={isModalOn} onRequestClose={onClose}>
                <Pressable style={styles.backdrop} onPress={onClose} />
                <View style={[styles.popup, { backgroundColor: colors.tint, ...position }]}>
                    <ThemedText
                        variant="subtitle2"
                        color="grayWhite"
                        style={styles.title}
                    >
                        Sort by:
                    </ThemedText>
                    <Card style={styles.card}>
						{options.map((option)=>(
							<Pressable key={option.value} onPress={()=>onChange(option.value)}>
							<Row  gap={8}>
								<Radio checked={option.value===sorter} />
								<ThemedText>{option.label}</ThemedText>

							</Row></Pressable>
						))}

					</Card>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 16,
        height: 16,
        // margin:'auto'
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    popup: {
		position:'absolute',
		width:113,
        borderRadius: 12,
        padding: 4,
        paddingTop: 16,
        gap: 16,
		...Shadows.dp2
    },
    title: {
        paddingLeft: 20,
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
    },
});
