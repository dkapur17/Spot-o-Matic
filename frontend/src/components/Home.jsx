import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
    const history = useHistory();
    const handelRouting = (path) => {
        history.push(path);
    };
    return (
        <motion.div
            className='container my-5 justify-content-center pt-5'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}

        >
            <h1 className='display-1 text-center text-danger' id='title'>Spot-💖-Matic</h1>
            <div className="pt-5">
                <div className='d-flex flex-column align-items-center mt-5'>
                    <button className='love-button mb-3' style={{ width: "50%" }} onClick={() => handelRouting('/new')}>Start a New Spot-O-Matic Search</button>
                    <button className='love-button mt-3' style={{ width: "50%" }} onClick={() => handelRouting('/continue')}>Continue Where Your Partner Left Off</button>
                </div>
            </div>
        </motion.div>
    )
};

export default Home;