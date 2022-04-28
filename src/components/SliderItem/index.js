import React from 'react';
import { Container,
         BannerItem,
         RateContainer,
         Rate,
         Title
} from './styles'
import { Ionicons } from '@expo/vector-icons'; // Bliblioteca de icones

function SliderItem({data}){
    return(
        <Container>
            <BannerItem 
            source={{ uri:`https://image.tmdb.org/t/p/original/${data.poster_path}`}}
            />

        <Title numberOfLines={1}>{data.title}</Title>
        <RateContainer>
            <Ionicons name="md-star" size={11} color="#E7A74e" />
            <Rate>{data.vote_avarege}/10</Rate>
        </RateContainer>
        </Container>
    )
}

export default SliderItem;

// efef
// Container = Área de toque na tela
// BannerItem = Onde os filmes serão mostrados



// numberOfLines = limitador de linhas, colocando três pontos no final