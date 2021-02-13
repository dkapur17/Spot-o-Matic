import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import swal from 'sweetalert';

const Continue = () => {

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const submitCode = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/getPreferences', { id: code });
            if (!res.data.length)
                swal({ title: "Invalid Code!", icon: "error" });
            else
                history.push(`/search/continue/${code}`, { preferences: res.data[0] });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
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
                {
                    loading ?
                        <div className="spinner-border text-danger mt-3" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <button className='mx-1 arrow-button' onClick={submitCode}>✔️</button>
                }
            </div>
        </motion.div>
    )
};

export default Continue;