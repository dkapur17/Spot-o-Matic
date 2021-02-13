import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const New = () => {

    const history = useHistory();

    const handleSubmit = () => {
        history.push('/search/new')
    };

    return (
        <motion.div
            className='container my-5 justify-content-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="display-1 text-center text-danger mb-5" id="title">New Search</h1>
            <p className="lead text-danger text-center">Finding the perfect partner is tough. But whats even tougher is finding fun things to do together!
            Spot-O-Matic takes into account your and your partner's interests and tries to suggest activites fo you to try out.
            It even provides you locations (or SPOTS) to visit near you, where you can have fun with your better half.
                On each card, swipe <strong>RIGHT 👉</strong> if you are interested in what the card says or swipe <strong>LEFT 👈</strong> if you're not.
                Just let us know your interests and we will help you find the perfect SPOT for your next date 😉. </p>
            <div className="row justify-content-center mt-5">
                <button className="love-button" onClick={handleSubmit}>Lets Do This!</button>
            </div>
        </motion.div>
    )
}

export default New;