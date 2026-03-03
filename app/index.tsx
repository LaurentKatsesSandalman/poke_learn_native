import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemon";
import {
    /*useFetchQuery,*/ useInfiniteFetchQuery,
} from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
// import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const colors = useThemeColors();
    // const pokemons = Array.from({length:35}, (_,k)=>({name: "Pokémon Name", id: k+1}))
 const [search, setSearch] = useState("");
 const [sorter, setSorter] = useState<"id"| "name"> ("id")
    const { data, isFetching, fetchNextPage } =
        useInfiniteFetchQuery("/pokemon?limit=21");
    const pokemons = data?.pages.flatMap((page) => page.results.map(r=>({name:r.name, id:getPokemonId(r.url)}))) ?? [];
	const filteredPokemons =[... search ? pokemons.filter((pokemon)=>pokemon.name.toLowerCase().includes(search.toLowerCase())||pokemon.id.toString()===search):pokemons].sort((a,b)=> (a[sorter]<b[sorter]?-1:1))

   

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.tint }]}
        >
            <Row style={styles.header} gap={16}>
                <Image
                    source={require("@/assets/images/pokeball.png")}
                    width={24}
                    height={24}
                />
                <ThemedText variant="headline" color="grayLight">
                    Pokédex
                </ThemedText>
            </Row>
            <Row gap={16} style={styles.form}>
                <SearchBar search={search} onChange={setSearch} />
				<SortButton sorter={sorter} onChange={setSorter}/>
            </Row>
            <Card style={styles.body}>
                <FlatList
                    data={filteredPokemons}
                    numColumns={3}
                    contentContainerStyle={[styles.gridGap, styles.list]}
                    columnWrapperStyle={styles.gridGap}
                    ListFooterComponent={
                        isFetching ? (
                            <ActivityIndicator color={colors.tint} />
                        ) : null
                    }
                    onEndReached={() => fetchNextPage()}
                    renderItem={({ item }) => (
                        <PokemonCard
                            id={item.id}
                            name={item.name}
                            style={{ flex: 1 / 3 }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card>

            {/* <Text>Edit app/index.tsx to edit this screen</Text>
			<Link href="/about">A propos Link</Link>
			<Link href={{pathname: '/pokemon/[id]', params:{id:3}}}>Current pokémon</Link> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
        gap: 16,
    },
    header: {
        paddingHorizontal: 12,
    },
    body: {
        flex: 1,
    },
    gridGap: {
        gap: 8,
    },
    list: {
        padding: 12,
    },
	form:{
		paddingHorizontal:12
	}
});
