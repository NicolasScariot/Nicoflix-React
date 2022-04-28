import React from 'react';
import { useState, useEffect } from 'react'; // Variáveis de estado (podem mudar)
import {
    Container,
    SearchButton,
    SearchContainer,
    Input,
    Title,
    BannerButton,
    Banner,
    SliderMovie
} from './styles';
import { getListMovies } from '../../utils/movie';

import { ScrollView } from 'react-native';
import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';
import SliderItem from '../../components/SliderItem';

import api, { key } from '../../services/api';
import { KeyboardAvoidingView } from 'react-native-web';


function Home() {


    const [nowMovies, setNowMovies] = useState([]);  // setNowMoveis usadodo para fazer alterações
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);


    useEffect(() => {
        let isActive = true;

        async function getMovies() {
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])
                const nowList = getListMovies(10, nowData.results);
                const popularList = getListMovies(5, popularData.data.results);
                const topList = getListMovies(5, topData.data.results);

                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);
        }
        getMovies();
    },[])

    return (
        <Container>
            <Header title="Nicoflix" />
            <SearchContainer>
                <Input
                    placeholder="Halo"
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView showVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>
                <BannerButton activeOpacity={0.7} onPress={() => alert('Clicou')}>
                    <Banner
                        resizeMethodod="resize"
                        source={{ uri: 'https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=378&q=80' }}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item}/>}
                    keyExtractor={ (item) => String(item.id)}
                />

                <Title>Populares</Title>
                <SliderMovie
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item}/>}
                    keyExtractor={ (item) => String(item.id)}
                />

                <Title>Mais votados</Title>
                <SliderMovie
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item}/>}
                    keyExtractor={ (item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}

export default Home;

