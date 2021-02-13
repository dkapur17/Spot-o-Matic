import { useState } from 'react';
import { motion } from 'framer-motion';

const Continue = () => {

    const [code, setCode] = useState('');

    const submitCode = () => {
        console.log(code);
        // Make axios call to backend and verify the code
        // If incorrect, show alert.
        // If correct, take them to /search/code
    };

    return (
        <motion.div
            className='container my-5 justify-content-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="display-1 text-center text-danger mb-5" id='title'>Continue Your Search</h1>
            <p className="lead text-danger text-center">So, your partner has taken the first step and has now passed on the baton to you!
            It is now up to you to follow through. Enter the code you were given by your partner and get started. On each card,
                swipe <strong>RIGHT 👉</strong> if you are interested in what the card says or swipe <strong>LEFT 👈</strong> if you're not.
                Just let us know your interests and we will help you find the perfect SPOT for your next date 😉.
            </p>
            <div className="row justify-content-center mt-5 py-5">
                <input className='love-input text-center mx-1' value={code} onChange={({ target }) => setCode(target.value)}></input>
                <button className='mx-1 arrow-button' onClick={submitCode}>✔️</button>
            </div>
        </motion.div>
    )
};

export default Continue;