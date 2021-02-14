import {useState, useEffect} from 'react';
import { motion } from 'framer-motion'

const DisplayResults = (props) => {
    const [numMaps, setNumMaps] = useState(1)
    const [mapQuery, setMapQuery] = useState([])

    const sortScore = (a, b) => {
        return b.score - a.score;
    }

    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    const filterQueries = (act) => {
        const variants = act.variants.split('-');

        let max_occur = {key: '', freq: -1};

        for(let i = 0; i < variants.length; i++){
            let count = countOccurrences(variants, variants[i])
            if(count > max_occur.freq)
                max_occur = {key: variants[i], freq: count}
        }

        if(max_occur.freq === 1){
            if(variants.length > 1){
                setNumMaps(2);
                let query1 = variants[0].split(' ').join('+');
                let query2 = variants[1].split(' ').join('+');
                
                setMapQuery([query1, query2])
                
            }else{
                let query1 = variants[0].split(' ').join('+');
                setMapQuery([query1])
            }
        }else{
            let query1 = max_occur.key.split(' ').join('+');
            setMapQuery([query1])
        } 
    }

    useEffect(() => {
        const Analyzer = () => {
            let raw = props.location.state.preferences
            let data = [{key:'eatingOut', ...raw.eatingOut}, 
                        {key:'leisureTime', ...raw.leisureTime}, 
                        {key:'playingGames' , ...raw.playingGames}, 
                        {key:'clubbing', ...raw.clubbing}, 
                        {key:'watchingMovies', ...raw.watchingMovies}]
            
            data.sort(sortScore)

            const best = data.filter(activity => activity.score >= 2)
            if(best !== []){
                filterQueries(best[0]);
                return;
            }
            const med = data.filter(activity => activity.score === 1)
            if(med !== []){
                filterQueries(med[0]);
                return;
            }
        }

        Analyzer();
    }, [])

    return(
        <motion.div
            className='container my-5 justify-content-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 id='title' className='text-danger text-center display-3'>Here Are Your Results</h1>
            {mapQuery.length === 0 ? 
                (
                    <div className="d-flex justify-content-center" style={{marginTop: '20rem'}}>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ): mapQuery.length === 1 ? (
                    <div className='row justify-content-center'>
                        <div>
                            <iframe  width="500" height="450" frameBorder="0" style={{ border: 0 }} title={`${mapQuery[0]}`} className="embed-responsive-item" src={`https://www.google.com/maps/embed/v1/search?q=${mapQuery[0]}+near+me&key=AIzaSyBDrcQI8xe9_Z2_mxlySTZqEQO8RtZHS1Q`} allowFullScreen></iframe>
                            <p className="text-danger text-center lead">SUGGESTED SPOTS: {mapQuery[0].split('+').join(' ').toUpperCase()}</p>
                        </div>
                    </div>
                ): (
                    <div className='row justify-content-around'>
                        <div className="col">
                            <iframe  width="500" height="450" frameBorder="0" style={{ border: 0 }} title={`${mapQuery[0]}`} className="embed-responsive-item" src={`https://www.google.com/maps/embed/v1/search?q=${mapQuery[0]}+near+me&key=AIzaSyBDrcQI8xe9_Z2_mxlySTZqEQO8RtZHS1Q`} allowFullScreen></iframe>
                            <p className="text-danger text-center lead">SUGGESTED SPOTS: {mapQuery[0].split('+').join(' ').toUpperCase()}</p>
                        </div>
                        <div className="col">
                            <iframe  width="500" height="450" frameBorder="0" style={{ border: 0 }} title={`${mapQuery[1]}`} className="embed-responsive-item" src={`https://www.google.com/maps/embed/v1/search?q=${mapQuery[1]}+near+me&key=AIzaSyBDrcQI8xe9_Z2_mxlySTZqEQO8RtZHS1Q`} allowFullScreen></iframe>
                            <p className="text-danger text-center lead">SUGGESTED SPOTS: {mapQuery[1].split('+').join(' ').toUpperCase()}</p>
                        </div>    
                    </div>
                )
            } 
        </motion.div>
    )
}

export default DisplayResults;