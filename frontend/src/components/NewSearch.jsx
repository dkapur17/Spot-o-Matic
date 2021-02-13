import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { nanoid } from 'nanoid'
import axios from 'axios';

const NewSearch = () => {
    return (
        <motion.div
            className='container mt-2 justify-content-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className='display-1 text-center text-danger mb-2' id='title'>Help Us Help You!</h1>
            <p className='lead text-danger text-center'>Swipe RIGHT if you're interested or LEFT if you're not.</p>
            <CardsWrapper />
        </motion.div>
    )
};

const CardsWrapper = () => {

    const lists = {
        'Watch Movies': [],
        'Leisure Time': ['Picnic Spots', 'Museums', 'Art Galleries', 'Historic Monuments'],
        'Games/Sports': ['Indoor Games', 'Trekking/Camping'],
        'Clubbing': ['Drinking', 'Dancing'],
        'Eating Out': ['Indian Cuisine', 'Chinese Cuisine', 'Fast Food', 'Contintal Cuisine']
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
        id: nanoid(10),
        eatingOut: {
            score: 0,
            varaints: ''
        },
        clubbing: {
            score: 0,
            varaints: ''
        },
        playingGames: {
            score: 0,
            varaints: ''
        },
        watchingMovies: {
            score: 0,
            varaints: ''
        },
        leisureTime: {
            score: 0,
            varaints: ''
        },
    });

    const history = useHistory();

    useEffect(() => {

        const sendPreferences = async () => {
            // TODO: Makes api call to backend
            const res = await axios.post('http://localhost:5000/setPreferences',preferences);
            console.log(res.data);
            console.log(preferences);
            history.push(`/showLink/${preferences.id}`);
        }

        if (!cardData.length)
            sendPreferences();
    }, [cardData, preferences, history]);

    const handleCardLeavingScreen = (direction, item) => {
        if (superSections.includes(item)) {
            if (direction === 'left')
                setCardData((currentCardData) => currentCardData.filter(cardItem => cardItem !== item && !lists[item].includes(cardItem)));
            else {
                setCardData((currentCardData) => currentCardData.filter(cardItem => cardItem !== item));
                switch (item) {
                    case "Eating Out":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, eatingOut: { score: currentPreferences.eatingOut.score + 1, varaints: '' } }));
                        break;
                    case "Clubbing":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, clubbing: { score: currentPreferences.clubbing.score + 1, varaints: '' } }));
                        break;
                    case "Games/Sports":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, playingGames: { score: currentPreferences.playingGames.score + 1, varaints: '' } }));
                        break;
                    case "Leisure Time":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, leisureTime: { score: currentPreferences.leisureTime.score + 1, varaints: '' } }));
                        break;
                    case "Watching Movies":
                        setPreferences((currentPreferences) => ({ ...currentPreferences, watchingMovies: { score: currentPreferences.watchingMovies.score + 1, varaints: '' } }));
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
                    setPreferences((currentPreferences) => ({ ...currentPreferences, eatingOut: { score: currentPreferences.eatingOut.score, varaints: currentPreferences.eatingOut.varaints + item + '-' } }));
                else if (lists["Clubbing"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, clubbing: { score: currentPreferences.clubbing.score, varaints: currentPreferences.clubbing.varaints + item + '-' } }));
                else if (lists["Games/Sports"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, playingGames: { score: currentPreferences.playingGames.score, varaints: currentPreferences.playingGames.varaints + item + '-' } }));
                else if (lists["Leisure Time"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, leisureTime: { score: currentPreferences.leisureTime.score, varaints: currentPreferences.leisureTime.varaints + item + '-' } }));
                else if (lists["Watch Movies"].includes(item))
                    setPreferences((currentPreferences) => ({ ...currentPreferences, watchingMovies: { score: currentPreferences.watchingMovies.score, varaints: currentPreferences.watchingMovies.varaints + item + '-' } }));
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
}

export default NewSearch;