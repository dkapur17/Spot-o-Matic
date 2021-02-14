import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import TinderCard from 'react-tinder-card';

const ContinueSearch = (props) => {
    const { preferences } = props.location.state;
    return (
        <motion.div
            className='container mt-2 justify-content-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className='display-1 text-center text-danger mb-2' id='title'>Its the Finishing Lap!</h1>
            <p className='lead text-danger text-center'>Swipe RIGHT if you're interested or LEFT if you're not.</p>
            <CardsWrapper pref={preferences} />
        </motion.div>
    )
};


const CardsWrapper = ({ pref }) => {

    const lists = {
        'Watch Movies': [],
        'Leisure Time': ['Picnic Spots', 'Museums', 'Art Galleries', 'Historic Monuments'],
        'Games/Sports': ['Indoor Games', 'Trekking/Camping'],
        'Clubbing': ['Drinking', 'Dancing'],
        'Eating Out': ['Indian Cuisine', 'Chinese Cuisine', 'Fast Food', 'Continental Cuisine']
    };

    const superSections = ['Watch Movies', 'Leisure Time', 'Games/Sports', 'Clubbing', 'Eating Out']

    const [cardData, setCardData] = useState([
        ...lists['Leisure Time'],
        ...lists['Games/Sports'],
        ...lists['Clubbing'],
        ...lists['Eating Out'],
        ...superSections
    ]);

    const [preferences, setPreferences] = useState({
        id: pref.id,
        eatingOut: {
            score: parseInt(pref.eatingoutscore),
            variants: pref.eatingoutstring
        },
        clubbing: {
            score: parseInt(pref.clubbingscore),
            variants: pref.clubbingstring
        },
        playingGames: {
            score: parseInt(pref.playinggamescore),
            variants: pref.playinggamestring
        },
        watchingMovies: {
            score: parseInt(pref.watchingmoviescore),
            variants: pref.watchinmoviestring
        },
        leisureTime: {
            score: parseInt(pref.leisuretimescore),
            variants: pref.leisuretimestring
        },
    });

    const history = useHistory();

    useEffect(() => {

        const computePreferences = async () => {
            console.log(preferences);
            history.push({pathname: '/results', state: {preferences}})
        }

        if (!cardData.length)
            computePreferences();
    }, [cardData, preferences, history]);

    const handleCardLeavingScreen = (direction, item) => {
        if (superSections.includes(item)) {
            if (direction === 'left')
                setCardData((currentCardData) => currentCardData.filter(cardItem => cardItem !== item && !lists[item].includes(cardItem)));
            else {
                setCardData((currentCardData) => currentCardData.filter(cardItem => cardItem !== item));
                switch (item) {
                    case "Eating Out":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, eatingOut: { score: currentPreferences.eatingOut.score + 1, variants: currentPreferences.eatingOut.variants } }));
                        break;
                    case "Clubbing":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, clubbing: { score: currentPreferences.clubbing.score + 1, variants: currentPreferences.clubbing.variants } }));
                        break;
                    case "Games/Sports":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, playingGames: { score: currentPreferences.playingGames.score + 1, variants: currentPreferences.playingGames.variants } }));
                        break;
                    case "Leisure Time":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, leisureTime: { score: currentPreferences.leisureTime.score + 1, variants: currentPreferences.leisureTime.variants } }));
                        break;
                    case "Watching Movies":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, watchingMovies: { score: currentPreferences.watchingMovies.score + 1, variants: currentPreferences.leisureTime.variants } }));
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            setCardData((currentCardData) => currentCardData.filter(cardItem => cardItem !== item));
            if (direction === 'right') {
                if (lists["Eating Out"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, eatingOut: { score: currentPreferences.eatingOut.score, variants: currentPreferences.eatingOut.variants + item + '-' } }));
                else if (lists["Clubbing"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, clubbing: { score: currentPreferences.clubbing.score, variants: currentPreferences.clubbing.variants + item + '-' } }));
                else if (lists["Games/Sports"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, playingGames: { score: currentPreferences.playingGames.score, variants: currentPreferences.playingGames.variants + item + '-' } }));
                else if (lists["Leisure Time"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, leisureTime: { score: currentPreferences.leisureTime.score, variants: currentPreferences.leisureTime.variants + item + '-' } }));
                else if (lists["Watch Movies"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, watchingMovies: { score: currentPreferences.watchingMovies.score, variants: currentPreferences.watchingMovies.variants + item + '-' } }));
            }

        }
    }

    return (
        <div
            className='cardContainer row justify-content-center mt-5'>
            {cardData.map((item, i) =>
                <TinderCard
                    key={Math.random()}
                    className='swipe'
                    preventSwipe={['up', 'down']}
                    onCardLeftScreen={(direction) => handleCardLeavingScreen(direction, item)}
                >
                    <div className="card text-white bg-danger mb-3" style={{ width: "40rem", height: "30rem" }}>
                        <div className="card-header text-center">
                            <p className="lead">Do you like...</p>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-center">
                            <h1 className="card-title display-1 text-center">{item}</h1>
                        </div>
                    </div>
                </TinderCard>
            )}
        </div>
    )


};


export default ContinueSearch;