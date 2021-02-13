import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import swal from 'sweetalert';

const ShowCode = (props) => {

    const code = props.match.params.code;
    const codeEl = useRef(null);
    const history = useHistory();

    const handleCopy = () => {
        codeEl.current.select();
        document.execCommand('copy');
        document.getSelection().collapseToEnd();
        swal({
            text: 'Code Copied!',
            timer: 1000,
            type: "success",
            buttons: false
        });
    }

    return (
        <motion.div
            className='container my-5 justify-content-center'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className='display-1 text-center text-danger mb-5' id='title'>You're Halfway Done!</h1>
            <p className="lead text-center text-danger">That was easy wasn't it? We have saved your interests. Now for the second part.
            You are given a code below. Send this code to your partner and ask them to use this code to "Continue Where You Left Off".
            Once they also share their interests with us, our sophisticated algorithm will pick out and suggest the best SPOTS for your
            next date!
            </p>
            <p className="text-center text-secondary text-black-50 mt-5">Click on the code to copy it</p>
            <div className="row justify-content-center">
                <input className='text-center text-danger display-3 mb-5 copyable-link'
                    onClick={handleCopy}
                    ref={codeEl}
                    readOnly
                    value={code}
                />
            </div>
            <div className="row justify-content-center">
                <button className="love-button" onClick={() => history.push('/')}>Take Me Home</button>
            </div>
        </motion.div>
    );

};

export default ShowCode;